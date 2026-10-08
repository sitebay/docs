// Serve the actual production export on loopback. Remote services are stubbed:
// this checks rendering/navigation, not live search or customer APIs.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.resolve(process.argv[2] || path.join(root, 'public'));
const evidence = path.resolve(process.argv[3] || path.join(root, '.cache/browser'));
const expected = JSON.parse(fs.readFileSync(path.join(root, 'ci/expected-pages.json'), 'utf8'));
const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.woff2':'font/woff2', '.xml':'application/xml'};
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

(async () => {
  fs.mkdirSync(evidence, {recursive:true});
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const options = {headless:true};
  if (process.env.PLAYWRIGHT_EXECUTABLE_PATH) options.executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  let browser;
  const report = {scope:'served production export; remote services stubbed', pages:[], viewports:[], errors:[], missingAssets:[], externalRequests:[], errorStacks:[]};
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
    for (const route of Object.values(expected)) {
      const response = await page.goto(origin + route, {waitUntil:'domcontentloaded'});
      assert.equal(response.status(), 200, route);
      assert(await page.locator('main, .prose').count(), `Missing reading surface: ${route}`);
      report.pages.push(route);
    }
    for (const width of [320,1440]) {
      await page.setViewportSize({width,height:1000});
      for (const route of ['/docs/sorti/', '/docs/sorti/forge-reference/', '/docs/guides/student-free-plan-deals/']) {
        await page.goto(origin + route, {waitUntil:'networkidle'});
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
        report.viewports.push({width,route,overflow});
        if (overflow) {
          report.overflowMetrics = await page.evaluate(() => ({
            viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,
            items:[...document.querySelectorAll('body *')].filter(el=>el.scrollWidth>el.clientWidth+2 && el.clientWidth>0).map(el=>({tag:el.tagName,cls:el.className,sw:el.scrollWidth,cw:el.clientWidth,overflow:getComputedStyle(el).overflowX,text:el.textContent.slice(0,85)})).slice(0,20)
          }));
          report.overflowElements = await page.evaluate(() => [...document.querySelectorAll('body *')].map(el => ({tag:el.tagName,cls:el.className,right:Math.round(el.getBoundingClientRect().right),width:Math.round(el.getBoundingClientRect().width)})).filter(el => el.right > innerWidth + 1 && el.width > 0).slice(0,16));
          await page.screenshot({path:path.join(evidence,'overflow.png')});
        }
        assert(!overflow, `Horizontal overflow: ${width} ${route}`);
        if (route.includes('student-free-plan-deals')) {
          assert.equal(await page.locator('.sb-browser-mockup').count(), 3);
          assert(await page.getByLabel('Estimated student deal value').count() > 0);
        }
        await page.screenshot({path:path.join(evidence, `${width}-${route.split('/').filter(Boolean).at(-1)}.png`),fullPage:false});
      }
    }
    await page.goto(origin + '/docs/sorti/', {waitUntil:'networkidle'});
    await page.locator('.prose a').filter({hasText:'How Sorti works'}).first().click();
    await page.waitForURL('**/docs/sorti/how-sorti-works/');
    report.navigationClick = true;
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
