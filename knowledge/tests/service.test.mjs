import http from 'node:http';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { CorpusStore } from '../src/corpus.mjs';
import { callTool, resourceRead, resourceUri, capabilities } from '../src/service.mjs';
import { embeddingClient, validVector } from '../src/embeddings.mjs';
import { listen } from '../src/http.mjs';
import { fixture } from './fixture.mjs';
const make = () => new CorpusStore(fixture());
const token = 'docs-test-only-token-not-production-000000000';
const headers = { authorization: `Bearer ${token}`, 'content-type': 'application/json' };

test('source filter, lexical ranking, line citations and complete pagination', async () => {
  const s = make();
  const r = await s.search({ query: 'workspace active site' });
  assert.equal(r.results[0].title, 'Sorti workspace');
  assert(r.results.every((x) => x.namespace === 'sitebay'));
  assert.equal((await s.search({ query: 'Akamai', source: 'sitebay' })).results.length, 0);
  assert.equal(
    (await s.search({ query: 'Akamai', source: 'linode' })).results[0].authority,
    'external-reference',
  );
  const read = s.read({ id: r.results[0].id, max_lines: 1 });
  assert.equal(read.line_end, 1);
  assert.equal(read.next_line, 2);
  assert.match(read.citation, /#L1-L1$/);
  const first = s.list({ limit: 1 });
  assert(first.next_cursor);
  assert.equal(s.list({ limit: 1, cursor: first.next_cursor }).next_cursor, null);
});
test('unsafe parameters, mutations, oversized reads and forged resources are refused', async () => {
  const s = make();
  for (const args of [
    { query: 'x', limit: 100 },
    { query: 'x', source: 'private' },
    { query: 'x', path: '/etc/passwd' },
    { query: 'x', sql: 'DROP TABLE docs' },
  ])
    await assert.rejects(callTool(s, 'search_docs', args));
  await assert.rejects(callTool(s, 'write_doc', {}));
  assert.throws(() => s.read({ id: '../../.env' }));
  assert.throws(() => s.read({ id: [...s.documents.keys()][0], max_lines: 10000 }));
  assert.throws(() => resourceRead(s, 'file:///etc/passwd'));
  await assert.rejects(s.search({ query: 'restore', mode: 'semantic' }));
});
test('source tampering is detected and embedding export is explicit', () => {
  const f = fixture();
  f.documents[0].raw += ' altered';
  assert.throws(() => new CorpusStore(f));
  assert.throws(() =>
    embeddingClient({ DOCS_EMBED_URL: 'https://outside.example/embed', DOCS_EMBED_MODEL: 'model' }),
  );
  assert.throws(() => validVector([0, 0, 0], 3));
  assert.throws(() => validVector([1, NaN], 2));
  assert.equal(embeddingClient({}), null);
});
test('standard MCP stdio initialization, tools and resources round trip', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'docs-stdio-')),
    filename = path.join(dir, 'corpus.json');
  await fs.writeFile(filename, JSON.stringify(fixture()));
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [fileURLToPath(new URL('../src/server.mjs', import.meta.url)), '--stdio'],
    env: { PATH: process.env.PATH, DOCS_CORPUS: filename },
    stderr: 'pipe',
  });
  const client = new Client({ name: 'docs-test', version: '1.0.0' });
  let stderr = '';
  transport.stderr?.on('data', (d) => (stderr += d));
  try {
    await client.connect(transport);
    const roster = await client.listTools();
    assert.equal(roster.tools.length, 4);
    assert(roster.tools.every((t) => t.annotations.readOnlyHint));
    const result = await client.callTool({ name: 'search_docs', arguments: { query: 'pgvector' } });
    assert.equal(result.structuredContent.results[0].title, 'pgvector retrieval');
    const list = await client.listResources();
    assert.equal(list.resources.length, 3);
    const read = await client.readResource({ uri: list.resources[0].uri });
    assert.match(read.contents[0].text, /line_start/);
    const invalid = await client.callTool({ name: 'read_doc', arguments: { id: '/etc/passwd' } });
    assert.equal(invalid.isError, true);
  } finally {
    await client.close();
    await transport.close();
    await fs.rm(dir, { recursive: true });
  }
  assert.equal(stderr, '');
});
test('HTTP MCP and Sorti BYO enforce authentication, origins and a read-only roster', async () => {
  const s = make(),
    server = await listen(s, { token }),
    url = `http://127.0.0.1:${server.address().port}`;
  const client = new Client({ name: 'http-docs-test', version: '1.0.0' });
  try {
    assert.equal((await fetch(url + '/.well-known/byo-mcp/capabilities.json')).status, 401);
    assert.equal(
      (
        await fetch(url + '/mcp', {
          method: 'POST',
          headers: { ...headers, origin: 'https://untrusted.example' },
          body: '{}',
        })
      ).status,
      403,
    );
    const hostileHost = await new Promise((resolve, reject) => {
      const req = http.get(url + '/healthz', { headers: { host: 'untrusted.example' } }, (res) => {
        res.resume();
        resolve(res.statusCode);
      });
      req.on('error', reject);
    });
    assert.equal(hostileHost, 403);
    const caps = await (
      await fetch(url + '/.well-known/byo-mcp/capabilities.json', { headers })
    ).json();
    assert.deepEqual(caps, capabilities);
    const response = await fetch(url + '/byo/mcp', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: { name: 'search_docs', arguments: { query: 'workspace' } },
      }),
    });
    const result = await response.json();
    assert.equal(result.result.structuredContent.results[0].title, 'Sorti workspace');
    const wrong = await (
      await fetch(url + '/byo/mcp', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 2,
          method: 'tools/call',
          params: { name: 'Shell', arguments: { command: 'touch /tmp/no' } },
        }),
      })
    ).json();
    assert(wrong.error);
    await client.connect(
      new StreamableHTTPClientTransport(new URL(url + '/mcp'), {
        requestInit: { headers: { authorization: `Bearer ${token}` } },
      }),
    );
    assert.equal((await client.listTools()).tools.length, 4);
    assert.equal(
      (await client.callTool({ name: 'docs_topics', arguments: {} })).isError,
      undefined,
    );
  } finally {
    await client.close();
    await new Promise((resolve) => {
      server.close(resolve);
      server.closeAllConnections();
    });
  }
});

test('duplicate chunks, forged line positions and unexpected argument keys fail', async () => {
  const duplicate = fixture();
  duplicate.documents[0].chunks.push({ ...duplicate.documents[0].chunks[0] });
  assert.throws(() => new CorpusStore(duplicate));
  const offset = fixture();
  offset.documents[0].chunks[0].line_start = 0;
  assert.throws(() => new CorpusStore(offset));
  await assert.rejects(
    callTool(make(), 'search_docs', JSON.parse('{"query":"x","__proto__":"bad"}')),
  );
});
