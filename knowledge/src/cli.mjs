import { loadStore } from './service.mjs';
const [command, ...args] = process.argv.slice(2);
const store = await loadStore();
try {
  let result;
  if (command === 'search') {
    const external = args[0] === '--upstream';
    if (external) args.shift();
    result = await store.search({ query: args.join(' '), source: external ? 'linode' : 'sitebay' });
  } else if (command === 'read')
    result = store.read({ id: args[0], ...(args[1] ? { start_line: Number(args[1]) } : {}) });
  else if (command === 'topics') result = store.topics();
  else throw new Error('Usage: cli.mjs search [--upstream] QUERY | read ID [LINE] | topics');
  console.log(JSON.stringify(result, null, 2));
} finally {
  await store.close();
}
