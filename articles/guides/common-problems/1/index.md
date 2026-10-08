---
author:
  name: SiteBay
  email: support@sitebay.org
description: Start with one failing action and a small reproduction. Avoid changing several components at once.
keywords:
- wordpress
- troubleshooting
- common problems
- fixes
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases:
- /wordpress/
published: 2024-04-29
title: Diagnose a WordPress problem
show_in_lists: true
authors:
- SiteBay
contributors:
- SiteBay
slug: troubleshooting-wordpress-on-sitebay
doc_sources:
- site-ui
- lifecycle
modified: 2026-10-07
---

Start with one failing action and a small reproduction. Avoid changing several components at once.

## Record the symptom

Note the site, environment, URL, time, expected behavior, and actual error. Compare the public page with WordPress administration. Check site history for a recent code, plugin, theme, or recovery operation.

## Isolate the cause

Test the affected component in staging. Inspect its logs and configuration. A missing page, PHP error, database failure, and DNS error need different investigations; restarting unrelated services can obscure the evidence.

## Verify the repair

Repeat the original action and check related pages. Record what changed and what test passed. If the cause is still unclear, send the reproduction and a redacted error excerpt to [Support]({{< relref "products/platform/get-started/guides/support/index.md" >}}).
