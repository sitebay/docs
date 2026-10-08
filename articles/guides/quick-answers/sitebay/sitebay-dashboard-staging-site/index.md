---
slug: sitebay-staging-sites
description: "Safely test code, plugins, and design changes using SiteBay's integrated Staging environments."
keywords: ['staging', 'testing', 'development environment', 'clone', 'wordpress staging']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "Staging Sites: Safe Testing Environments"
bible: true
tags: ["sitebay", "staging", "development"]
aliases: ['/quick-answers/sitebay/sitebay-dashboard-staging-site/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Staging Sites: Safe Testing Environments

Developing or updating a live production site is inherently risky. A single plugin conflict or syntax error can result in a "White Screen of Death" for your users.

SiteBay eliminates this risk with one-click **Staging Environments**. A Staging Site is an exact, isolated replica of your production environment where you can safely test changes before making them live.

## How to Create a Staging Site

You can create a staging clone through the dashboard, or by instructing your AI agent via the SiteBay MCP or SiteClaw.

1.  Navigate to your production site's dashboard.
2.  Click the **Staging** tab.
3.  Click **Create Staging Site**.

SiteBay will clone the production database and all `wp-content` files into a completely separate container. The staging site will be assigned a temporary URL (e.g., `staging-mysite.sitebay.org`) and is password-protected by default to prevent search engines from indexing duplicate content.

## Common Staging Workflows

### 1. The Plugin Update Test
Before clicking "Update All" on your plugins in production, clone the site to staging. Run the updates there. If the staging site loads fine and your PostHog logs don't show any new console errors, you know it's safe to perform the updates on production.

### 2. Time Machine Clones
You do not have to clone the *current* state of your production site. You can use the **Point-in-Time Machine** to spin up a staging site from a specific moment in the past. This is invaluable for debugging issues that occurred yesterday but are no longer easily reproducible.

### 3. Git-Driven Staging
By combining Staging with **Git Sync**, you can create a robust CI/CD pipeline:
*   Production Site runs the `main` branch.
*   Staging Site runs the `development` branch.
*   Work locally or on staging, push to `development` to see the changes live on the staging URL. Once approved, merge `development` into `main` via GitHub/GitLab to automatically deploy to production.

## Pushing Staging to Production

Once you are satisfied with the changes on your staging site, you can merge them back to production.

1.  In the Staging tab, click **Push to Production**.
2.  You will be prompted to choose what to merge:
    *   **Files Only:** Overwrites production's `wp-content` with staging's `wp-content`. Best for design or code changes.
    *   **Database Only:** Overwrites the production database. *Warning: This will erase any new WooCommerce orders or user signups that occurred on production while you were working on staging.*
    *   **Both:** Overwrites the entire production environment.

*Note: Before any push to production, SiteBay automatically takes a Point-in-Time snapshot, ensuring you can instantly revert if the merge has unintended consequences.*
