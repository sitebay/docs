---
title: Build and publish one documentation snapshot
description: Build the website, browser search, and agent corpus together; release the verified artifact.
slug: publishing
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- build and publish one documentation snapshot
- sitebay documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-knowledge
---

Build the HTML, browser search, and agent corpus together so readers receive one revision.

## Build

From the documentation checkout:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm --prefix knowledge ci --ignore-scripts --no-audit --no-fund
npm run build:docs
```

The output includes `public/pagefind/`, `public/knowledge/corpus.json`, `public/knowledge/search-manifest.json`, and `public/llms.txt`. Pagefind handles browser search without an Algolia write key. The corpus feeds the optional MCP service.

## Verify

Run publishing, editorial, spelling, knowledge-service, and browser checks. Confirm that the search manifest and corpus share a revision. Submit a real search and follow its result. Loading an article alone does not verify search behavior.

The PostgreSQL importer is a separate operator command. A site build never connects to a customer database, writes an Algolia index, or attaches a reader to a running Sorti session.

## Release

Publish the complete verified output through the approved hosting process. Keep the previous artifact for rollback. Do not mix a newer Pagefind directory with older HTML. Switch database-backed readers only after their exact corpus revision is imported.

Legacy Algolia and object-storage upload scripts are not part of the default build. Before running one, verify its destination, credentials, index shape, and merge behavior. A provider-branded script is not evidence that its bucket is the correct SiteBay destination.
