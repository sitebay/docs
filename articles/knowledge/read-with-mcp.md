---
title: Read documentation over MCP
description: Connect a read-only service with cited search results and exact source-line reads.
slug: read-with-mcp
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- read documentation over mcp
- sitebay documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-knowledge
- mcp-standard
- sorti-byo
- sorti-current-core
- sorti-current-skills
- docs-infrastructure
- llm-discovery
---

The documentation MCP server exposes reference reads, not shell commands or site-management writes. It works without a database; pgvector is optional.

## Build a local reader

From the documentation checkout:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm --prefix knowledge ci --ignore-scripts --no-audit --no-fund
npm run build:docs
node knowledge/src/server.mjs --stdio
```

A standard MCP client launches the last command as a subprocess. Standard output contains protocol messages only. `DOCS_CORPUS` can select another generated file at startup; tool requests cannot choose filesystem paths.

## Available tools

| Tool | Input | Result |
| --- | --- | --- |
| `search_docs` | Query, source, optional topic and mode | Ranked passages and source locations |
| `read_doc` | Document ID and optional line range | Exact text, citation, hash, and continuation line |
| `list_docs` | Source, topic, optional cursor | Paginated metadata |
| `docs_topics` | Empty object | Installed collections and topic counts |

Search defaults to `sitebay`. `linode` is an external collection; `all` explicitly combines them. Without an embedding backend, the server reports lexical mode and rejects an explicit semantic request.

## Connect Sorti

Set a randomly generated token of at least 32 bytes in `DOCS_MCP_TOKEN`, then start the HTTP service:

```sh
node knowledge/src/server.mjs --http
```

By default, it binds to `127.0.0.1` and defaults to port 8788. For a Sorti agent on the same host, add a session `mcpServers` entry with name `sitebay_docs`, URL `http://127.0.0.1:8788/byo`, and the token as `authToken`. Capabilities are discovered at the origin-root well-known URL.

The `/byo/mcp` endpoint supports the current Sorti JSON-RPC client. Standard Streamable HTTP clients use `/mcp`. Keep credentials in the client secret configuration, not a committed example.

A remote agent needs a reachable authenticated HTTPS endpoint; its loopback address does not refer to this host. Set the expected proxy host and allowed origins explicitly when using a proxy. Use an approved process manager for a persistent service.

## Verify

List the four tools. Search for “How Sorti works,” read its ID, and compare the cited lines with the article. A write-tool request, unknown ID, arbitrary URL, or filesystem path must fail. Starting the service does not attach it to existing Sorti sessions.

## Choose the service owner

Keep reader deployment and database configuration in the documentation service. The Sorti session receives only the reader endpoint and its authentication, not database credentials. [Service ownership]({{< relref "knowledge/service-ownership.md" >}}) separates the optional database, embedding provider, and client setup.

## Deploy a persistent reader

The container deployment uses `DOCS_MCP_HOST=0.0.0.0` with exact allowed hosts and the existing token check. This is an explicit deployment setting; local readers remain loopback-only by default. `/healthz` reports liveness, while `/readyz` also checks the configured database snapshot.

Use [the isolated Pulumi project]({{< relref "knowledge/deploy-with-pulumi.md" >}}) to prepare the dedicated database, import job, reader, and network policy. Packaging or a local test does not activate an existing Sorti session. Read [update and recovery]({{< relref "knowledge/update-and-recover.md" >}}) before replacing a running corpus.

## Read without an MCP connection

The generated website also offers a static reading route. Start with the **Index for agents** link, choose a task, and follow its Markdown page. No database, embedding model, or MCP connection is needed for those public files once the website artifact is deployed.

Each authored page declares its Markdown version in the HTML head and offers **Read as Markdown**. The generated path appends `index.md` to a page ending in `/`. For example, the counter tutorial has `/docs/sorti/build-a-counter-panel/index.md`.

`/docs/llms.txt` is a small task-oriented entry point. `/docs/llms-index.txt` lists every public document. `/docs/knowledge/documents.json` maps document IDs to canonical URLs, Markdown URLs, content hashes, review dates, task summaries where provided, and section line ranges. Fetch the relevant page rather than loading the entire corpus into context.

The Markdown version comes from the rendered article. It includes expanded references, tables, and code without the website navigation. Its line numbers are **not** the original Markdown source lines. Use its source link or `read_doc` for citations to the original source; use the manifest's line ranges only with the rendered Markdown representation.

The six practical walkthroughs include a **Task at a glance** section: goal, prerequisites, changes and limits, and verification. The same metadata is returned with their MCP document records. This helps a reader choose the correct procedure without treating an example prompt as permission to execute it.

Publishing an agent index does not prove that a search engine has indexed the site, that an assistant will recommend it, or that the reader service is running. The current artifact must be deployed and reachable first.
