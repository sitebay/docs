---
slug: sitebay-create-a-site
description: Use the creation workflow for a new site, not as a substitute for staging or repairing an existing
  site.
keywords:
- create site
- new wordpress
- deployment
- kubernetes
- sitebay dashboard
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Create one SiteBay site
bible: true
tags:
- sitebay
- getting started
- deployment
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- lifecycle
- regions
- pricing
---

Use the creation workflow for a new site, not as a substitute for staging or repairing an existing site.

## Before submitting

Read the selected team's current plan and allowance. Choose a region and ready-made site that the product actually offers. Record the intended domain and review whether this is a new WordPress installation or a migration target. Do not use a guessed “US West” region or a free-site entitlement copied from an old table.

## Create and wait for readiness

Submit the reviewed request once. Preserve its returned ID and inspect status until provisioning is complete or an actionable error is reported. A timeout may leave the outcome unknown; check for the existing site before making a duplicate request.

## Verify the application

Open the site and use the authenticated **WP Admin** action to obtain a one-use login grant. Verify the target and basic page behavior. For a migration, test the imported database, media and integrations before DNS cutover. Do not assume a video or screenshot proves current site readiness.

## Continue deliberately

[The full getting-started guide]({{< relref "guides/get-started/getting-started-with-site-bay/index.md" >}}) covers account access, domain setup, analytics and development tools. Give an assistant a scoped request and require approval for writes; MCP access does not grant Kubernetes administration.
