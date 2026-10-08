// Pagefind is loaded only when someone searches. No query leaves this origin.
(() => {
  const dialog = document.querySelector('#docs-search-dialog');
  if (!dialog) return;
  const input = dialog.querySelector('#docs-query');
  const status = dialog.querySelector('#docs-search-status');
  const results = dialog.querySelector('#docs-search-results');
  const topic = dialog.querySelector('#docs-topic');
  const base = new URL(dialog.dataset.pagefindBase, location.origin);
  let libraryPromise;
  let sequence = 0;
  let timer;
  let returnFocus;

  function open() {
    if (!dialog.open) {
      returnFocus = document.activeElement;
      dialog.showModal();
    }
    input.focus();
  }
  function close() {
    clearTimeout(timer);
    sequence++; // An in-flight response must not update a dismissed dialog.
    dialog.close();
    if (returnFocus?.isConnected) returnFocus.focus();
  }
  document
    .querySelectorAll('[data-open-search]')
    .forEach((el) => el.addEventListener('click', open));
  dialog.querySelector('[data-close-search]').addEventListener('click', close);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault();
      close();
    } else if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open();
    }
  });
  if (matchMedia('(max-width:760px)').matches) {
    document.querySelector('.docs-menu')?.removeAttribute('open');
  }

  function loadLibrary() {
    if (!libraryPromise) {
      libraryPromise = import(new URL('pagefind/pagefind.js', base))
        .then(async (library) => {
          // The build records full paths including /docs/; do not prepend it twice.
          await library.options({ baseUrl: '/' });
          return library;
        })
        .catch((error) => {
          libraryPromise = undefined;
          throw error;
        });
    }
    return libraryPromise;
  }
  async function search(current) {
    const query = input.value.trim();
    if (!query || !dialog.open || current !== sequence) return;
    status.textContent = 'Searching…';
    try {
      const library = await loadLibrary();
      const found = await library.search(query, {
        filters: topic.value ? { topic: topic.value } : {},
      });
      const records = await Promise.all(found.results.slice(0, 10).map((result) => result.data()));
      if (current !== sequence || !dialog.open) return;
      const items = [];
      for (const record of records) {
        const target = new URL(record.url, location.origin);
        if (target.origin !== location.origin || !target.pathname.startsWith(base.pathname))
          continue;
        const item = document.createElement('li');
        const link = document.createElement('a');
        const text = document.createElement('p');
        link.href = target.href;
        link.textContent = record.meta.title || target.pathname;
        text.textContent = (record.excerpt || '').replace(/<[^>]*>/g, '');
        item.append(link, text);
        items.push(item);
      }
      results.replaceChildren(...items);
      status.textContent = items.length
        ? `${found.results.length} results. Showing ${items.length}.`
        : 'No results. Try a tool name or fewer words.';
    } catch {
      if (current === sequence && dialog.open) {
        status.textContent =
          'Search index unavailable. Browse the sections or rebuild the site with npm run build:docs.';
      }
    }
  }
  function schedule(delay) {
    clearTimeout(timer);
    const current = ++sequence; // Invalidate old results before the debounce.
    results.replaceChildren();
    if (!input.value.trim()) {
      status.textContent = 'Search stays in your browser.';
      return;
    }
    timer = setTimeout(() => search(current), delay);
  }
  input.addEventListener('input', () => schedule(180));
  topic.addEventListener('change', () => schedule(0));
})();
