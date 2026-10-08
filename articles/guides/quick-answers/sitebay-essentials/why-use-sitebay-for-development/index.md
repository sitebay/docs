---
slug: why-use-sitebay-for-development
description: Use SiteBay to edit WordPress code in a site-connected workspace and review changes in staging.
keywords:
- sitebay
- wordpress development
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Develop WordPress on SiteBay
tags:
- wordpress
- development
aliases:
- /quick-answers/sitebay-essentials/why-use-sitebay-for-development/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- code-server
- git-sync
- lifecycle
---

Use SiteBay to edit WordPress code in a site-connected workspace and review changes in staging.

## Development loop

1. Select the intended site and environment.
2. Open code-server or connect the SiteBay Agent Bridge.
3. Make a small change and inspect the diff.
4. Test the affected page, administration screen, and relevant integrations.
5. Publish through the site's configured workflow and verify the result.

Repository-backed code, WordPress content, uploaded media, and billing settings are separate concerns. A Git commit does not capture the entire site.

Read [Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}) and [staging]({{< relref "guides/quick-answers/sitebay/sitebay-dashboard-staging-site/index.md" >}}) before your first production change.
