---
title: Make your first SiteBay API request
title_meta: Make your first SiteBay API request
description: Begin with a non-mutating request before building an automation that creates, restores or deletes sites.
tab_group_main:
  weight: 60
published: 2024-04-23
modified: 2026-10-07
aliases:
- /products/tools/sitebay-api/get-started/
- /platform/api/getting-started-with-the-sitebay-api-new-manager/
- /platform/api/getting-started-with-the-sitebay-api/
- /guides/getting-started-with-the-sitebay-api/
- /products/tools/sitebay-api/guides/build-final-query/
tags:
- managed hosting
authors:
- SiteBay
contributors:
- SiteBay
modified_by:
  name: SiteBay
keywords:
- get started
- sitebay documentation
slug: getting-started-with-the-sitebay-api
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
- pricing
---

Begin with a non-mutating request before building an automation that creates, restores or deletes sites. Confirm that the account and team returned are the ones you intend to operate on.

## Read a public catalog

```sh
curl --fail-with-body --silent --show-error \
  https://my.sitebay.org/f/api/v1/plan/pricing
```

This returns suggested currency and the current plan catalog. Prices are minor units, not whole currency amounts. Public catalog access does not imply permission to change a subscription.

## Read an authenticated resource

Create a minimally scoped team key through the current signed-in account flow, or use an appropriate session credential. Store it securely in `SITEBAY_TOKEN`, then run:

```sh
: "${SITEBAY_TOKEN:?Set a credential securely}"
curl --fail-with-body --silent --show-error \
  --header "Authorization: Bearer ${SITEBAY_TOKEN}" \
  https://my.sitebay.org/f/api/v1/team
```

Do not paste a token into the URL, a public code snippet, a support ticket, or shell history. Read the response's collection shape and identifiers. Keep only the redacted evidence needed to debug the request.

## Add an operation carefully

Choose the route from [the API reference]({{< relref "api/_index.md" >}}). For a site mutation, first inspect its current state and legal actions. Check required request fields and the distinction between an accepted operation and completed work. Never replace a denied action with an unrelated shell command.

Handle structured validation errors and authorization failures. Use documented idempotency support for retries and inspect state after a timeout. See [the integration guide]({{< relref "products/platform/api-reference/index.md" >}}) for details.
