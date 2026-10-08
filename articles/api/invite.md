---
title: Team invitation acceptance
slug: invite
authors:
- SiteBay
contributors:
- SiteBay
description: An invitation is a private join capability, not a public team-discovery API.
keywords:
- invite
- sitebay documentation
published: 2025-03-18
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

An invitation is a private join capability, not a public team-discovery API. Read it only when you are the intended recipient. Accepting an invitation changes membership; a preview or HTTP response alone does not establish that the account joined the expected team.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Get a team's invite

`GET /f/api/v1/invite/{invite_id}`

Parameters: `invite_id` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get a team's invite

`POST /f/api/v1/invite/{invite_id}`

Parameters: `invite_id` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
