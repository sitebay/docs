---
slug: mcp-agent-intents
description: Intent operations combine common site-management steps with a defined request and result.
keywords:
- mcp
- sitebay
- wordpress
- agent
- automation
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-04-28
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Use guarded SiteBay agent workflows
bible: true
tags:
- sitebay
- mcp
- ai
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- mcp-platform
- lifecycle
---

Intent operations combine common site-management steps with a defined request and result. Their availability is determined by the advertised tool contract, current site state and calling identity—not a model's ability to describe the action.

## Inspect and diagnose

The site summary returns identity, status, team, staging, restore-window and execution-readiness information. It is not the heavy live plugin/PHP probe. The diagnosis operation performs read-only health checks and returns findings with recommended actions; a recommendation is not authorization to execute it.

## Plugins and content

The plugin-ensure operation can install a missing plugin, update a requested version, and set activation state. A plugin change can break the site, so create an appropriate checkpoint first. Reuse the same documented idempotency key when retrying the same request.

Content-apply can update settings and pages matched by slug. Matching an existing slug changes that page rather than always creating a new one. Review the intended settings, pages and site before approving it.

## Promotion and restore

Staging promotion requires its confirmation contract and returns an operation/event reference. Review the file and database consequences, then inspect the completed live state.

The restore-to-point workflow creates a pre-restore checkpoint, validates the target and dispatches the restore. Keep the returned checkpoint and restore ID so you can inspect progress and retain a recovery handle. This is safer than assuming the low-level PIT request protects the current state automatically.

## Useful requests

```text
Diagnose example.com without changing it. Show the findings and proposed next action.
```

```text
Compare staging with live for example.com. Show the impact and recovery point; do not promote until I approve.
```

```text
Find the restore point before my content change. Prepare the restore plan and wait for approval.
```

Do not assume one tool name remains stable across every MCP client; discover the advertised operation and its schema. An idempotency key prevents a supported duplicate request from being treated as fresh work, but it does not replace completion checks. See [API integration]({{< relref "products/platform/api-reference/index.md" >}}).
