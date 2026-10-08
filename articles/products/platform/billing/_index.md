---
title: Billing
title_meta: Billing
description: Learn how SiteBay makes billing simple
tab_group_main:
  is_root: true
  title: Overview
  weight: 10
keywords:
- billing
- payments
aliases:
- /products/tools/billing/
- /platform/billing-and-support/how-sitebay-billing-works/
- /platform/billing-and-support/upgrade-to-hourly-billing/
- /guides/how-sitebay-billing-works/
- /billing-and-payments/
- /platform/billing-and-support/billing-and-payments-new-manager/
- /platform/billing-and-payments/
- /platform/billing-and-support/billing-and-payments/
- /guides/billing-and-payments/
- /guides/understanding-billing-and-payments/
- /guides/platform/billing-and-support/
published: 2024-04-25
modified: 2026-10-07
modified_by:
  name: SiteBay
tags:
- sitebay platform
authors:
- SiteBay
contributors:
- SiteBay
slug: billing
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- pricing
- teams
layout: documentation-section
---

Use these guides to inspect subscription state and manage the correct billing relationship.

## Establish the current state

Read the team's plan and usage before making a change. The [current plan catalog]({{< relref "guides/quick-answers/sitebay-essentials/sitebay-plans/index.md" >}}) returns current plan names and price fields in minor units; it replaces fixed-price tables copied into older guides. Match the currency and monthly/yearly interval. Resource quotas and renewal dates must come from the active subscription, not an assumed 30-day cycle.

## Make the intended change

Open Billing for that team. For a new plan, review checkout before confirming. For an existing Stripe-backed account, use the customer portal returned to the authenticated user. Shopify billing follows the provider flow shown by the account. Do not create duplicate checkouts when a request is still pending.

## Verify the result

Refresh team billing after returning from the provider. Check the resulting plan, status, pending cancellation, and effective date. Retain the receipt. A checkout link or browser redirect is not proof of payment; sleeping or deleting a site is not subscription cancellation.

For access boundaries, see [Teams, access, and billing]({{< relref "products/platform/teams-and-billing/index.md" >}}). For specific actions, see [payment methods]({{< relref "products/platform/billing/guides/payment-methods/index.md" >}}) and [stopping billing]({{< relref "products/platform/billing/guides/stop-billing/index.md" >}}).

{{< section-links >}}
