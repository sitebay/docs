---
title: Ready-made site catalog
slug: template
authors:
- SiteBay
contributors:
- SiteBay
description: Read the catalog and inspect the chosen ready-made site before applying it.
keywords:
- template
- sitebay documentation
published: 2025-03-18
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Read the catalog and inspect the chosen ready-made site before applying it. Availability and compatibility come from the current catalog, not a screenshot or a static claim that every template is included. Applying a template changes site content and requires its own authorized operation.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Get Ready-made sites

`GET /f/api/v1/ready_made_site`

Parameters: `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get ReadyMadeSite by name

`GET /f/api/v1/ready_made_site/{ready_made_site_name}`

Parameters: `ready_made_site_name` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
