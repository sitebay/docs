---
slug: clear-cache-shortguide
description: Find which cache holds the stale result before clearing everything.
keywords:
- clear cache
- cookies
- browser
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-28
image: ClearCacheAndCookies.png
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Clear the relevant cache
aliases:
- /quick-answers/websites/clear-cache-shortguide/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- cloudflare-cache
- cloudflare-dns
---

Find which cache holds the stale result before clearing everything.

Check the browser, any WordPress page or object cache, and the CDN. Inspect the affected URL and response headers. Update the origin content first, then purge the applicable cache using its supported control.

A targeted URL purge usually has a smaller impact than clearing an entire zone. Test the public URL after the purge and compare a logged-out request with any authenticated view.

See [Cloudflare cache purging](https://developers.cloudflare.com/cache/how-to/purge-cache/). Do not use a purge to hide an unresolved application or deployment error.
