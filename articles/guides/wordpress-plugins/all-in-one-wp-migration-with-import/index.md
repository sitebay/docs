---
slug: all-in-one-wp-migration-with-import
description: Use a supported migration package to copy a WordPress site into a prepared destination. Importing can
  replace destination data.
keywords:
- wordpress migration
- backup
- restore
- wp migration
tags:
- wordpress
- backup
- restore
- migration
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-03-04
title: Import with All-in-One WP Migration
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- wp-migration
---

Use a supported migration package to copy a WordPress site into a prepared destination. Importing can replace destination data.

## Prepare both sites

Check the plugin's current compatibility, package size limits, and extension requirements. Keep a separate backup of the destination before importing. Do not use a modified or untrusted plugin package to bypass limits.

## Export and import

Install the trusted plugin on the source and create its export package. Store the package privately. On the destination, open the plugin's import view, select the package, and review the overwrite warning before proceeding.

Wait for completion and follow the plugin's post-import instructions. Source-site credentials can replace destination WordPress credentials, so preserve an authorized way to sign in.

## Verify the copy

Check URLs, media, administration, forms, and integrations before changing DNS. Account for new source-site writes after the export.

Follow the [ServMask user guide](https://help.servmask.com/knowledgebase/all-in-one-wp-migration-user-guide/) for your installed version. Use [the migration checklist]({{< relref "platform/migrate-to-sitebay/best-practices-when-migrating-to-sitebay/index.md" >}}) for cutover planning.
