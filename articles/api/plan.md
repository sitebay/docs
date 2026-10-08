---
title: Plan and pricing API
slug: plan
authors:
- SiteBay
contributors:
- SiteBay
description: The legacy /plan collection returns your teams.
keywords:
- plan
- sitebay documentation
published: 2026-10-08
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

The legacy /plan collection returns your teams. Use /plan/pricing for the public price catalog. It returns plan prices in minor units alongside suggested_currency; checkout determines the accepted subscription and final amount.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Get Teams

`GET /f/api/v1/plan`

Parameters: `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Public plan pricing

`GET /f/api/v1/plan/pricing`

Documented responses: `200`. Read the returned record rather than inferring state from the request URL.

### Get Team

`GET /f/api/v1/plan/{team_id}`

Parameters: `team_id` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
