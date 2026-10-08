---
slug: get-started-site-tools
description: The site's **Tools** view exposes specific hosting settings.
keywords:
- site tools
- cache
- phpmyadmin
- php version
- sitebay dashboard
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-08
modified_by:
  name: SiteBay
title: Use site tools with the correct scope
bible: true
tags:
- sitebay
- tools
- management
aliases:
- /quick-answers/sitebay/sitebay-dashboard-tools/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- cloudflare-cache
- lifecycle
- wp-config
- wp-cli
---

The site's **Tools** view exposes specific hosting settings. Read the available controls for that site's domain/nameserver configuration; do not assume every toggle exists for every site or every provider plan.

## Cache management

Identify the cache layer before purging. Cloudflare edge content, a WordPress/object cache, a browser cache and a service worker can each retain different data. `wp cache flush` is not equivalent to purging Cloudflare.

Use the smallest supported purge for the affected content, then request it again and inspect headers and the actual response. A provider accepting a purge request is not proof the target was cached or every client now sees a new version. Development Mode changes edge caching behavior; it does not repair stale origin files or a failed deployment.

## External Paths

An external path maps part of the site's URL space to an external origin. Confirm the source path, destination origin, redirects, asset URLs, authentication and cookie behavior. Only proxy an origin you are authorized to use. Moving content under a path is not a guaranteed SEO improvement.

## Domain and access settings

Use the current nameserver/domain setup workflow and preserve mail and verification records during a change. HTTP Basic Authentication can add a gate, but test its effect on WordPress REST requests, health checks, webhooks and the canvas. Changing a hostname is not merely renaming a label.

## Database and PHP tools

Use only the tools actually exposed for the authorized site. Where WP-CLI is provided, preview a database search-replace with its supported dry-run before applying it, and retain a private backup.

Supported `wp-config-overrides.php` constants are allowlisted. A memory setting does not increase the plan's physical resources. Follow [managed repository configuration]({{< relref "products/git-sync/get-started/index.md" >}}).

## Delete or restore

These are destructive operations, not troubleshooting toggles. Review the current legal actions and recovery handle, then confirm the exact target. Site deletion can also remove staging and does not independently cancel its subscription. See [site lifecycle]({{< relref "products/platform/site-lifecycle/index.md" >}}).
