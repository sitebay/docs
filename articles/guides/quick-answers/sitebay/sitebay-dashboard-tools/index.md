---
slug: sitebay-dashboard-tools
description: Choose the action for the actual layer you need to change.
keywords:
- sitebay
- dashboard
- tools
- http basic auth
- cloudflare
- clear cache
- change domain
- delete site
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Dashboard tools
bible: true
tags:
- sitebay
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- cloudflare-cache
- lifecycle
---

Choose the action for the actual layer you need to change. The current Tools view includes external paths, domain/access settings and conditional cache/security controls; nameserver-managed sites expose different controls from a simple external-domain connection.

## Select the task

For stale content, inspect the origin and cache headers before choosing a purge. For a domain change, preserve the existing DNS and email records and verify HTTPS after cutover. For an external path, test redirects, assets, authentication and cookies against the authorized origin.

## Respect the target

Deleting a site or restoring its database is separate from a cache purge or subscription cancellation. Review the site's current state, available action and recovery path. A button closing after submission does not prove completion.

[The site tools guide]({{< relref "products/tools/get-started/index.md" >}}) explains the current scope and verification steps. For terminal work use [the authenticated workspace]({{< relref "products/code-server/get-started/index.md" >}}), not a guessed general shell endpoint.
