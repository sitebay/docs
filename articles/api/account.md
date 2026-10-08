---
title: Account and API keys
slug: account
authors:
- SiteBay
contributors:
- SiteBay
description: Read the current account and manage a team-scoped API key.
keywords:
- account
- sitebay documentation
published: 2026-10-08
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Read the current account and manage a team-scoped API key. Creating or revoking keys requires session authentication; an API key cannot mint other keys. Store the raw key securely when it is returned at creation, because list responses do not reveal it again.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Users:Current User

`GET /f/api/v1/account/me`

Documented responses: `200`, `401`. Read the returned record rather than inferring state from the request URL.

### Users:Patch Current User

`PATCH /f/api/v1/account/me`

Request schema: `UserUpdate`. Consult the schema for optional body fields.

Documented responses: `200`, `400`, `401`, `422`. This operation changes state; review its target and effect before sending it.

### Get Current User Extended

`GET /f/api/v1/account/me/extended`

Documented responses: `200`. Read the returned record rather than inferring state from the request URL.

### List your API keys

`GET /f/api/v1/api-keys`

Parameters: `team_id` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create a new API key

`POST /f/api/v1/api-keys`

Request schema: `ApiKeyCreate`. Required body fields: `name`, `team_id`, `permission`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get the currently authenticated API key

`GET /f/api/v1/api-keys/@current`

Documented responses: `200`. Read the returned record rather than inferring state from the request URL.

### Revoke an API key

`DELETE /f/api/v1/api-keys/{key_id}`

Parameters: `key_id` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
