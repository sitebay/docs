---
authors:
- SiteBay
contributors:
- SiteBay
modified_by:
  name: SiteBay
description: Use this section to connect a repository, understand its scope, and plan recovery without confusing
  file history with the WordPress database.
keywords:
- git-sync
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-26
title: Git Sync workflows
show_in_lists: true
aliases:
- /platform/git-sync/
slug: git-sync
doc_sources:
- git-sync
- lifecycle
modified: 2026-10-07
layout: documentation-section
---

Use this section to connect a repository, understand its scope, and plan recovery without confusing file history with the WordPress database.

## Prepare

Choose a supported provider connection, verify the expected repository layout, and work in an explicitly selected environment. A private repository credential is not a public setup example.

## Inspect the result

Read the operation's returned status and identifiers. A timed-out request may already have started, so check state before retrying a mutation. Do not overwrite another contributor's files simply because they are absent from your local branch.

## Continue with the full procedure

[Connect and verify Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}) explains the `wp-content/` repository layout, private configuration, branch selection and recovery boundaries. For rollback planning, see [site lifecycle and restore operations]({{< relref "products/platform/site-lifecycle/index.md" >}}).

{{< section-links >}}
