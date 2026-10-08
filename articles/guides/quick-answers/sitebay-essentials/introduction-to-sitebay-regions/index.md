---
slug: introduction-to-sitebay-regions
description: "Understand SiteBay's global infrastructure regions and how to choose the right location for your WordPress site."
keywords: ['regions', 'data centers', 'locations', 'us west', 'eu central', 'latency']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "SiteBay Global Regions"
bible: true
tags: ["sitebay", "infrastructure", "regions"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# SiteBay Global Regions

The physical location of your server plays a critical role in your site's performance. The closer your server is to your primary audience, the lower the latency (the time it takes for data to travel from the server to the user's browser).

SiteBay's Kubernetes infrastructure spans multiple global regions, allowing you to deploy your WordPress sites exactly where your users are.

## Available Regions

When creating a new site, you must select a region. SiteBay currently operates out of two primary data center hubs, with expansion planned.

### 1. US West (North America)
*   **Location:** Seattle, Washington, USA
*   **Best For:** Audiences located in North America, South America, and parts of the Pacific Rim.
*   **Code:** `na` (e.g., sites resolve to `*.na.sitebay.org` before custom domains are attached).

### 2. EU Central (Europe)
*   **Location:** Frankfurt, Germany
*   **Best For:** Audiences located in Europe, the UK, the Middle East, and Africa.
*   **Code:** `eu` (e.g., sites resolve to `*.eu.sitebay.org`).

## How to Choose a Region

1.  **Analyze Your Traffic:** Use tools like Google Analytics or SiteBay's built-in PostHog integration to see where the majority of your visitors live.
2.  **Target the Majority:** Select the region closest to that geographical center. If 80% of your sales come from the US, choose US West, even if you are personally located in Europe.
3.  **Data Sovereignty (GDPR):** If you operate a business in the European Union and are legally required to keep user data within European borders, you *must* select the EU Central region. SiteBay's database and Point-in-Time backup storage are strictly confined to the region you select.

## Edge Caching and Regions

While choosing the right server region is important for dynamic requests (like adding to a cart or logging in), SiteBay mitigates latency for static content globally.

SiteBay utilizes **Cloudflare** as its edge network. This means that static assets (images, CSS, JavaScript, and fully cached HTML pages) are distributed to hundreds of data centers worldwide. A user in Tokyo visiting a site hosted in US West will still load images from a server in Tokyo, ensuring blazing-fast load times regardless of the primary region.
