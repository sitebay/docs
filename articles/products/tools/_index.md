---
title: Site tools
title_meta: Site tools
description: Choose the action for the actual layer you need to change.
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- tools
- sitebay documentation
published: 2025-03-18
slug: tools
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- site-ui
- cloudflare-cache
- lifecycle
modified: 2026-10-07
layout: documentation-section
---

Choose the action for the actual layer you need to change. The current Tools view includes external paths, domain/access settings and conditional cache/security controls; nameserver-managed sites expose different controls from a simple external-domain connection.

## Select the task

For stale content, inspect the origin and cache headers before choosing a purge. For a domain change, preserve the existing DNS and email records and verify HTTPS after cutover. For an external path, test redirects, assets, authentication and cookies against the authorized origin.

## Respect the target

Deleting a site or restoring its database is separate from a cache purge or subscription cancellation. Review the site's current state, available action and recovery path. A button closing after submission does not prove completion.

[The site tools guide]({{< relref "products/tools/get-started/index.md" >}}) explains the current scope and verification steps. For terminal work use [the authenticated workspace]({{< relref "products/code-server/get-started/index.md" >}}), not a guessed general shell endpoint.

{{< section-links >}}
