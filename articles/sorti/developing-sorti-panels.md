---
title: Build a first-party panel
description: Build the server contract first, then render its state through the shared runtime.
tags:
- sorti
- mcp
- panels
- development
published: 2026-06-04
weight: 60
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- developing sorti panels
- sitebay documentation
slug: developing-sorti-panels
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-panels
- sorti-byo
modified: 2026-10-07
---

Build the server contract first, then render its state through the shared runtime.

## Define state and operations

Choose one server ID and resource URI. Define the view-model for `read_state` and name the actions the panel needs. Document which operations read data and which mutate it.

Use the Git panel and `apps/sorti-agent/lib/mcp/panels/README.md` as source examples. Copy the contract pattern, not another panel's credentials, state, or provider assumptions.

## Implement the server

Validate inputs, check permissions, and call the service that owns the data. Distinguish acceptance, completion, and failure in results. Retain operation IDs for asynchronous or uncertain outcomes.

## Render and register

Load the HTML with `readPanelTemplateWithRuntime(__dirname)`. Initialize `SortiPanel`, render returned state, and call your own tools for buttons. Use `sorti.ask` only for a visible request to the conversation.

Register through `apps/sorti-agent/lib/mcp/panels/bootstrapFirstPartyPanels.ts`. Update `packages/sorti-contract/src/firstPartyPanelManifests.ts` when the panel belongs in first-party UI.

## Verify

Test success, denied access, invalid input, disconnected transport, and repeated state delivery. Inspect the real panel at narrow and wide sizes. A mocked result does not prove a live service mutation.

Continue with [Testing panels]({{< relref "sorti/testing-sorti-panels.md" >}}). External apps use the [BYO contract]({{< relref "mcp/byo-mcp.md" >}}), not first-party registration.
