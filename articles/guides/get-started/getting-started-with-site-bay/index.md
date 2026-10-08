---
slug: getting-started-with-site-bay
description: "Your first steps on the SiteBay platform: Creating an account, deploying your first site, and exploring the AI-native tools."
keywords: ['getting started', 'tutorial', 'first steps', 'setup sitebay', 'beginner guide']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "Getting Started with SiteBay"
bible: true
tags: ["sitebay", "getting started", "tutorial"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Getting Started with SiteBay

Welcome to SiteBay, the world's first AI-native WordPress hosting platform. Whether you are migrating a high-traffic WooCommerce store or starting a brand new blog, this guide will walk you through your first steps on the platform.

## Step 1: Create Your Account

1.  Navigate to [my.sitebay.org/register](https://my.sitebay.org/register).
2.  Sign up using your email address, or use Single Sign-On (SSO) via GitHub or Google.
3.  Once logged in, you will land on the **SiteBay Dashboard**, your central control plane for all infrastructure.

## Step 2: Deploy Your First Site

SiteBay runs every WordPress installation in its own secure, isolated Kubernetes container.

1.  Click the **Create Site** button in the dashboard.
2.  **Choose a Starting Point:** If you want a blank canvas, select *New WordPress Install*. If you want a pre-designed foundation, browse our *Templates*.
3.  **Name Your Site:** Give it a temporary name (e.g., `my-first-site`). This creates a free `my-first-site.sitebay.org` URL for testing.
4.  **Select a Region:** Choose the data center closest to your target audience (e.g., US West or EU Central).
5.  Click **Deploy**. Your isolated container, database, and edge network routing will be provisioned in under 60 seconds.

## Step 3: Explore the Tools

Once your site is active, explore the integrated toolset that makes SiteBay unique:

*   **WP Admin SSO:** Click "Log in to WordPress" from the dashboard to securely enter your WP Admin without needing a password.
*   **Code Server:** Click the "IDE" button to launch VS Code directly in your browser. This is connected directly to your site's `wp-content` directory.
*   **PostHog Analytics:** Navigate to the Analytics tab to see live Session Replays and traffic data—no plugin installation required.

## Step 4: Connect the AI Ecosystem

SiteBay is built for human and AI collaboration. To get the most out of the platform:

1.  **Generate an API Key:** Go to Profile > API Keys and generate a new token.
2.  **Install the MCP Server:** If you use Claude Desktop, install the `@sitebay/sitebay-mcp` server. This allows Claude to manage your sites, edit code, and query your database via natural language.
3.  **Download SiteClaw:** Get the mobile app for iOS or Android to manage your infrastructure and talk to your 3D AI assistant on the go.

## Step 5: Go Live

When you are ready to launch your site to the public:

1.  Navigate to the **Domains** tab for your site.
2.  Add your custom domain (e.g., `www.myawesomesite.com`).
3.  Update your DNS records at your registrar to point to the provided SiteBay IP address.
4.  SiteBay will automatically provision a free, auto-renewing Let's Encrypt SSL certificate as soon as the DNS propagates.
