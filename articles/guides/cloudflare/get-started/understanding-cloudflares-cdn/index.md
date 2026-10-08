---
slug: understanding-cloudflares-cdn
description: A CDN can serve cached responses between visitors and the origin server. DNS, proxying, caching, and
  the origin application's own behavior are separate parts of the request.
keywords:
- microsite
- cdn
- high availability
tags:
- sitebay platform
- cloudflare platform
- web server
- cdn
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-13
title: Understand the CDN and origin
aliases:
- /guides/cloudflare/get-started/understanding-cloudflares-cdn/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- cloudflare-dns
---

A CDN can serve cached responses between visitors and the origin server. DNS, proxying, caching, and the origin application's own behavior are separate parts of the request.

## Check the request path

Confirm which domain record points to the site and whether traffic is proxied. Inspect the response headers and configured cache rules before assuming a response came from the origin.

## Protect personalized content

Do not cache account, administration, cart, or other user-specific responses under a public cache key. Review application headers and cache rules for each route you change.

## Verify an update

Test the origin result through the supported preview path, then the public URL. Purge only the affected cached resources where practical. A cache purge does not repair an incorrect origin response.

Read [cache troubleshooting]({{< relref "guides/quick-answers/websites/clear-cache-shortguide/index.md" >}}) and [Cloudflare's purge guide](https://developers.cloudflare.com/cache/how-to/purge-cache/).
