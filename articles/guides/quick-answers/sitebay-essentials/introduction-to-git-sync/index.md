---
slug: introduction-to-git-sync
description: Git Sync records and transfers the configured repository files. It does not capture every database
  edit made in WordPress.
keywords:
- git sync
- version control
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Git Sync in SiteBay
bible: true
tags:
- sitebay
- git
aliases:
- /quick-answers/sitebay-essentials/introduction-to-git-sync/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- git-sync
- lifecycle
---

Git Sync records and transfers the configured repository files. It does not capture every database edit made in WordPress.

## Prepare

Check the selected repository, branch and provider authorization. Inspect the returned sync state and the actual page after one small test change. An existing repository link is not proof that the sync process is healthy.

## Inspect the result

Read the operation's returned status and identifiers. A timed-out request may already have started, so check state before retrying a mutation. Do not overwrite another contributor's files simply because they are absent from your local branch.

## Continue with the full procedure

[Connect and verify Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}) explains the `wp-content/` repository layout, private configuration, branch selection and recovery boundaries. For rollback planning, see [site lifecycle and restore operations]({{< relref "products/platform/site-lifecycle/index.md" >}}).
