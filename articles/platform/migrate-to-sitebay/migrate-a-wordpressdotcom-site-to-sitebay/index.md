---
slug: migrate-a-wordpressdotcom-site-to-sitebay
authors:
- SiteBay
description: Export WordPress.com content and import it into a prepared WordPress site. A content export is not
  a full copy of its hosting environment.
keywords:
- wordpress
- wordpress.com
- migrate
- website migration
tags:
- sitebay platform
- wordpress
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Move content from WordPress.com
external_resources:
- '[WordPress.com: Moving to Self-Hosted WordPress](https://move.wordpress.com/)'
contributors:
- SiteBay
aliases:
- /platform/migrate-to-sitebay/migrate-a-wordpressdotcom-site-to-sitebay/
doc_sources:
- wp-migration
---

Export WordPress.com content and import it into a prepared WordPress site. A content export is not a full copy of its hosting environment.

## Export the content

Use the export workflow available in your WordPress.com dashboard. Review which content the export includes and retain the downloaded file privately. Keep the source online while the destination retrieves any linked media.

## Import and check

Use the destination's WordPress importer. Review author assignment and attachment options, then inspect posts, pages, categories, links, and media.

Themes, plugins, custom functionality, subscriptions, and provider-specific features may need separate setup. Do not assume they are reproduced by the content file.

## Complete the move

Test the destination and account for content added after export. Move or update the domain only after the destination is ready, and consider redirects from old URLs.

Read [WordPress.com's export documentation](https://wordpress.com/support/export/) and the [migration checklist]({{< relref "platform/migrate-to-sitebay/best-practices-when-migrating-to-sitebay/index.md" >}}).
