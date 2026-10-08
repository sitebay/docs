// Run with the checked Sorti checkout's tsx loader; do not patch or restart Sorti.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { homedir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { CorpusStore } from '../src/corpus.mjs';
import { listen } from '../src/http.mjs';
import { resourceUri } from '../src/service.mjs';
const source = path.join(
  process.env.SORTI_REPO || path.join(homedir(), 'sorti'),
  'apps/sorti-agent/lib/mcp/byo/ByoMcpClient.ts',
);
const hash = async () =>
  createHash('sha256')
    .update(await fs.readFile(source))
    .digest('hex');
const before = await hash();
const { ByoMcpClient } = await import(pathToFileURL(source).href);
const store = await CorpusStore.load(
  process.env.DOCS_CORPUS || new URL('../../public/knowledge/corpus.json', import.meta.url),
);
const token = 'test-session-reader-000000000000000000000000000';
const server = await listen(store, { token });
try {
  const client = new ByoMcpClient({
    url: `http://127.0.0.1:${server.address().port}/byo`,
    authToken: token,
  });
  const caps = await client.loadCapabilities();
  assert.equal(caps.id, 'sitebay-docs');
  assert.equal((await client.listTools()).length, 4);
  const roster = await client.listServerToolRoster();
  assert.equal(roster?.length, 4);
  assert(roster?.every((t) => t.annotations?.readOnlyHint));
  const found: any = await client.callTool('search_docs', { query: 'How Sorti works' });
  assert(found.structuredContent.results.length > 0);
  const id = found.structuredContent.results[0].id;
  const read: any = await client.callTool('read_doc', { id, max_lines: 10 });
  assert.equal(read.structuredContent.id, id);
  assert(read.structuredContent.source.sha256);
  const resource = await client.readResource(resourceUri(id));
  assert(resource?.text);
  assert.equal(await client.readResource('file:///etc/passwd'), null);
  await assert.rejects(client.callTool('Shell', { command: 'echo no' }));
  const after = await hash();
  assert.equal(after, before);
  const report = {
    passed: true,
    source: 'apps/sorti-agent/lib/mcp/byo/ByoMcpClient.ts',
    source_sha256: before,
    checks: [
      'actual Sorti client capability discovery',
      'read-only server tool roster',
      'cited search and read',
      'resource read',
      'mutation and filesystem paths refused',
    ],
    activation:
      'Local integration test only. No running Sorti session or trust configuration was changed.',
  };
  if (process.env.DOCS_TEST_REPORT)
    await fs.writeFile(process.env.DOCS_TEST_REPORT, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report));
} finally {
  await new Promise((resolve) => {
    server.close(resolve);
    server.closeAllConnections();
  });
  await store.close();
}
