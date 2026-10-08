---
title: Site image status
slug: images
authors:
- SiteBay
contributors:
- SiteBay
description: Inspect the image status reported for an authorized SiteBay site.
keywords:
- images
- sitebay documentation
published: 2026-10-08
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Inspect the image status reported for an authorized SiteBay site. This reference does not expose a virtual-machine image marketplace. Do not interpret an image label as permission to modify a host or Kubernetes cluster.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Site image status

`GET /f/api/v1/site_live/{fqdn}/images`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
