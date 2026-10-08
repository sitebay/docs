---
title: Team API
slug: team
authors:
- SiteBay
contributors:
- SiteBay
description: Use the returned team reference instead of mixing a user UUID, team UUID, and PostHog team ID.
keywords:
- team
- sitebay documentation
published: 2025-03-18
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Use the returned team reference instead of mixing a user UUID, team UUID, and PostHog team ID. Roster reads, invite management, and billing changes have different authorization gates. Only the owner removes another member; a member may leave themselves, and the owner is not removable through that endpoint.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Get your teams

`GET /f/api/v1/team`

Parameters: `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get your default team

`GET /f/api/v1/team/current`

Documented responses: `200`. Read the returned record rather than inferring state from the request URL.

### Get a team

`GET /f/api/v1/team/{team_id}`

Parameters: `team_id` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Update a Team

`PATCH /f/api/v1/team/{team_id}`

Parameters: `team_id` (path, required).

Request schema: `TeamUpdate`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get Team Events

`GET /f/api/v1/team/{team_id}/event`

Parameters: `team_id` (path, required), `after_datetime` (query, optional), `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get a team's invites

`GET /f/api/v1/team/{team_id}/invite`

Parameters: `team_id` (path, required), `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create Team Member Invite

`POST /f/api/v1/team/{team_id}/invite`

Parameters: `team_id` (path, required).

Documented responses: `201`, `422`. This operation changes state; review its target and effect before sending it.

### Revoke a team invite

`DELETE /f/api/v1/team/{team_id}/invite/{team_member_invite_id}`

Parameters: `team_id` (path, required), `team_member_invite_id` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get a team's members

`GET /f/api/v1/team/{team_id}/member`

Parameters: `team_id` (path, required), `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get Team Member

`GET /f/api/v1/team/{team_id}/member/{team_member_id}`

Parameters: `team_member_id` (path, required), `team_id` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Remove Team Member

`DELETE /f/api/v1/team/{team_id}/member/{team_member_user_id}`

Parameters: `team_member_user_id` (path, required), `team_id` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get site volume paths for a team

`GET /f/api/v1/team/{team_id}/sites/paths`

Parameters: `team_id` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Get a team's tickets

`GET /f/api/v1/team/{team_id}/ticket`

Parameters: `team_id` (path, required), `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Resolve the team's existing workspace (cubby) binding

`GET /f/api/v1/team/{team_id}/workspace-binding`

Parameters: `team_id` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
