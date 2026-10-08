---
slug: sitebay-writers-formatting-tutorial
author:
  name: SiteBay
  email: support@sitebay.org
description: Submit a focused change to sitebay/docs with the source and checks needed to review it.
keywords:
- style tutorial
- format
- formatting
- how to write
- write for us
- write for sitebay
- sitebay support
- submissions
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases:
- /sitebay-writers-formatting-tutorial/
- /sitebay-writers-tutorial/
- /style-tutorial/
modified_by:
  name: SiteBay
published: 2024-04-15
title: Contribute a documentation change
show_on_rss_feed: false
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- docs-style
modified: 2026-10-07
---

Submit a focused change to `sitebay/docs` with the source and checks needed to review it.

## Edit the source

Article Markdown lives under `articles/`, not in generated `docs/` or `public/` output. Preserve the existing URL, attribution, and license. Use `_index.md` for a section with child pages.

## Write the procedure

Start with the user's outcome. State prerequisites, describe the actual steps, and include a verification. Keep exact API names and useful examples, but remove filler and unsupported claims.

Use [Documentation style]({{< relref "docs-style.md" >}}) for the shared conventions. Add a screenshot only when it was actually captured and helps explain the task.

## Check and submit

Run the repository's publishing, link, editorial, and regression checks described in `ci/README.md`. Include source references and note any operation you could not test. Open a pull request with the reason for the change.

This contribution guide does not promise payment, account credits, or a transfer of copyright. Any separate arrangement must be established explicitly.
