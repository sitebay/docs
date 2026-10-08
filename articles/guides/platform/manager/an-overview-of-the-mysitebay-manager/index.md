---
slug: an-overview-of-the-mysitebay-manager
description: "A comprehensive tour of the SiteBay Dashboard, our deeply customized instance of PostHog that serves as your central control plane."
keywords: ['dashboard', 'manager', 'control panel', 'ui', 'posthog', 'sitebay features']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "Dashboard Overview: The PostHog Control Plane"
bible: true
tags: ["sitebay", "dashboard", "platform", "posthog"]
aliases: ['/quick-answers/sitebay/sitebay-dashboard-overview/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Dashboard Overview: The PostHog Control Plane

If you're expecting a traditional, clunky cPanel or a generic WordPress hosting dashboard, you're in for a surprise. The **SiteBay Dashboard** ([my.sitebay.org](https://my.sitebay.org)) isn't just a basic control panel—it's actually a deeply customized, heavily engineered instance of **PostHog**.

We realized that managing infrastructure and analyzing user data shouldn't be two separate workflows. By building our entire control plane directly on top of PostHog, we've unified your server operations with your product analytics into one seamless experience.

## Why We Built on PostHog

Most hosting companies give you a dashboard to click "Restart PHP" and maybe show you some rudimentary bandwidth graphs. We flipped the script.

Because our dashboard *is* PostHog, every action you take, every deployment, and every user interaction is treated as a first-class data event. This means your AI agents (via the MCP) and your human team are looking at the exact same, insanely detailed telemetry.

## The Global Overview

When you drop into the dashboard, you're greeted with your **Sites List**—but it's supercharged with real-time analytics.

*   **Status Indicators:** Instantly verify if your Kubernetes pods are active, provisioning, or suspended.
*   **Quick Actions:** Launch WP Admin via SSO, spin up the Code Server IDE, or jump straight to the frontend URL without missing a beat.
*   **Live Pulse:** Alongside your server status, you immediately see the pulse of your traffic and active session replays.

## Site-Specific Management

Diving into a specific site opens up a unified workspace where infrastructure controls live side-by-side with your data.

### 1. The Command Center (Overview & Tools)
This is where the magic happens for day-to-day operations.
*   **Infrastructure Controls:** Need to restart your PHP container, clear edge caches, or gracefully suspend the site? It's right here.
*   **Deep Access:** Secure, SSO-driven access to your raw database via phpMyAdmin.
*   **Environment Variables:** Inject your API keys and secrets directly into the container—no more messing around with `wp-config.php` over FTP.

### 2. Time Machine & Git Sync
Your safety net and your deployment pipeline.
*   **Point-in-Time Restore:** A visual timeline of your database and file state. Slide back to any minute and restore instantly.
*   **Git Operations:** Link your GitHub, GitLab, or Bitbucket. Push to deploy, or commit your server-side changes straight back to your repo.

### 3. Analytics & Feature Flags
This is where the PostHog engine really flexes.
*   **Session Replays:** Watch exactly what your users are doing. When someone reports a bug, just pull up the tape.
*   **Funnels & Paths:** See exactly where users are dropping off in your WooCommerce checkout flow.
*   **Feature Flags:** Rolling out a massive theme update? Wrap it in a feature flag and push it to 10% of your audience first. If it crashes, roll it back with a toggle.

## Account, Billing & AI

The dashboard is also the gateway for your team and your bots.
*   **Team Management:** Granular Role-Based Access Control (RBAC). Invite the client to see the analytics, but lock them out of the infrastructure controls.
*   **API Keys:** Spin up secure tokens to authenticate your SiteBay MCP Server, granting Claude direct access to your infrastructure.

By turning PostHog into the operating system for your hosting, SiteBay gives you a level of visibility and control that traditional hosts can't touch.
