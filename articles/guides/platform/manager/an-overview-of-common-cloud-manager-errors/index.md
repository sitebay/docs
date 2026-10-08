---
slug: an-overview-of-common-cloud-manager-errors
description: Start with the affected site, time and exact operation.
keywords:
- error
- account limit
- limit
- activated
- before you can
- please try again
- open a support ticket
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-05-22
modified_by:
  name: sitebay
aliases:
- /quick-answers/platform/an-overview-of-common-cloud-manager-errors/
- /quick-answers/platform/understanding-cloud-manager-errors/
title: Diagnose a My SiteBay error
title_meta: Diagnose a My SiteBay error
tags:
- sitebay platform
- My SiteBay
authors:
- sitebay
contributors:
- sitebay
doc_sources:
- api-contract
- site-ui
- lifecycle
modified: 2026-10-07
---

Start with the affected site, time and exact operation. Preserve a redacted response and operation ID; do not include session cookies, API keys or one-use login links in a bug report.

## Authentication and authorization

An expired sign-in session requires its supported sign-in flow. A forbidden action requires checking the selected team, role and operation scope. Repeatedly minting credentials does not resolve a missing permission.

## Missing or busy resources

Verify the domain and resource ID and read the current site state. A missing optional stage is not a reason to recreate it for a live canvas problem. Busy creation, update, promotion and restore states can temporarily remove available actions; inspect legal actions rather than forcing the request.

## Validation failures

Read field-level `detail` errors as well as the HTTP status. Check the required request shape, chosen region/catalog identifier and supported option values. Do not strip validation fields until the server accepts an unrelated operation.

## Timeouts and upstream failures

A submitted request may have reached the service even if its response was lost. Inspect the resource/operation before retrying a mutation. Separate DNS, HTTPS, origin health and browser cache failures; recreating a site can destroy evidence and create duplicate resources.

## Escalation

Provide the redacted site reference, time zone, action, expected result, observed response and recent relevant changes. Include a small reproducible example when possible. Follow [API error handling]({{< relref "products/platform/api-reference/index.md" >}}) and the site's support route for the remaining issue.
