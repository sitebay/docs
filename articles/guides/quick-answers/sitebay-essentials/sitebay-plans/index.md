---
slug: sitebay-plans
description: Read current SiteBay plan prices and limits, interpret minor units, and verify a team billing change.
keywords:
- pricing
- plans
- free tier
- agency plan
- billing
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-08
modified_by:
  name: SiteBay
title: SiteBay plans and current prices
bible: true
tags:
- sitebay
- pricing
- billing
aliases:
- /quick-answers/sitebay-essentials/sitebay-plans/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- pricing
- teams
---

SiteBay groups site ownership and plan limits by team. Select the team that owns the site before comparing a plan or opening checkout; do not assume that a price shown for one team or currency applies to another.

## Read the current catalog

The public pricing endpoint is the source for the available plan names, prices, and allowances:

```sh
curl --fail-with-body --silent --show-error \
  https://my.sitebay.org/f/api/v1/plan/pricing
```

The response has `suggested_currency` and a `plans` object keyed by plan slug. Each plan can include `name`, `description`, `max_visits`, `max_storage`, `max_bandwidth`, `max_sites`, and `code_server`, along with monthly and yearly price fields for USD, CAD, and EUR. **Price fields are minor units (cents), not whole currency units.** Preserve the unit and billing interval when displaying them. Do not silently convert storage or bandwidth values into a different unit without the matching API definition.

The suggested currency is derived from the request's country headers. It is a presentation suggestion, not proof of a payment method's country or the final tax amount. The catalog intentionally excludes Stripe price IDs.

## Compare the whole plan

Check included site capacity, current team usage, code-server eligibility, the selected currency, and the requested billing interval. A free-site entitlement and paid plan site capacity are different fields; neither should be inferred from the label “free.” A running site's resources, backup availability, and current legal actions must also be checked on that site.

Use the catalog for current prices and checkout for the final amount and renewal terms.

## Review before paying

Open Billing for the intended team, choose the plan and interval, and review the provider's checkout total before confirming. Record the accepted currency and renewal terms. A generated checkout URL is not a completed payment, and returning from checkout is not proof that the subscription change has been applied: refresh the team's billing state.

For invoices, payment methods, and cancellation terms, use the billing provider shown by the account. Stripe-backed accounts use a customer portal; linked Shopify billing has its own flow. Do not cancel or delete sites merely to test a billing change.
