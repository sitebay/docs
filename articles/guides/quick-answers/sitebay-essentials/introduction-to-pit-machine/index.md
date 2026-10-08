---
slug: introduction-to-pit-machine
keywords: ["backups", "restore"]
description: "Point-in-time backups and restore."
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2025-12-04
modified_by:
  name: SiteBay
published: 2024-03-13
title: "Point-in-Time Machine"
bible: true
tags: ["sitebay", "backups"]
aliases: ['/quick-answers/sitebay-essentials/introduction-to-pit-machine/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Point-in-Time Machine

Automatic backups. Restore to any previous state.

## Backup Frequency

| Data | Frequency |
|------|-----------|
| Database | Every minute |
| wp-content | Every hour |

## How to Restore

1. **Sites > [Your Site] > PIT Machine**
2. Select date/time in calendar
3. **View Files** to verify
4. **Restore Site** or **Create Staging**

## Pro Tip

1. Create staging from backup
2. Verify it's correct
3. Sync staging to live
4. Delete staging

See [PIT Machine Get Started](/products/time-machine/get-started-with-pit-machine/) for full guide.
