---
title: Evaluate a LAMP application for migration
authors:
- SiteBay
contributors:
- SiteBay
description: A LAMP application can depend on server features that a managed WordPress site does not expose. Verify
  compatibility before moving it.
keywords:
- migrate a lamp website to sitebay
- sitebay documentation
published: 2025-03-18
slug: migrate-a-lamp-website-to-sitebay
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- platform-architecture
- wp-migration
modified: 2026-10-07
---

A LAMP application can depend on server features that a managed WordPress site does not expose. Verify compatibility before moving it.

## Identify the application

Check whether it is a standard WordPress site or another PHP application. Inventory its web-server rules, PHP extensions, database features, background workers, filesystem access, and external services.

## Verify the target

Compare those requirements with the SiteBay environment available to your account. Site access does not grant permission to change shared infrastructure or install arbitrary system services.

## Test before cutover

For a compatible WordPress site, follow the migration checklist. For a non-WordPress application, establish a supported deployment path with the operator before importing files or pointing a domain at the service.

Start with [SiteBay architecture]({{< relref "products/platform/architecture/index.md" >}}) and [migration planning]({{< relref "platform/migrate-to-sitebay/best-practices-when-migrating-to-sitebay/index.md" >}}).
