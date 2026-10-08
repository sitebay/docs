---
title: WordPress application credentials
slug: application_password
authors:
- SiteBay
contributors:
- SiteBay
description: Manage the credential SiteBay uses for an authorized WordPress integration.
keywords:
- application password
- sitebay documentation
published: 2025-03-18
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Manage the credential SiteBay uses for an authorized WordPress integration. This is distinct from the SiteBay session token and from the password used to sign in to the WordPress administration screen. Credential creation, replacement, and deletion affect integrations; do not perform them as a read-only connection test.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Create Application Password

`POST /f/api/v1/application_password`

Request schema: `ApplicationPasswordCreate`. Required body fields: `fqdn`, `username`, `password`, `team_id`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Delete Application Password

`DELETE /f/api/v1/application_password/{fqdn}`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Update Application Password

`PUT /f/api/v1/application_password/{fqdn}`

Parameters: `fqdn` (path, required).

Request schema: `ApplicationPasswordUpdate`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
