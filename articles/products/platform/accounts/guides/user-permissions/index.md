---
title: Understand team permissions
description: SiteBay authorization is enforced by the server for each operation.
published: 2024-04-21
modified: 2026-10-07
authors:
- SiteBay
contributors:
- SiteBay
modified_by:
  name: SiteBay
tags:
- sitebay platform
- users
keywords:
- user permissions
- sitebay documentation
slug: user-permissions
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- account-ui
- teams
- api-auth
- pricing
---

SiteBay authorization is enforced by the server for each operation. An old table of arbitrary per-resource billing, cluster, and object-storage toggles does not describe the current team member contract.

## Owner and member

The team member model exposes owner level 8 and member level 4. These values describe roles, not a license to bypass a route's authorization checks. A site action also depends on ownership, plan and runtime state. Read the site's available actions before enabling a mutation in a client.

## Invitation and removal boundaries

Roster reads are available to authorized members. Pending invitation reads and invitation creation/revocation are owner-only. The owner can remove another member; a member may leave themselves. The owner cannot be removed through the membership endpoint.

## API key permissions

API keys are scoped to a team and use the declared permission values `read`, `readwrite`, or `admin`. Choose the minimum permission needed. A key cannot create other keys, and key creation/revocation uses a signed-in session. Do not assume that a key's permission removes the user's team-membership requirements.

Test an integration first with a harmless read, then handle authorization failures as an explicit boundary. Never translate a denied operation into an unrelated shell or database action. See [team access and billing]({{< relref "products/platform/teams-and-billing/index.md" >}}).
