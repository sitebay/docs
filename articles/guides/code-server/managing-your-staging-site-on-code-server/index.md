---
slug: managing-your-staging-site-on-code-server
author:
  name: SiteBay
  email: support@sitebay.org
keywords:
- staging
- code server
- wordpress
description: A staging environment is a separate test copy, not the live canvas preview. Verify the selected site
  and staging state before opening a workspace or running WP-CLI.
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Edit an explicitly selected staging environment
show_on_frontpage: true
weight: 10
icon: book
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- code-server
- lifecycle
- wp-cli
---

A staging environment is a separate test copy, not the live canvas preview. Verify the selected site and staging state before opening a workspace or running WP-CLI.

## Access Staging

Use the current site's staging controls and wait for staging creation to complete. Open the environment-specific workspace action when offered. Inspect the displayed domain, branch and files. Do not assume that a code-server tab always opens staging or that a guessed `/bitnami/stagewordpress` path identifies the correct database.

## Inspect before a command

Check `pwd`, the opened workspace and the WordPress path required by WP-CLI. Run a read-only version or plugin-list check first. Do not respond to a permission error with blanket `chmod` changes or elevated access; the target may simply be wrong or unavailable.

## Make a test change

Create a suitable recovery point, change one theme/plugin file, inspect the diff and verify the staging page. Database exports belong in a private destination. A URL search-replace needs its own dry-run and review; a broad plugin update is not a harmless connection test.

## Promote deliberately

Review the file and database differences, incoming live content, external integrations and rollback handle. Use the supported promotion operation with explicit authorization and inspect the resulting live site. Saving a staging file or merging a repository branch does not alone prove the promotion occurred.

See [site lifecycle]({{< relref "products/platform/site-lifecycle/index.md" >}}) and [the current code-server workspace procedure]({{< relref "products/code-server/get-started/index.md" >}}). Do not recreate staging as a workaround for a live canvas failure.
