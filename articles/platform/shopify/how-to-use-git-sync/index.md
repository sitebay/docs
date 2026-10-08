---
title: Git workflows and Shopify scope
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
description: A Shopify theme repository and a WordPress Git Sync site are different targets. A theme commit does
  not back up Shopify orders, customers or provider billing.
show_on_frontpage: true
title_short: Git workflows and Shopify scope
weight: 30
cascade:
  weightAge: 0
  weightSearchBoost: true
icon: cube
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- sitebay platform
- sitebay documentation
published: 2025-03-18
slug: how-to-use-git-sync
doc_sources:
- git-sync
- lifecycle
modified: 2026-10-07
---

A Shopify theme repository and a WordPress Git Sync site are different targets. A theme commit does not back up Shopify orders, customers or provider billing.

## Prepare

Use the provider-specific site reference and the connection offered for that store. Verify the theme/environment being changed and preview before publication. For a WordPress site that embeds Shopify, manage the WordPress files and Shopify store through their respective interfaces.

## Inspect the result

Read the operation's returned status and identifiers. A timed-out request may already have started, so check state before retrying a mutation. Do not overwrite another contributor's files simply because they are absent from your local branch.

## Continue with the full procedure

[Connect and verify Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}) explains the `wp-content/` repository layout, private configuration, branch selection and recovery boundaries. For rollback planning, see [site lifecycle and restore operations]({{< relref "products/platform/site-lifecycle/index.md" >}}).
