---
slug: how-sitebay-billing-works
authors:
- SiteBay
contributors:
- SiteBay
modified_by:
  name: SiteBay
title: How SiteBay billing works
modified: 2026-10-07
description: Treat the plan catalog, checkout, and the applied subscription state as three separate steps.
keywords:
- how sitebay billing works
- sitebay documentation
published: 2025-03-18
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- pricing
- teams
---

Treat the plan catalog, checkout, and the applied subscription state as three separate steps.

## Establish the current state

Read the team's plan and usage before making a change. The [current plan catalog]({{< relref "guides/quick-answers/sitebay-essentials/sitebay-plans/index.md" >}}) returns current plan names and price fields in minor units; it replaces fixed-price tables copied into older guides. Match the currency and monthly/yearly interval. Resource quotas and renewal dates must come from the active subscription, not an assumed 30-day cycle.

## Make the intended change

Open Billing for that team. For a new plan, review checkout before confirming. For an existing Stripe-backed account, use the customer portal returned to the authenticated user. Shopify billing follows the provider flow shown by the account. Do not create duplicate checkouts when a request is still pending.

## Verify the result

Refresh team billing after returning from the provider. Check the resulting plan, status, pending cancellation, and effective date. Retain the receipt. A checkout link or browser redirect is not proof of payment; sleeping or deleting a site is not subscription cancellation.

For access boundaries, see [Teams, access, and billing]({{< relref "products/platform/teams-and-billing/index.md" >}}). For specific actions, see [payment methods]({{< relref "products/platform/billing/guides/payment-methods/index.md" >}}) and [stopping billing]({{< relref "products/platform/billing/guides/stop-billing/index.md" >}}).
