---
slug: sitebay-dashboard-overview
description: The site view combines hosting controls with links to development and analytics tools. Select the site
  first and verify that the active team is its owner before changing settings.
keywords:
- sitebay
- dashboard
aliases:
- /quick-answers/sitebay/sitebay-dashboard-overview/
tags:
- WordPress
- sitebay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
image: Dashboard.png
published: 2024-03-17
title: Find the right SiteBay dashboard action
bible: true
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- lifecycle
---

The site view combines hosting controls with links to development and analytics tools. Select the site first and verify that the active team is its owner before changing settings.

## Main Sections

The current site UI includes **Dashboard**, **Time Machine**, **Canvas**, **Code Server**, **Git**, **Logs**, **History**, and **Tools**. Staging and DNS controls are conditional: the staging tab depends on the site's state, and DNS records require the relevant nameserver-managed configuration.

Use **WP Admin** to request a fresh one-use administrator login URL for an active site. Do not share it. **Investigate with SiteBay** opens the site-scoped investigation workspace; the chosen site is part of the context, not an instruction to change it.

## Match the view to the question

| Question | Starting point |
|---|---|
| Is provisioning or an update complete? | Site state and current available actions |
| Which files or database changes preceded a problem? | Time Machine and History |
| What code is deployed from Git? | Git status and the actual application |
| Which requests or application errors occurred? | Logs, scoped to the site and time |
| How do visitors use the site? | The correct analytics project and capture configuration |

These views do not have identical data coverage. A missing replay is not proof of no visitors, and a History item is not a complete file/database backup.

## Use actions deliberately

Confirm the target, input and recovery plan for deletion, domain changes, staging promotion or restore. Refresh state after a request settles. A disabled button or forbidden response is a boundary to investigate rather than bypass.

Read [site tools]({{< relref "products/tools/get-started/index.md" >}}) for cache and domain scope, [code-server]({{< relref "products/code-server/get-started/index.md" >}}) for workspace access, and [Time Machine]({{< relref "products/time-machine/get-started-with-pit-machine/index.md" >}}) for recovery.
