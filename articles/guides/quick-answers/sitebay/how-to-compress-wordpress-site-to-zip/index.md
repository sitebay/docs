---
slug: how-to-compress-wordpress-site-to-zip
author:
  name: SiteBay
  email: support@sitebay.org
description: A complete WordPress migration usually needs both the relevant files and a database export.
keywords:
- migration
- wordpress
tags:
- migrate
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-20
image: migrate-wordpress.png
title: Package a WordPress migration export
aliases:
- /quick-answers/platform/how-to-compress-wordpress-site-to-zip/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- wp-cli
- lifecycle
- git-sync
---

A complete WordPress migration usually needs both the relevant files and a database export. A ZIP of `wp-content` is not, by itself, a full-site backup, and a migration plugin's proprietary archive is not necessarily a ZIP file.

## Prepare the export

Confirm the source site and choose a quiet or controlled change window. Record its WordPress/PHP compatibility, plugin requirements and custom configuration without placing passwords in the archive notes. Use the source host's export tool or an authorized terminal.

## Package the files

Collect the intended themes, plugins and uploads with the tool appropriate to the destination. Include required dotfiles deliberately. Write the archive to a private directory outside the web-served tree so visitors cannot download it. Check available space before creating another full copy of large uploads.

## Export the database separately

With authorized WP-CLI access, `wp db export /private/path/site.sql` exports the configured database. Replace that illustrative path with a real private destination. The export contains potentially sensitive user and application data; transfer and retain it securely. Verify the export command succeeded and that the destination importer supports the format.

## Validate on the destination

Create or select the authorized SiteBay target, import through its supported migration workflow, and test content, media, permalinks, forms and authentication before DNS cutover. Avoid overwriting newer orders or submissions generated during migration. Keep the original site and verified recovery copies until validation is complete.

An import limit, plugin license or database incompatibility requires a supported migration path; renaming an archive to `.zip` or forcing a plugin upload does not convert its format.
