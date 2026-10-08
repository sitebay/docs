import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
console.log(
  JSON.stringify(
    {
      mcpServers: {
        sitebay_docs: {
          command: process.execPath,
          args: [path.join(root, 'knowledge/src/server.mjs'), '--stdio'],
          env: {
            DOCS_CORPUS: path.resolve(
              process.env.DOCS_CORPUS || path.join(root, 'public/knowledge/corpus.json'),
            ),
          },
        },
      },
    },
    null,
    2,
  ),
);
