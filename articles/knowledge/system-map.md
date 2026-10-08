---
title: How the documentation and Sorti fit together
description: Locate the reference source, retrieval service, application, agent, and product backend.
slug: system-map
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- how the documentation and sorti fit together
- sitebay documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-knowledge
- sorti-runtime
- api-contract
- sorti-current-core
- sorti-current-skills
- docs-infrastructure
---

The documentation repository explains the system. It does not own customer state or grant access to it.

## Component responsibilities

| Component | Responsibility | Source |
| --- | --- | --- |
| Authored documentation | Procedures, concepts, API references, and attribution | `sitebay/docs/articles/` |
| Browser search | Search files shipped with the static site | Pagefind and `assets/js/docs-search.js` |
| Agent reader | Search, source-line reads, and document metadata | `sitebay/docs/knowledge/src/` |
| Optional retrieval database | Full-text and vector lookup for a fixed snapshot | `knowledge/sql/001-knowledge.sql` |
| Retrieval infrastructure | Dedicated database, import Job, reader and network policy | `pulumi-aks/docs-knowledge/` |
| Sorti application | Conversation, canvas, panels, and workspace | `sorti/apps/sorti` |
| Sorti agent | Session context, tool coordination, and results | `sorti/apps/sorti-agent` |
| Shared contracts | Cross-component events and payloads | `sorti/packages/sorti-contract` |
| SiteBay backend | Authorization and site operations | SiteBay API routes and services |

## Reference flow

`articles/` is built into HTML and a cited corpus. Pagefind indexes the rendered articles. The MCP service reads the corpus directly or uses a separately imported pgvector snapshot to retrieve passages. Neither path executes customer operations.

A Sorti session can attach the reader through its `mcpServers` extension. The reader advertises four read-only tools and a documentation specialist. Attaching it is separate from enabling other applications, approving their tools, or publishing a site.

## Find the current implementation

Use `SORTI.md` in the current checkout to locate code. Read the relevant `AGENTS.md` and implementation before editing. Runtime schemas and server authorization determine what an operation accepts. A documentation hash identifies the text that was read; it does not certify a live deployment.

Do not index an entire home directory as public knowledge. Credentials, customer files, internal reports, and repository instructions need separate access controls. This builder selects published documentation and an explicitly pinned public reference library.

## Separate skills from reference retrieval

The team skill library is part of Sorti and its authenticated team configuration. Skills provide reusable instructions and collections; the documentation reader supplies cited reference passages. Neither the browser Pagefind index nor the docs pgvector database is the skill library or mission ledger.

For an existing MCP connection, no pgvector implementation change is required in the Sorti or SiteBay source tree. See [service ownership]({{< relref "knowledge/service-ownership.md" >}}) for the required process and database configuration.
