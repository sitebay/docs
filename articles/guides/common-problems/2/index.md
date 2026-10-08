---
slug: wordpress-beginner-tips
author:
  name: SiteBay
  email: support@sitebay.org
description: Review a change in staging before applying it to the live site.
keywords:
- wordpress
- help
- beginner
- introduction
tags:
- wordpress
- quickstart
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-29
modified_by:
  name: SiteBay
title: Check a WordPress change before publishing
contributor:
  name: SiteBay
concentrations:
- WordPress
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- lifecycle
- git-sync
modified: 2026-10-07
---

Review a change in staging before applying it to the live site.

## Test the affected paths

Open the edited page on mobile and desktop. Check navigation, forms, media, and administration actions involved in the change. Use test credentials and sandbox integrations so a check cannot charge a customer or send real campaigns.

## Compare the state

Inspect the code diff and the site settings changed by the task. Git tracks committed files; it does not automatically track the WordPress database or media uploads.

## Publish and recheck

Use the site's configured publishing workflow. Wait for a completed result and repeat the user-facing test on the live site. Keep the rollback target clear before starting.

See [staging]({{< relref "guides/quick-answers/sitebay/sitebay-dashboard-staging-site/index.md" >}}) and [Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}).
