---
title: Read the Linode reference library
description: Use a pinned upstream library without replacing SiteBay procedures or modifying third-party
  articles.
slug: upstream-library
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- read the linode reference library
- sitebay documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-knowledge
- linode-upstream
---

The upstream library provides external reading alongside SiteBay documentation. It does not replace SiteBay’s product contracts.

## Source pin

`knowledge/upstream-lock.json` records the reviewed `linode/docs` commit. Review upstream changes before updating that lock. The reader uses original Markdown from pinned Git objects and retains source text, attribution, and per-article licenses.

The reviewed upstream includes MCP Gateway, pgvector, Haystack, and infrastructure guides. These describe their named tools and provider setup. A Linode marketplace prerequisite is not a SiteBay entitlement.

## Build a reference corpus

Clone upstream separately and keep the combined corpus outside the public site:

```sh
git clone --branch develop https://github.com/linode/docs.git ../linode-docs
python3 ci/scripts/build-docs-corpus.py \
  --linode-repo ../linode-docs \
  --output .cache/knowledge/combined.json
```

Select that file with `DOCS_CORPUS` when starting the reader. Use `source: "linode"` to search external material. The builder refuses to write the combined library under `public/`.

## Preserve ownership and routes

Do not overwrite SiteBay articles with the upstream tree. Upstream moved its assets and search exports for a cloud-site migration. Its empty root `index.json`, alias resets, and product-link rewrites are not compatible replacements for this site.

Check each article’s license before republication. Preserve attribution. Write new SiteBay workflows independently from primary tool documentation and verify them against SiteBay’s implementation.
