---
slug: how-git-sync-works-with-point-in-time-machine
authors:
- SiteBay
contributors:
- SiteBay
modified_by:
  name: SiteBay
description: A Git commit represents tracked files.
keywords:
- git-sync
- pit-machine
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-26
modified: 2026-10-08
title: Git history and point-in-time recovery
h1_title: Git history and point-in-time recovery
tags:
- sitebay platform
- development
- git sync
aliases:
- /platform/git-sync/how-git-sync-works-with-point-in-time-machine/
doc_sources:
- git-sync
- lifecycle
---

A Git commit represents tracked files. WordPress settings, pages and other content can live in the database; uploads may be excluded from the repository. Recovering one layer does not establish that all layers match.

## Select the supported recovery point

Use the restore window and identifiers actually reported for the site. Do not infer an exact recoverable minute from a Git timestamp or assume unlimited retention. Preview the affected files and database state and account for content created since that point.

## Preserve the current state

The higher-level restore-to-point workflow creates a pre-restore checkpoint and returns a recovery handle. The low-level PIT operation does not promise the same protection by itself. Preserve the returned checkpoint and restore ID until the new state is verified.

## Review repository effects

Use the documented SiteBay workflow for a combined site restore. A manual `git revert` changes files, not the WordPress database. Review the restore’s scope and completion status before making further changes.

## Verify and resume

Wait for the restore operation to settle. Check the page, media, login, forms and any transactional data, then inspect Git Sync health and the selected branch. An active sync indicator does not prove the database was restored. For a Shopify theme, separately verify the provider's theme state; WordPress recovery is not a Shopify order restore.

See [Git Sync setup]({{< relref "products/git-sync/get-started/index.md" >}}) and [backup and restore checks]({{< relref "guides/quick-answers/sitebay/sitebay-dump-and-restore-commands/index.md" >}}).
