---
slug: get-started-with-pit-machine
description: "SiteBay's Point-in-Time Machine gives you continuous, minute-by-minute backups for your WordPress sites."
keywords: ['backups', 'point-in-time', 'restore', 'time machine', 'data recovery', 'sitebay backups']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "Point-in-Time Machine"
bible: true
tags: ["sitebay", "backups", "security"]
aliases: ['/quick-answers/sitebay-essentials/introduction-to-pit-machine/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Point-in-Time Machine: Continuous Backups

Traditional WordPress backups are fundamentally flawed. They run once a day, meaning if your site breaks at 11 PM, you lose an entire day's worth of orders, content, and user data when you restore yesterday's backup. 

SiteBay's **Point-in-Time Machine** solves this by shifting from discrete daily snapshots to continuous, minute-by-minute data recording.

## How It Works

Instead of blindly copying files, SiteBay uses advanced filesystem-level snapshots and database binary logging (binlogs) to record every single change as it happens.

*   **Continuous Database Logging:** Every transaction, user registration, and WooCommerce order is logged the moment it's written to the database.
*   **Incremental File Storage:** When an image is uploaded or a plugin updated, only the changed bytes are stored securely in distributed Object Storage.

Because of this architecture, backups do not impact your live site's performance. There are no heavy `zip` operations or database dumps dragging down your CPU during peak traffic hours.

## Restoring a Site

If a plugin update goes wrong, or an AI agent deletes the wrong file, recovery is instantaneous. 

1.  Navigate to your site's dashboard and select **Time Machine**.
2.  Use the slider or calendar to select the exact date and minute you want to revert to (e.g., *March 12, 2:14 PM*).
3.  Click **Restore**.

SiteBay provisions a fresh container, mounts the data exactly as it was at that specific minute, and routes traffic to the restored version with zero downtime.

## Staging & Branching

The Time Machine isn't just for disasters; it's a powerful development tool.

Instead of restoring over your production site, you can **clone** a point-in-time backup directly into a new Staging environment. 
*   *Want to investigate a bug that occurred yesterday at 4 PM?* Spin up a staging site from yesterday at 4 PM, analyze the PostHog session replays from that time, and fix the issue without touching production.

## MCP & Agent Integration

The Point-in-Time Machine is fully integrated with the **SiteBay MCP Server**. 

If you ask Claude or the SiteClaw mobile assistant to perform a risky operation (like updating all plugins or refactoring a theme), the agent can be instructed to first verify the current backup state, or even automatically trigger a restore if its automated tests fail post-update. 

Agents have access to tools like `sitebay_backup_list_commits` and `sitebay_backup_restore` to manage this autonomously.
