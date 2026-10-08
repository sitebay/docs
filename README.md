# SiteBay documentation

Guides for using SiteBay and extending Sorti, with one source for browser search
and read-only agent retrieval.

Start with the [task map](articles/knowledge/task-map.md) to find a procedure,
or the [system map](articles/knowledge/system-map.md) to understand ownership
and component boundaries. The [reader guide](knowledge/README.md) covers MCP,
CLI access, optional pgvector storage, and the external Linode library.

## Build and search locally

Use the toolchain in [ci/README.md](ci/README.md). From this repository:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm --prefix knowledge ci --ignore-scripts --no-audit --no-fund
python3 -m pip install -r ci/requirements-publishing.txt
npm run build:docs
npm run docs:read -- search "How Sorti works"
node knowledge/src/client-config.mjs
```

The build produces HTML, Pagefind search files, `knowledge/corpus.json`, and
`llms.txt` together under `public/`. It does not need an Algolia key. Rebuild
these files together whenever an article changes. The final command prints a
local stdio MCP client configuration; it does not install or activate it.

## Repository map

| Location | Purpose |
| --- | --- |
| `articles/` | Maintained Markdown, source attribution, and public guides |
| `articles/knowledge/` | Task and system maps, reader setup, pgvector, and publishing |
| `knowledge/` | Read-only MCP/CLI service, database schema, importer, and tests |
| `layouts/` and `assets/` | Site-owned reading UI and Pagefind integration |
| `ci/` | Build, article review, source, link, browser, and retrieval checks |
| `public/` | Generated website and public source corpus; not committed |
| `docs/` | Historical generated files; not an additional article source |

The MCP tools are `search_docs`, `read_doc`, `list_docs`, and `docs_topics`.
They return cited reference material, not permission to execute it. The default
reader uses local lexical search; PostgreSQL and real embeddings are optional,
explicit operator configuration.

## External references and publication

Linode's pinned Markdown library can be indexed separately for reading. Its
original text, authors, license, source path, and revision stay attached.
External instructions are not SiteBay deployment contracts. Keep combined or
private corpora outside the public website; do not index a home directory or
customer workspace into public documentation.

The active workflow builds and verifies artifacts without deploying them.
Retired Algolia-writing workflows are in `ci/legacy-workflows/`. The existing
rollback on `main` remains until this candidate is explicitly accepted.

See [CONTRIBUTING.md](CONTRIBUTING.md) for edits and
[NOT_SURE.md](NOT_SURE.md) for verification boundaries. Preserve each article's
individual license and attribution rather than assuming one blanket license.
