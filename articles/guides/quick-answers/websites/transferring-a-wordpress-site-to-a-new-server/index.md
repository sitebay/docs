---
slug: transferring-a-wordpress-site-to-a-new-server
description: "Transfer your WordPress site to SiteBay."
keywords: ['wordpress', 'transfer', 'migration', 'hosting']
tags: ['wordpress', 'transfer', 'migration', 'hosting']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-25
modified: 2024-12-04
modified_by:
  name: SiteBay
title: "Transfer WordPress to SiteBay"
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Migrate your WordPress site to SiteBay.

## Export Content

WordPress Dashboard → Tools → Export → Download XML

## Backup Files and Database

### Files
Download via FTP:
- `wp-content/` (themes, plugins, uploads)
- `wp-config.php`

### Database
Export via phpMyAdmin as `.sql` file.

## Transfer to SiteBay

1. Upload files via FTP or File Manager
2. Create database in SiteBay control panel
3. Import `.sql` file
4. Update `wp-config.php` with new database credentials

## Finalize

1. **Update URLs** - Use search-replace plugin if domain changed
2. **Update DNS** - Point domain to SiteBay
3. **Test** - Check links, images, functionality

## SiteBay Features

After migration, use:
- Staging environment for testing
- PostHog analytics
- Grafana dashboards
- Point-in-time backups
