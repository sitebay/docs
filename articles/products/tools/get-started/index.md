---
slug: get-started-site-tools
description: "A comprehensive guide to SiteBay's dashboard tools: Caching, Database Management, and PHP Configuration."
keywords: ['site tools', 'cache', 'phpmyadmin', 'php version', 'sitebay dashboard']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "Site Tools: Managing Your Environment"
bible: true
tags: ["sitebay", "tools", "management"]
aliases: ['/quick-answers/sitebay/sitebay-dashboard-tools/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Site Tools: Managing Your Environment

While SiteBay manages the complex underlying Kubernetes infrastructure, you retain complete control over your WordPress environment through the **Site Tools** section of the dashboard (and via the MCP/SiteClaw apps).

These tools allow you to perform essential maintenance, database management, and performance tuning without needing to SSH into a server.

## 1. Cache Management

SiteBay employs a powerful, multi-layered caching system at the edge (Cloudflare) and at the server level (Redis object caching).

*   **Clear Cache:** If you make significant design changes or update critical plugins, you may need to purge the cache. You can do this with one click in the Site Tools dashboard.
*   **AI Access:** Agents using the `sitebay_site_shell_command` tool can automatically clear the cache (via `wp cache flush`) after deploying code changes.

## 2. Database Management (phpMyAdmin)

For direct database access, SiteBay provides a secure, single-sign-on (SSO) integration with **phpMyAdmin**.

*   **Zero Credentials:** You do not need to hunt down database usernames or passwords. Clicking the "Open phpMyAdmin" button securely authenticates you and opens the interface in a new tab.
*   **Capabilities:** Run raw SQL queries, export/import tables, or manually modify `wp_options` for deep troubleshooting.
*   *Note: For programmatic database access, agents and developers can also use the integrated Code Server terminal to run `wp db query` commands.*

## 3. PHP Configuration

SiteBay allows you to easily manage the PHP runtime for your site.

*   **Version Switching:** Upgrade or downgrade your PHP version (e.g., from 8.1 to 8.2) with a single click. SiteBay will safely restart the PHP-FPM container with the new version.
*   **Workers & Memory:** Depending on your plan, you can adjust the number of PHP workers and the memory limit (`memory_limit`) to accommodate resource-heavy plugins (like complex WooCommerce setups or heavy page builders).

## 4. Search and Replace

When changing primary domains or migrating a site, you often need to update URLs serialized deep within the database.

*   **The Tool:** The Site Tools dashboard includes a powerful, regex-capable Search and Replace tool that safely scans your database and updates URLs without breaking serialized PHP arrays.
*   **Dry Run:** Always use the "Dry Run" feature first to see exactly how many tables and rows will be affected before committing the change.

## 5. Environment Variables

Manage sensitive keys (like third-party API tokens) securely without hardcoding them into `wp-config.php`.

*   Add key-value pairs in the dashboard, and SiteBay will inject them as environment variables into your container, making them accessible via `getenv()` in PHP.
