---
slug: transferring-a-wordpress-site-to-a-new-server
description: Plan the application copy and the traffic cutover separately. Files, database content, DNS, email,
  and external services may need different migration steps.
keywords:
- wordpress
- transfer
- migration
- hosting
tags:
- wordpress
- transfer
- migration
- hosting
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-25
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Transfer a WordPress site
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- wp-migration
- lifecycle
---

Plan the application copy and the traffic cutover separately. Files, database content, DNS, email, and external services may need different migration steps.

## Before switching traffic

Check compatibility, keep a private backup, and test the destination without real customer side effects. Plan a final sync for orders, comments, uploads, or other writes made after the initial copy.

## After the move

Test public pages, administration, media, forms, and integrations. Keep the old environment available until the destination and recent data are verified.

[Follow the full migration checklist]({{< relref "platform/migrate-to-sitebay/best-practices-when-migrating-to-sitebay/index.md" >}}).
