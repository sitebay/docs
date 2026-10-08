---
title: Region API
slug: region
authors:
- SiteBay
contributors:
- SiteBay
description: Read the currently configured region catalog and use the identifier required by site creation.
keywords:
- region
- sitebay documentation
published: 2025-03-18
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Read the currently configured region catalog and use the identifier required by site creation. A historical list of cities is not proof of available deployment locations. The region-by-ID operation reports not found for an unknown identifier.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Get Regions

`GET /f/api/v1/region`

Documented responses: `200`. Read the returned record rather than inferring state from the request URL.

### Get a Region

`GET /f/api/v1/region/{region_id}`

Parameters: `region_id` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
