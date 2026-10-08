---
title: Site inspection utilities
slug: utils
authors:
- SiteBay
contributors:
- SiteBay
description: Use the site-specific state, tools, and available-action views to discover supported operations.
keywords:
- utils
- sitebay documentation
published: 2025-03-18
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Use the site-specific state, tools, and available-action views to discover supported operations. The old general shell endpoint is retired; a named site-management operation is not interchangeable with arbitrary root shell access.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### What you can do to this site right now

`GET /f/api/v1/site/{fqdn}/legal_actions`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### The site app's view-model

`GET /f/api/v1/site/{fqdn}/read_state`

Parameters: `fqdn` (path, required), `known_state_rev` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get Cloudflare tools

`GET /f/api/v1/site/{fqdn}/tools`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
