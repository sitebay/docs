import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as pagefind from 'pagefind';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const output = path.resolve(root, process.argv[2] || 'public');
const corpus = JSON.parse(await fs.readFile(path.join(output, 'knowledge/corpus.json'), 'utf8'));
const { index, errors } = await pagefind.createIndex({
  rootSelector: '.main__content',
  forceLanguage: 'en',
  excludeSelectors: ['[data-pagefind-ignore]'],
});
if (errors.length || !index) throw new Error(errors.join('\n') || 'No Pagefind index');
let count = 0;
const base = new URL(
  corpus.documents.find((d) => d.source.path === 'articles/_index.md')?.url ||
    'https://www.sitebay.org/docs/',
);
try {
  for (const doc of corpus.documents) {
    if (doc.namespace !== 'sitebay')
      throw new Error('Public search cannot contain upstream/private source');
    const url = new URL(doc.url);
    if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname))
      throw new Error('Published URL is outside site root');
    const file = path.resolve(output, url.pathname.slice(base.pathname.length), 'index.html');
    if (!file.startsWith(output + path.sep)) throw new Error('Unsafe output path');
    const result = await index.addHTMLFile({
      url: url.pathname,
      content: await fs.readFile(file, 'utf8'),
    });
    if (result.errors.length) throw new Error(result.errors.join('\n'));
    count++;
  }
  const result = await index.writeFiles({ outputPath: path.join(output, 'pagefind') });
  if (result.errors.length) throw new Error(result.errors.join('\n'));
  await fs.writeFile(
    path.join(output, 'knowledge/search-manifest.json'),
    JSON.stringify(
      { backend: 'pagefind', version: '1.5.2', documents: count, corpus_revision: corpus.revision },
      null,
      2,
    ) + '\n',
  );
  console.log(
    JSON.stringify({ backend: 'pagefind', documents: count, corpus_revision: corpus.revision }),
  );
} finally {
  await index.deleteIndex();
  await pagefind.close();
}
