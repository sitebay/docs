---
slug: how-to-use-sitebay-git-sync
authors:
- SiteBay
contributors:
- SiteBay
modified_by:
  name: SiteBay
description: Connect a repository only after reviewing the existing site and repository contents. Git Sync changes
  a working environment; it is not a passive export switch.
keywords:
- git-sync
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-26
modified: 2026-10-07
title: Set up a Git-backed WordPress project
h1_title: Set up a Git-backed WordPress project
tags:
- sitebay platform
- development
- git sync
aliases:
- /platform/git-sync/how-to-use-git-sync/
doc_sources:
- git-sync
- wp-config
- lifecycle
---

Connect a repository only after reviewing the existing site and repository contents. Git Sync changes a working environment; it is not a passive export switch.

## Repository preparation

Keep `wp-content/` at the root with the themes and plugins you intend to version. Do not add `wp-admin`, `wp-includes`, credential-bearing `wp-config.php`, database dumps or session configuration. Optional `wp-config-overrides.php` values are parsed as a small allowlisted set of literals; rejected values have explicit reasons.

A `.gitignore` should reflect the project's actual generated files and recovery policy. Ignoring uploads or backups keeps them out of Git, but does not verify an independent storage or recovery copy. Inspect both tracked and untracked files before the first connection.

## Connection and branch

Authorize the provider through the product, choose the intended site, and validate the repository. Confirm the branch that will feed live or staging. The process does not promise to reconcile every simultaneous local, WordPress-admin and agent edit without conflict.

## Review a change

Commit a small scoped edit, record its hash and inspect the synchronization result. Check the actual WordPress page, not only a repository UI. Read health errors and any suspended/partial-state reason before retrying. A request that reached the server but lost its response can have an uncertain outcome.

## Configuration and recovery

Follow [the current setup and configuration procedure]({{< relref "products/git-sync/get-started/index.md" >}}) for the accepted layout and overrides. Before a risky update, create and verify a suitable checkpoint. A file-only Git rollback cannot stand in for a combined WordPress database restore.
