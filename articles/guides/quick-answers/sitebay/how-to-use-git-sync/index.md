---
slug: how-to-use-git-sync
description: Start by identifying the site and branch you intend to change. Preserve any existing edits before connecting
  or synchronizing a working directory.
keywords:
- sitebay
- how to
- git sync
- wordpress hosting
aliases:
- /quick-answers/sitebay/how-to-use-git-sync/
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-19
title: Use Git Sync for a reviewed change
title_meta: Use Git Sync for a reviewed change
tags:
- sitebay
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- git-sync
- lifecycle
---

Start by identifying the site and branch you intend to change. Preserve any existing edits before connecting or synchronizing a working directory.

## Prepare

Review the local diff, commit the intended files, and inspect the remote commit and SiteBay health independently. If a conflict appears, resolve ownership of the edits; do not run an automatic pull or reset inside a dirty production checkout.

## Inspect the result

Read the operation's returned status and identifiers. A timed-out request may already have started, so check state before retrying a mutation. Do not overwrite another contributor's files simply because they are absent from your local branch.

## Continue with the full procedure

[Connect and verify Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}) explains the `wp-content/` repository layout, private configuration, branch selection and recovery boundaries. For rollback planning, see [site lifecycle and restore operations]({{< relref "products/platform/site-lifecycle/index.md" >}}).
