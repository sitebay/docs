---
title: Staging API
slug: site-stage
authors:
- SiteBay
contributors:
- SiteBay
description: Staging is a separate WordPress copy for evaluating changes.
keywords:
- site stage
- sitebay documentation
published: 2025-03-18
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Staging is a separate WordPress copy for evaluating changes. The canvas preview uses the live site and is not a staging session. Never delete or recreate staging to work around an unrelated canvas or tool error. Review the file and database impact before a promotion.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Delete staging site

`DELETE /f/api/v1/site/{fqdn}/stage`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get staging site

`GET /f/api/v1/site/{fqdn}/stage`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create staging site

`POST /f/api/v1/site/{fqdn}/stage`

Parameters: `fqdn` (path, required).

Request schema: `SiteStageCreate`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Retained stages

`GET /f/api/v1/site/{fqdn}/stage/archives`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Recover a retained stage into a new unpublished stage

`POST /f/api/v1/site/{fqdn}/stage/archives/{archive_id}/recover`

Parameters: `archive_id` (path, required), `fqdn` (path, required).

Documented responses: `202`, `422`. This operation changes state; review its target and effect before sending it.

### Commit staging changes

`POST /f/api/v1/site/{fqdn}/stage/commit`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get progress for a stage commit

`GET /f/api/v1/site/{fqdn}/stage/commit-progress`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Replace an exact stage from live after preserving its original checkpoint

`POST /f/api/v1/site/{fqdn}/stage/refresh`

Parameters: `fqdn` (path, required).

Request schema: `StageRefreshRequest`. Required body fields: `site_stage_id`.

Documented responses: `202`, `422`. This operation changes state; review its target and effect before sending it.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
