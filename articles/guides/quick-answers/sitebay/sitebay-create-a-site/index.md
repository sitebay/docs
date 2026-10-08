---
slug: sitebay-create-a-site
description: "Learn how to instantly deploy a new AI-native WordPress environment on the SiteBay platform."
keywords: ['create site', 'new wordpress', 'deployment', 'kubernetes', 'sitebay dashboard']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "Creating a Site on SiteBay"
bible: true
tags: ["sitebay", "getting started", "deployment"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Creating a Site on SiteBay

Deploying a new WordPress site on SiteBay provisions a highly optimized, fully isolated container environment on our Kubernetes infrastructure. The process takes less than 60 seconds from click to fully functional site.

## Deployment Methods

SiteBay's AI-native architecture means you aren't restricted to just pointing and clicking in a web browser. You can create a site using any of the following methods:

### 1. Via the Dashboard (Web UI)
The traditional approach for humans:
1.  Log in to [my.sitebay.org](https://my.sitebay.org).
2.  Click the **Create Site** button in the top right corner.
3.  Choose a **Starting Point**: Start with a blank WordPress installation, or select from our library of **Templates** (Ready-Made Sites).
4.  Enter your **Site Name** (this will create a temporary `.sitebay.org` URL).
5.  Select a **Region** (e.g., US West, EU Central) based on where your audience is located.
6.  Click **Deploy**. Your site will be ready in under a minute.

### 2. Via the MCP Server (AI Agents)
If you are using Claude Desktop with the SiteBay MCP, you can simply tell your agent what you want:
> *"Create a new WordPress site called 'my-new-blog' in the EU Central region, and install the SEO plugin."*

The agent will use the `sitebay_create_site` tool to securely provision the infrastructure and configure it to your specifications.

### 3. Via SiteClaw (ChatGPT)
Using the SiteClaw custom GPT:
> *"I need a staging environment for testing. Please spin up a new SiteBay site using the E-commerce template in the US West region."*

### 4. Via SiteClaw Mobile
Using the SiteClaw app, you can use your voice:
> *(Tap microphone)* *"Deploy a new blank WordPress site for a client project."*

## What Happens During Deployment?

When you create a site, SiteBay orchestrates several background processes instantly:

1.  **Container Provisioning:** A dedicated, isolated pod is spun up on a Kubernetes node in your chosen region.
2.  **Database Creation:** A secure MariaDB database is initialized specifically for this site, tied into our continuous Point-in-Time backup system.
3.  **Core Installation:** The latest stable version of WordPress is installed, alongside the **SiteBay AI-Friendly Theme**.
4.  **Analytics Injection:** The native PostHog integration is wired up, meaning session replays and analytics start recording the moment the site goes live.
5.  **Edge Networking:** Cloudflare routes and caching rules are automatically generated for your temporary domain.

## Next Steps

Once your site is live, you can:
*   Log into the WP Admin panel via Single Sign-On (SSO) from the dashboard.
*   Attach a custom domain name.
*   Launch Code Server to start developing.
*   Link your Git repository via Git Sync.
