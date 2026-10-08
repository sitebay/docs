import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer, loadStore } from './service.mjs';
const mode = process.argv[2] || '--stdio';
if (!['--stdio', '--http'].includes(mode) || process.argv.length > 3)
  throw new Error('Usage: server.mjs --stdio|--http');
const store = await loadStore();
if (mode === '--stdio') await createServer(store).connect(new StdioServerTransport());
else {
  const { listen } = await import('./http.mjs');
  const server = await listen(store, {
    port: Number(process.env.DOCS_MCP_PORT || 8788),
    token: process.env.DOCS_MCP_TOKEN,
    allowedHosts: (process.env.DOCS_ALLOWED_HOSTS || '').split(',').filter(Boolean),
    allowedOrigins: (process.env.DOCS_ALLOWED_ORIGINS || '').split(',').filter(Boolean),
  });
  console.error(
    JSON.stringify({
      service: 'sitebay-docs',
      address: server.address(),
      revision: store.revision,
    }),
  );
  for (const signal of ['SIGINT', 'SIGTERM'])
    process.once(signal, () => {
      server.close(async () => {
        await store.close();
        process.exit(0);
      });
      server.closeIdleConnections();
    });
}
