// Serve the actual production export on loopback. Remote services are stubbed:
// browser search uses the real built Pagefind index, not remote fixtures.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const output = path.resolve(process.argv[2] || path.join(root, 'public'));
const evidence = path.resolve(process.argv[3] || path.join(root, '.cache/browser'));
const expected = JSON.parse(fs.readFileSync(path.join(root, 'ci/expected-pages.json'), 'utf8'));
const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.woff2':'font/woff2', '.xml':'application/xml', '.wasm':'application/wasm', '.txt':'text/plain'};
const server = http.createServer((request, response) => {
  try {
    const parsed = new URL(request.url, 'http://localhost');
    if (!parsed.pathname.startsWith('/docs/')) { response.writeHead(404).end(); return; }
    let file = path.resolve(output, decodeURIComponent(parsed.pathname.slice(6)));
    if (!file.startsWith(output + path.sep) && file !== output) { response.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { response.writeHead(404).end(); return; }
    response.writeHead(200, {'Content-Type': mime[path.extname(file)] || 'application/octet-stream'});
    fs.createReadStream(file).pipe(response);
  } catch { response.writeHead(400).end(); }
});

// Chromium may transiently fail a capture after layout changes. Retry only
// that protocol error once; a second failure still fails the entire gate.
async function screenshot(page, options) {
  try { return await page.screenshot({...options, animations:'disabled'}); }
  catch (error) {
    if (!error.message.includes('Unable to capture screenshot')) throw error;
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    return page.screenshot({...options, animations:'disabled'});
  }
}

(async () => {
  fs.mkdirSync(evidence, {recursive:true});
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const options = {headless:true};
  if (process.env.PLAYWRIGHT_EXECUTABLE_PATH) options.executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  let browser;
  const report = {scope:'served production export; real Pagefind search; unrelated external embeds stubbed', pages:[], viewports:[], errors:[], missingAssets:[], externalRequests:[], errorStacks:[]};
  try {
    assert(fs.existsSync(path.join(output,'index.html')), 'Build the production site before browser verification');
    browser = await chromium.launch(options);
    const context = await browser.newContext({viewport:{width:1440,height:1000}});
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.origin === origin) return route.continue();
      report.externalRequests.push({host:url.hostname,path:url.pathname,type:route.request().resourceType()});
      if (url.hostname === 'www.sitebay.org' && url.pathname === '/wp-json/sitebay/v1/promo-data') {
        return route.fulfill({contentType:'application/json',body:'{"docs":{}}'});
      }
      if (url.hostname === 'www.sitebay.org' && url.pathname === '/wp-json/sitebay/v1/header-featured') {
        return route.fulfill({contentType:'application/json',body:'[]'});
      }
      if (url.hostname.endsWith('.algolia.net')) {
        assert(url.hostname.toLowerCase().startsWith('vjrr3oca19'), 'Search tried a non-SiteBay application');
        let queries = [];
        try { queries = JSON.parse(route.request().postData() || '{}').requests || []; } catch {}
        return route.fulfill({contentType:'application/json', body:JSON.stringify({results:queries.map(() => ({hits:[],nbHits:0,nbPages:0,page:0,hitsPerPage:20,facets:{},processingTimeMS:0,exhaustiveNbHits:true}))})});
      }
      return route.fulfill({status:200,contentType:route.request().resourceType()==='script'?'text/javascript':'text/plain',body:''});
    });
    context.setDefaultTimeout(15000);
    const page = await context.newPage();
    page.on('pageerror', error => {report.errors.push(error.message);report.errorStacks.push(error.stack);});
    page.on('response', response => {
      if (response.url().startsWith(origin) && response.status() >= 400) report.missingAssets.push(new URL(response.url()).pathname);
    });
    const allRoutes = JSON.parse(execFileSync(process.env.PYTHON || 'python3', ['ci/scripts/list-page-routes.py'], {cwd:root,encoding:'utf8'}));
    assert(allRoutes.length >= Object.keys(expected).length, 'Unexpectedly small publication inventory');
    const shard = (process.env.DOCS_PAGE_SHARD || '0/1').split('/').map(Number);
    assert(Number.isInteger(shard[0]) && Number.isInteger(shard[1]) && shard[1] > 0 && shard[0] >= 0 && shard[0] < shard[1], 'Invalid page shard');
    report.shard = shard;
    report.totalPublishedRoutes = allRoutes.length;
    const routes = allRoutes.filter((_, index) => index % shard[1] === shard[0]);
    let nextRoute = 0;
    // Separate pages permit bounded parallel reading without shared UI state.
    await Promise.all(Array.from({length:2}, async () => {
      const reader = await context.newPage();
      reader.on('pageerror', error => report.errors.push(error.message));
      reader.on('response', response => {
        if (response.url().startsWith(origin) && response.status() >= 400) report.missingAssets.push(new URL(response.url()).pathname);
      });
      try {
        while (nextRoute < routes.length) {
          const route = routes[nextRoute++];
          const response = await reader.goto(origin + route, {waitUntil:'domcontentloaded'});
          assert.equal(response.status(), 200, route);
          assert(await reader.locator('main').count(), `Missing reading surface: ${route}`);
          const content = await reader.locator('main').innerText();
          assert(content.trim().length > 30, `Blank documentation page: ${route}`);
          assert(await reader.locator('main h1').count() >= 1, `Missing page title: ${route}`);
          report.pages.push(route);
        }
      } finally { await reader.close(); }
    }));
    report.pages.sort();
    if (shard[0] === 0) {
    for (const width of [320,1440]) {
      await page.setViewportSize({width,height:1000});
      for (const route of ['/docs/', '/docs/guides/', '/docs/sorti/', '/docs/sorti/forge-reference/', '/docs/api/site_live/', '/docs/products/posthog/notebooks/', '/docs/guides/student-free-plan-deals/', '/docs/knowledge/', '/docs/knowledge/pgvector/', '/docs/sorti/missions-and-approvals/', '/docs/sorti/skills-and-collections/', '/docs/knowledge/service-ownership/', '/docs/knowledge/deploy-with-pulumi/', '/docs/knowledge/troubleshoot-reader/', '/docs/sorti/current-workflows/', '/docs/sorti/fix-a-staging-page/', '/docs/sorti/review-a-staging-release/', '/docs/sorti/create-a-review-skill/', '/docs/vscode/test-localhost-with-sorti/', '/docs/sorti/build-a-counter-panel/', '/docs/sorti/recover-an-interrupted-task/']) {
        await page.goto(origin + route, {waitUntil:'networkidle'});
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
        report.viewports.push({width,route,overflow});
        if (overflow) {
          report.overflowMetrics = await page.evaluate(() => ({
            viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,
            items:[...document.querySelectorAll('body *')].filter(el=>el.scrollWidth>el.clientWidth+2 && el.clientWidth>0).map(el=>({tag:el.tagName,cls:el.className,sw:el.scrollWidth,cw:el.clientWidth,overflow:getComputedStyle(el).overflowX,text:el.textContent.slice(0,85)})).slice(0,20)
          }));
          report.overflowElements = await page.evaluate(() => [...document.querySelectorAll('body *')].map(el => ({tag:el.tagName,cls:el.className,right:Math.round(el.getBoundingClientRect().right),width:Math.round(el.getBoundingClientRect().width)})).filter(el => el.right > innerWidth + 1 && el.width > 0).slice(0,16));
          await screenshot(page, {path:path.join(evidence,'overflow.png')});
        }
        assert(!overflow, `Horizontal overflow: ${width} ${route}`);
        if (route.includes('student-free-plan-deals')) {
          // The heading contains a separately labelled permalink, so its
          // accessible name includes more than the visible heading text.
          const benefit = page.locator('main h2#compare-the-actual-benefit');
          assert.equal(await benefit.count(), 1);
          assert(await benefit.isVisible(), 'Offer comparison heading is hidden');
          assert.equal((await benefit.textContent()).trim(), 'Compare the actual benefit');
          assert.equal(await page.locator('.sb-browser-mockup').count(), 0);
        }
        await screenshot(page, {path:path.join(evidence, `${width}-${route.split('/').filter(Boolean).slice(1).join('-') || 'home'}.png`),fullPage:false});
      }
    }
    await page.goto(origin + '/docs/sorti/', {waitUntil:'networkidle'});
    await page.locator('.prose a').filter({hasText:'How Sorti works'}).first().click();
    await page.waitForURL('**/docs/sorti/how-sorti-works/');
    report.navigationClick = true;
    report.searchChecks = [];
    await page.setViewportSize({width:1440,height:1000});
    for (const query of ['Forge', 'API key', 'pgvector']) {
      await page.goto(origin + '/docs/', {waitUntil:'networkidle'});
      await page.locator('[data-open-search]').click();
      await page.locator('#docs-query').fill(query);
      await page.waitForFunction(() => document.querySelector('#docs-search-results a') !== null);
      const results = await page.locator('#docs-search-results a').allTextContents();
      assert(results.some(text => text.toLowerCase().includes(query.toLowerCase())), `Search missed ${query}`);
      assert(!results.some(text => text === 'Search Results'), 'Wrong search result titles');
      await page.locator('#docs-search-results a').first().click();
      await page.waitForLoadState('domcontentloaded');
      assert(page.url().startsWith(origin + '/docs/'), 'Search result left the site');
      assert(await page.locator('main h1').isVisible());
      report.searchChecks.push({query,results:results.length,clicked:true});
    }
    await page.goto(origin + '/docs/', {waitUntil:'networkidle'});
    await page.locator('[data-open-search]').click();
    await page.locator('#docs-query').fill('retrieval');
    await page.locator('#docs-topic').selectOption('knowledge');
    await page.waitForFunction(() => document.querySelector('#docs-search-results a') !== null);
    const filtered = await page.locator('#docs-search-results a').evaluateAll(nodes => nodes.map(n=>n.getAttribute('href')));
    assert(filtered.length > 0 && filtered.every(url=>url.includes('/docs/knowledge/')), 'Section filter escaped knowledge');
    await page.keyboard.press('Escape');
    await page.locator('#docs-search-dialog').waitFor({state:'hidden'});
    assert(await page.locator('[data-open-search]').evaluate(el => el === document.activeElement), 'Closing search lost keyboard focus');
    await page.keyboard.press('Control+k');
    await page.locator('#docs-query').waitFor({state:'visible'});
    assert(await page.locator('#docs-query').evaluate(el => el === document.activeElement), 'Keyboard shortcut did not focus search');
    await page.locator('[data-close-search]').click();
    await page.locator('#docs-search-dialog').waitFor({state:'hidden'});
    report.searchKeyboard = true;
    // Dismiss synchronously before debounce, then reopen without retyping.
    await page.locator('[data-open-search]').click();
    await page.locator('#docs-topic').selectOption('');
    await page.evaluate(() => {
      const input=document.querySelector('#docs-query');
      input.value='Forge';input.dispatchEvent(new Event('input',{bubbles:true}));
      document.querySelector('[data-close-search]').click();
    });
    await page.locator('[data-open-search]').click();
    await page.waitForFunction(() => [...document.querySelectorAll('#docs-search-results a')].some(a=>a.href.includes('/sorti/forge')));
    await page.locator('[data-close-search]').click();
    report.searchReopen = true;

    const offline = await browser.newContext({javaScriptEnabled:false});
    const offlinePage = await offline.newPage();
    await offlinePage.goto(origin + '/docs/knowledge/task-map/');
    assert((await offlinePage.locator('main').innerText()).includes('Site operations'));
    await offline.close();
    report.noJavaScriptReading = true;
    report.searchSectionFilter = true;
    assert(!report.externalRequests.some(req => req.host.includes('algolia')), 'Pagefind site still called Algolia');
    }
    assert.deepEqual([...new Set(report.errors)], [], 'Browser exceptions');
    assert.deepEqual([...new Set(report.missingAssets)], [], 'Missing local resources');
    report.passed = true;
  } catch (error) {
    report.passed = false;
    report.failure = error.message;
    process.exitCode = 1;
  } finally {
    fs.writeFileSync(path.join(evidence,'report.json'), JSON.stringify(report,null,2)+'\n');
    console.log(JSON.stringify(report));
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => {console.error(error); server.close(); process.exitCode = 1;});
