---
slug: how-to-compress-wordpress-site-to-zip
author:
  name: SiteBay
  email: support@sitebay.org
description: 'Migrate WordPress to SiteBay.'
keywords: ["migration", "wordpress"]
tags: ["migrate"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2025-12-04
modified_by:
  name: SiteBay
published: 2024-04-20
image: migrate-wordpress.png
title: Migrate to SiteBay
aliases: ['/quick-answers/platform/how-to-compress-wordpress-site-to-zip']
---

# Migrate to SiteBay

## Option 1: Plugin (Easiest)

1. Install **All-in-One WP Migration** or **Duplicator**
2. Export site to zip
3. Upload to SiteBay

## Option 2: Manual

### Export Files

1. cPanel > File Manager
2. Navigate to `wp-content/`
3. Right-click > Compress > Zip
4. Download zip

### Export Database

1. cPanel > phpMyAdmin
2. Select your WordPress database
3. Export > Quick > SQL format
4. Download .sql file

### Import to SiteBay

1. Create site on SiteBay
2. Use migration tool or contact support@sitebay.org

## After Migration

- Check all pages load
- Verify images work
- Test forms and functionality
- Update DNS to point to SiteBay
