---
title: Where the documentation database belongs
description: Place pgvector and reader configuration in the documentation service, not in the Sorti app or
  SiteBay customer database.
slug: service-ownership
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- where the documentation database belongs
- sorti
- sitebay documentation
tags:
- sorti
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-knowledge
- sorti-byo
- sorti-current-app
- pgvector-primary
- docs-infrastructure
weight: 25
---

The documentation reader belongs to the `sitebay/docs` repository. Its optional PostgreSQL database is retrieval infrastructure, not Sorti's application database and not the SiteBay customer database.

For the current implementation, no pgvector code change is required in `~/sorti` or `~/sitebay`. Run the reader from the documentation checkout, then connect Sorti to it as an MCP service.

## Start without a database

Browser search uses Pagefind files shipped with the website. The MCP reader can search the generated corpus in memory. Both work without PostgreSQL, an embedding model, or an Algolia upload.

Use this mode first to verify the articles, citations, and client connection. Leave `DOCS_READ_DATABASE_URL` and embedding configuration unset. The reader will report lexical retrieval. Setting an embedding endpoint without a database is a configuration error, not a switch to in-memory vector search.

## Add the optional retrieval service

For pgvector, provide a dedicated docs database on a PostgreSQL server with the `vector` extension installed. It may share a database host only when the operator approves the isolation and capacity. Do not point the importer at an existing SiteBay or PostHog application database simply because its connection string is available.

Use separate import and read roles. The importer owns schema setup and writes snapshots; the running reader receives only the access needed to read them. A browser, mobile app, and Sorti session do not need either database credential.

| Configuration | Where it belongs |
| --- | --- |
| `DOCS_CORPUS` | Reader and importer environment; the exact generated corpus file |
| `DOCS_IMPORT_DATABASE_URL` | Import job only; never the running MCP session |
| `DOCS_READ_DATABASE_URL` | Reader process only; a restricted read connection |
| `DOCS_EMBED_URL`, `DOCS_EMBED_MODEL`, `DOCS_EMBED_DIMENSIONS` | Importer and reader when semantic retrieval is enabled |
| `DOCS_MCP_TOKEN` | HTTP reader and the connecting client's secret configuration |
| `DOCS_ALLOWED_HOSTS`, `DOCS_ALLOWED_ORIGINS` | HTTP reader behind the approved proxy |
| `mcpServers` | Sorti session configuration; service name, endpoint, and its authentication |

The extension alone does not create embeddings. The current adapter calls an explicitly selected Ollama embedding endpoint. Install a suitable model separately, use the same model and dimensions for import and queries, and evaluate results. No language-model API key is required for local lexical mode.

## Deploy without coupling the repositories

Build the articles, Pagefind files, and corpus together. Import that corpus revision before starting a database-backed reader against it. Keep the previous corpus and database snapshot while switching readers; the importer does not delete older snapshots automatically.

The web artifact can be served independently from the MCP process. The reader needs Node and its `knowledge/` dependencies. A persistent HTTP deployment also needs an approved process manager, secret storage, health monitoring, and a reachable authenticated HTTPS endpoint for remote clients. A loopback test is not that deployment.

Changing `~/sitebay` is only necessary for an intentionally different integration, such as making the SiteBay backend host or provision the docs service. Changing `~/sorti` is only necessary for product-level behavior such as making the reader a default connection. Neither change is required to use the existing MCP configuration path.

Follow [pgvector setup]({{< relref "knowledge/pgvector.md" >}}) for the database and [MCP setup]({{< relref "knowledge/read-with-mcp.md" >}}) for the client connection. Keep the database migration, service activation, and website publication as separate operations with separate checks.

## Infrastructure project

The Kubernetes resources now have a dedicated project in `pulumi-aks/docs-knowledge/`. Its database is separate from the platform database, and its Pulumi state is separate from the parent stack. The reader implementation and image packaging remain in `sitebay/docs`.

Follow [Deploy with Pulumi]({{< relref "knowledge/deploy-with-pulumi.md" >}}) for the required owner configuration and acceptance checks. The infrastructure definition is not evidence that the cluster, reader image, public hostname, or embedding provider has been activated.
