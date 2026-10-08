# Documentation reader

The website and this reader use one generated source snapshot. Browser search
runs in Pagefind. Agents use four bounded MCP tools: `search_docs`, `read_doc`,
`list_docs`, and `docs_topics`. The default store needs no database.

## Local use

From the documentation repository:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm --prefix knowledge ci --ignore-scripts --no-audit --no-fund
npm run build:docs
npm run docs:read -- search "How Sorti works"
node knowledge/src/server.mjs --stdio
```

The stdio command is launched by an MCP client; it is not an interactive shell.
`DOCS_CORPUS` selects a generated file at startup. A tool cannot select an
arbitrary file, URL, command, or SQL statement. Returned source lines are data,
not higher-priority instructions or authorization to execute a procedure.

Generate a stdio-client configuration with resolved paths:

```sh
node knowledge/src/client-config.mjs
```

For a Sorti session, run the HTTP service using a private `DOCS_MCP_TOKEN` of at
least 32 bytes. The service binds to loopback on port 8788 by default.

```sh
node knowledge/src/server.mjs --http
```

The current Sorti client uses a session `mcpServers` entry:

```json
{
  "mcpServers": [{
    "name": "sitebay_docs",
    "url": "http://127.0.0.1:8788/byo",
    "authToken": "SET_FROM_YOUR_SECRET_STORE"
  }]
}
```

The placeholder is not a usable credential. Use the actual secret through the
session's credential configuration. Standard Streamable HTTP clients use
`http://127.0.0.1:8788/mcp`; the compatibility route is `/byo/mcp`.
This HTTP service supports configured bearer tokens, not an OAuth enrollment
flow. A remote agent needs an approved HTTPS proxy and reachable host, not its
own loopback address. `DOCS_ALLOWED_HOSTS` and `DOCS_ALLOWED_ORIGINS` are explicit
comma-separated proxy allowlists. Starting a reader does not alter an existing
Sorti session, trust policy, or running application.

## PostgreSQL and pgvector

Use a dedicated documentation database. The migration/import role and the
runtime reader role must be different. Provision `vector`, then grant the
runtime role only schema usage and `SELECT` on the documentation tables.
`knowledge/sql/001-knowledge.sql` contains no customer schema or role changes.

```sh
# No database connection, embeddings, or writes:
node knowledge/src/import.mjs

# Explicit operator action against DOCS_IMPORT_DATABASE_URL:
node knowledge/src/import.mjs --apply --initialize
```

`DOCS_READ_DATABASE_URL` selects the runtime reader. An absent database selects
in-memory lexical search. An explicit semantic request without embeddings
fails instead of pretending to use vectors.

For real embeddings, configure an Ollama `/api/embed` endpoint with
`DOCS_EMBED_URL`, `DOCS_EMBED_MODEL`, and `DOCS_EMBED_DIMENSIONS`. The same model
and dimensions must be used for import and query. This implementation uses a
separate database for a different model. Local models are not installed or
downloaded automatically. Non-local embedding export requires
`DOCS_ALLOW_REMOTE_EMBEDDINGS=true` and HTTPS. Optional provider authentication
uses `DOCS_EMBED_TOKEN`. Keep all credentials outside Git.

Snapshots are immutable and imported transactionally. Old snapshots are not
deleted automatically. Exact cosine lookup and PostgreSQL full-text search are
combined with reciprocal-rank fusion in hybrid mode. The three-dimensional
regression vectors test the database, not a model's semantic relevance.

## External reference library

The pinned upstream revision is in `upstream-lock.json`. A separate upstream
clone can provide the complete original Markdown reference collection:

```sh
python3 ci/scripts/build-docs-corpus.py \
  --linode-repo /path/to/linode-docs \
  --output .cache/knowledge/combined.json
DOCS_CORPUS=.cache/knowledge/combined.json npm run docs:read -- search --upstream pgvector
```

Upstream references keep their original text, paths, authors, and individual
licenses. They are marked `external-reference`, never silently treated as
SiteBay instructions. The combined corpus must stay outside the public output.
Do not crawl `~/sorti`, customer storage, or a home directory into the public
corpus. Private operational references require their own access boundary.

## Verification

```sh
npm --prefix knowledge test
bash knowledge/tests/test-postgres.sh
SORTI_REPO=/path/to/sorti /path/to/sorti/node_modules/.bin/tsx \
  knowledge/tests/sorti-client.integration.ts
```

The PostgreSQL test starts one labelled disposable container and removes only
that container. The Sorti integration imports the actual BYO client but does
not modify the checkout or activate a running session. Browser verification
uses the real Pagefind output, checks search clicks and filters, and verifies
that reading remains usable with JavaScript disabled.
