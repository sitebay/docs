---
title: Support ticket API
slug: ticket
authors:
- SiteBay
contributors:
- SiteBay
description: Keep account or site context with the ticket and redact credentials from attachments and logs.
keywords:
- ticket
- sitebay documentation
published: 2025-03-18
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Keep account or site context with the ticket and redact credentials from attachments and logs. Creating a ticket or posting a reply is an external communication, so an automation should do it only when asked. The response is a ticket record, not a promise of resolution time.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### Get tickets

`GET /f/api/v1/ticket`

Documented responses: `200`. Read the returned record rather than inferring state from the request URL.

### Create Ticket

`POST /f/api/v1/ticket`

Request schema: `TicketCreate`. Required body fields: `subject`, `description`.

Documented responses: `201`, `422`. This operation changes state; review its target and effect before sending it.

### Delete Ticket

`DELETE /f/api/v1/ticket/{ticket_id}`

Parameters: `ticket_id` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get Ticket

`GET /f/api/v1/ticket/{ticket_id}`

Parameters: `ticket_id` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Update Ticket

`PATCH /f/api/v1/ticket/{ticket_id}`

Parameters: `ticket_id` (path, required).

Request schema: `TicketUpdate`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get Ticket replies

`GET /f/api/v1/ticket/{ticket_id}/reply`

Parameters: `ticket_id` (path, required), `page` (query, optional), `size` (query, optional).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create Ticket Reply

`POST /f/api/v1/ticket/{ticket_id}/reply`

Parameters: `ticket_id` (path, required).

Request schema: `TicketReplyCreate`. Consult the schema for optional body fields.

Documented responses: `201`, `422`. This operation changes state; review its target and effect before sending it.

### Create Ticket Reply (chat)

`POST /f/api/v1/ticket/{ticket_id}/reply/unified`

Parameters: `ticket_id` (path, required).

Request schema: `TicketReplyCreate`. Consult the schema for optional body fields.

Documented responses: `201`, `422`. This operation changes state; review its target and effect before sending it.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
