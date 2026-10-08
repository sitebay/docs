---
slug: best-practices-when-migrating-to-sitebay
authors:
- SiteBay
description: Move a site only after you have identified its data, dependencies, destination, and rollback plan.
keywords:
- migrate
- wordpress migration
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-24
title: Plan a WordPress migration
tags:
- sitebay platform
contributors:
- SiteBay
aliases:
- /platform/migrate-to-sitebay/best-practices-when-migrating-to-sitebay/
doc_sources:
- wp-migration
- lifecycle
---

Move a site only after you have identified its data, dependencies, destination, and rollback plan.

## Inventory the source

Record the WordPress version, themes, plugins, database, uploads, domains, email, scheduled work, and external integrations. Confirm who controls the hosting, DNS, and credentials.

## Prepare the destination

Create the intended SiteBay site and check compatibility and plan limits. Test a copy without redirecting live visitors. Disable real payment, email, or campaign side effects during testing.

## Plan the final sync

Choose a cutover time and account for orders, comments, uploads, and other writes that can arrive after the first copy. Decide how to pause or reconcile those changes.

## Verify and cut over

Check public pages, administration, media, links, forms, scheduled tasks, and required integrations. Update DNS only after the destination is ready. Retain the old environment until the new site and recent data are verified.

Use the [WordPress migration handbook](https://developer.wordpress.org/advanced-administration/upgrade/migrating/) for application-specific steps and [Site lifecycle]({{< relref "products/platform/site-lifecycle/index.md" >}}) for platform operations.
