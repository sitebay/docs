---
title: Git Sync
title_meta: Git Sync
description: The Git Sync product connects tracked WordPress files to repository history. Read the current configuration
  and operation result before assuming that a pushed commit is deployed.
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- git-sync
- sitebay documentation
published: 2025-03-18
slug: git-sync
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- git-sync
- lifecycle
modified: 2026-10-07
layout: documentation-section
---

The Git Sync product connects tracked WordPress files to repository history. Read the current configuration and operation result before assuming that a pushed commit is deployed.

## Prepare

Use a small change on a test copy to verify file propagation. Check the configured branch, suspended/conflict state and provider access. Preserve ignored content and the database through their own backup mechanisms.

## Inspect the result

Read the operation's returned status and identifiers. A timed-out request may already have started, so check state before retrying a mutation. Do not overwrite another contributor's files simply because they are absent from your local branch.

## Continue with the full procedure

[Connect and verify Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}) explains the `wp-content/` repository layout, private configuration, branch selection and recovery boundaries. For rollback planning, see [site lifecycle and restore operations]({{< relref "products/platform/site-lifecycle/index.md" >}}).

{{< section-links >}}
