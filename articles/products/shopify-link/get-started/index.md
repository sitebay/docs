---
slug: get-started-shopify-link
description: "Shopify Link allows you to seamlessly integrate Shopify's headless commerce capabilities into your SiteBay WordPress platform."
keywords: ['shopify', 'ecommerce', 'headless', 'woocommerce alternative', 'shopify link', 'sitebay integrations']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "Shopify Link: Headless Commerce"
bible: true
tags: ["sitebay", "ecommerce", "shopify", "integrations"]
aliases: ['/quick-answers/sitebay-essentials/what-is-shopify-link/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Shopify Link: Headless Commerce

While WordPress is exceptional at content management, running a high-volume, enterprise-grade e-commerce store directly on WordPress (e.g., via WooCommerce) often introduces significant database bloat, security risks, and performance bottlenecks.

SiteBay solves this with **Shopify Link**—a native integration that bridges the best of both worlds: WordPress's unmatched CMS capabilities with Shopify's robust, headless commerce engine.

## The Headless Architecture

Shopify Link uses the Shopify Storefront API to decouple the backend inventory and checkout management from the frontend presentation.

*   **The Backend (Shopify):** You manage products, inventory, shipping, taxes, and customer orders entirely within your Shopify Admin dashboard. Shopify handles all PCI compliance and payment processing securely.
*   **The Frontend (SiteBay / WordPress):** Your products are synchronized into your WordPress site as custom post types or custom blocks. You build your product pages, landing pages, and blogs using WordPress, the block editor, or the SiteBay AI-Friendly Theme. 
*   **The Checkout:** When a user clicks "Buy Now" or "Checkout" on your SiteBay site, they are seamlessly handed off to Shopify's highly optimized, secure checkout flow.

## Core Benefits

1.  **Extreme Performance:** Because WordPress is no longer calculating complex cart logic or searching through massive `wp_postmeta` tables for product attributes, your site remains blazing fast. Cache hit rates stay near 100%.
2.  **Unhackable Payments:** By offloading checkout to Shopify, credit card data never touches your WordPress server. This vastly reduces your PCI compliance burden and liability.
3.  **Content + Commerce:** You can use WordPress's superior SEO tools and flexible content editor to drive traffic, while relying on Shopify to convert that traffic into sales.

## Integrating with AI

Because Shopify Link connects your site to the Shopify API, SiteBay's AI tools are inherently commerce-aware.

*   **MCP Integration:** Using the `sitebay_shopify_proxy` tool on the SiteBay MCP Server, your Claude agent can query your inventory, generate product descriptions, or analyze sales trends directly from your IDE context.
*   **SiteClaw/SiteClaw:** You can ask your AI assistants questions like: *"Which products had the highest conversion rate from our blog yesterday?"* The platform cross-references Shopify sales data with SiteBay's PostHog analytics to provide deep, actionable insights.

## Setup

1.  Create a standard Shopify account (the "Starter" or "Basic" headless plan is sufficient).
2.  Generate a Storefront API access token in your Shopify Admin.
3.  In the SiteBay Dashboard, navigate to **Integrations > Shopify Link** and paste your token.
4.  SiteBay automatically installs the necessary integration plugins and begins syncing your product catalog to your WordPress instance.
