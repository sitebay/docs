---
slug: an-overview-of-the-mysitebay-manager
description: My SiteBay combines site-management screens with a PostHog-based application.
keywords:
- dashboard
- manager
- control panel
- ui
- posthog
- sitebay features
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-07
modified_by:
  name: SiteBay
title: The My SiteBay control plane
bible: true
tags:
- sitebay
- dashboard
- platform
- posthog
aliases:
- /quick-answers/sitebay/sitebay-dashboard-overview/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- platform-architecture
- teams
- api-auth
---

My SiteBay combines site-management screens with a PostHog-based application. Account/team context, hosting state and product-analytics data remain distinct even when they appear in one interface.

## Site operations

Select a site's domain and inspect its current state. The UI exposes development, Git, logs, history, recovery and tools views, with some controls gated by the site's configuration. **WP Admin** creates a one-use expiring login grant rather than revealing a shared administrator password.

Use [the dashboard action map]({{< relref "guides/quick-answers/sitebay/sitebay-dashboard-overview/index.md" >}}) to choose the relevant view. A user being able to view analytics does not establish authority to change a site's subscription, DNS or staging environment.

## Analytics

Select the project that receives the intended site's events and set the analysis period. Verify capture, privacy and identity configuration before interpreting visitor metrics. A page loading in the hosting view does not prove its replay SDK is recording, and server capacity alone cannot eliminate browser instrumentation overhead.

## Development and assistants

Code-server exposes an authorized workspace; Git Sync manages configured repository files. MCP tools inherit their actual account and operation policies. None of these grants unrestricted control over the hosting Kubernetes cluster.

## Collaboration and billing

Read [team access and billing]({{< relref "products/platform/teams-and-billing/index.md" >}}) for owner/member boundaries. Share an invitation with its intended recipient rather than sharing session tokens or API keys. Review the current catalog and provider checkout for a plan change, then verify the applied team state.
