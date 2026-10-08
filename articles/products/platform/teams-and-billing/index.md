---
slug: teams-and-billing
description: 'How SiteBay''s team and billing model works: teams own sites, plans set resource quotas, and Stripe
  handles payments.'
keywords:
- teams
- billing
- plans
- pricing
- stripe
- quotas
- resources
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-15
modified: 2026-10-08
modified_by:
  name: SiteBay
title: Teams, access, and billing
bible: true
tags:
- sitebay
- teams
- billing
- plans
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- teams
- pricing
- api-contract
---

A SiteBay team is the ownership and access boundary for its sites. The billing view and site list must refer to the same selected team. An account can have access through ownership or membership; a visible team is not automatically one whose billing you may administer.

## Identify the team

`GET /f/api/v1/team` lists the teams available to the authenticated account. Team-reference routes accept a declared PostHog team ID or UUID; use the identifier returned by the API rather than guessing it from a URL. Keep site IDs, team IDs, and user IDs distinct.

## Members and invitations

The current member model distinguishes owner and member access. Its numeric levels are **8 for owner** and **4 for member**. Prefer the named role and server authorization result to hard-coded client permissions.

An authorized member may read the roster. Pending invitations and their join links are owner-only. Creating or revoking invitations is also an owner operation. Treat a join link as a capability: send it only to the intended recipient, and revoke it when it should no longer work.

Removing a member uses the member's **user ID**, not the roster-row ID. The owner cannot be removed through the member-removal endpoint. Only the owner can remove another member; a member can leave themselves. A changed list in the browser is not sufficient verification—refresh the roster after the operation.

## Plans, usage, and payment

Use the [current plan catalog]({{< relref "guides/quick-answers/sitebay-essentials/sitebay-plans/index.md" >}}) rather than a copied plan table. Prices are returned in minor units and must be paired with a currency and monthly/yearly interval. Check the active team's actual usage and allowance fields before ordering more capacity. Review any capacity changes and overage terms before confirming.

The authenticated Stripe portal endpoint returns a provider URL, not an invoice or a paid status. It requires an account with a Stripe customer record. A Shopify-backed billing relationship follows the flow displayed for that relationship rather than a guessed Stripe portal path.

## Cancellation is not deletion

Read the subscription's stated effective date and pending changes before cancelling. Sleeping a WordPress site, deleting a site, removing a teammate, and cancelling a subscription are separate operations. None should be treated as a substitute for another.

After a billing change, verify the team's subscription state and the relevant site action availability. Keep the provider receipt for financial reconciliation. Do not infer a successful cancellation solely from a dialog closing or the absence of a currently running site.
