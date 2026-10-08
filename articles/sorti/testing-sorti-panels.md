---
title: Test a panel
description: Verify the state contract, transport, rendered UI, and external operation separately.
tags:
- sorti
- mcp
- panels
- testing
published: 2026-06-04
weight: 90
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- testing sorti panels
- sitebay documentation
slug: testing-sorti-panels
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-panels
- sorti-byo
modified: 2026-10-07
---

Verify the state contract, transport, rendered UI, and external operation separately.

## Server tests

Check `read_state` against representative fixtures. Test invalid arguments, denied access, missing data, provider failure, and a repeated request. For mutations, assert the state transition, not only the returned message.

## Bridge tests

Verify request/reply correlation and the panel's owning server. Reject malformed messages and unauthorized cross-server calls. Preserve the tests in `apps/sorti/lib/panels/__tests__/createAppBridge.test.ts` when changing the web bridge.

## Rendered behavior

Load the real resource in the target host. Test keyboard and pointer controls, connection loss, narrow layouts, and long data. An identical state push must not trigger another mutation.

Test a native renderer separately when one exists. An HTML screenshot does not prove native behavior.

## External conformance

Run the [BYO bundle]({{< relref "mcp/byo-mcp.md" >}}) in fixture mode against a test target. It checks discovery, tools, results, and panel resources. Installation grants and real provider operations still need their own evidence.

## Record the result

Include the source revision, test command, result, and skipped or unavailable services. Distinguish a unit-test pass, a browser journey, and a confirmed production change.
