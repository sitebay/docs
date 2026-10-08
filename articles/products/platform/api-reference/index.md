---
slug: api-reference
description: Use https://my.sitebay.org/f/api/v1 for the SiteBay service. The API reference is a selected source-derived
  contract, not a list of arbitrary upstream cloud-provider endpoints.
keywords:
- api
- rest
- endpoints
- authentication
- bearer token
- fastapi
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-15
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Integrate with the SiteBay API
bible: true
tags:
- sitebay
- api
- rest
- developers
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- api-contract
- api-auth
- lifecycle
- mcp-platform
---

Use `https://my.sitebay.org/f/api/v1` for the SiteBay service. The API reference is a selected source-derived contract, not a list of arbitrary upstream cloud-provider endpoints.

## Authentication and scope

Protected requests use an authenticated session or a supported bearer credential. The pricing and region catalogs are public exceptions; it is incorrect to say every endpoint requires a token. Token lifetime depends on the credential and issuing flow. Do not rely on the previous blanket seven-day assertion.

A long-lived API key is scoped to a team and an explicit permission: `read`, `readwrite`, or `admin`. Create it from a signed-in session, store the raw value when returned, and keep it out of browser bundles and Git history. API-key authentication cannot create another key or administer the user's MFA factor. Membership and operation-specific checks still apply.

## Start with a read

```sh
: "${SITEBAY_TOKEN:?Set a credential securely}"
curl --fail-with-body --silent --show-error \
  --header "Authorization: Bearer ${SITEBAY_TOKEN}" \
  https://my.sitebay.org/f/api/v1/team
```

Inspect the returned team identifiers. A user ID, membership-row ID, team UUID and PostHog team ID are not interchangeable. Some collection routes return a paginated object with `results`; others return arrays. Follow each response schema rather than applying one assumed parser everywhere.

## Discover the correct operation

For a live WordPress site, read its state and `GET /site/{fqdn}/legal_actions` before a mutation. Use the exact method/path from [the reference sections]({{< relref "api/_index.md" >}}). Historical examples such as `/plan/checkout`, `/template`, `/account` and a general `/site/{fqdn}/shell_command` must not be treated as the current routes.

Use `/plan/pricing` for prices, `/ready_made_site` for the ready-made-site catalog, and `/account/me` for the authenticated account. The old arbitrary shell route is retired; an authorized named site tool is not a grant of cluster-root access.

## Handle failures deliberately

A validation response can contain structured field errors in `detail`, not only a string. Distinguish authentication failure, forbidden access, an absent resource, invalid input, a conflict/busy state and an upstream service failure. Retain the response status and a redacted operation identifier.

Use documented idempotency support for a retryable mutation, preserving the same key and request. A request timeout can leave the outcome unknown. Inspect the operation or resource before issuing another destructive request; do not assume the first request had no effect.

## Verify completion

An accepted background operation may return an event, checkpoint or job ID. Poll the corresponding state, retain the result, and test the actual target. A successful HTTP submission, screenshot, or Git commit alone does not prove a WordPress database change completed.

For guarded workflows, see [agent intent tools]({{< relref "products/mcp/agent-intents/index.md" >}}). The MCP transport reuses the same account authorization and operation policy; it does not bypass them.
