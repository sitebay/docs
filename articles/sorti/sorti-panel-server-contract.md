---
title: First-party panel server contract
description: A first-party panel has one server identity, a UI resource, and tools operating on the same view-model.
tags:
- sorti
- mcp
- panels
- development
published: 2026-06-04
weight: 70
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- sorti panel server contract
- sitebay documentation
slug: sorti-panel-server-contract
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-panels
modified: 2026-10-07
---

A first-party panel has one server identity, a UI resource, and tools operating on the same view-model.

| Part | Convention |
| --- | --- |
| Server ID | `sorti.panel.<name>` |
| Resource URI | `ui://sorti.panel.<name>` |
| State tool | `<name>_panel.read_state` |
| Panel action | `<name>_panel.<action>` |
| State result | `structuredContent` |

## State and actions

Return the fields the UI needs from `read_state`. Validate action arguments and perform privileged work on the server. Keep credentials out of the HTML and client-visible state.

Use existing model-facing tool names as compatibility aliases only where needed. An alias is not a reason to create another state owner.

## Resource delivery

Ship an HTML template and load it with `readPanelTemplateWithRuntime(__dirname)`. Register the server through `bootstrapFirstPartyPanels.ts` and update the first-party manifest when the panel belongs in the palette.

Web and native first-party delivery use the `ui_resource` LiveKit topic. Web can upsert the pushed resource; native reloads the owning surface through resource discovery and reading. Community HTTP MCP delivery is a separate path.

## Optional history

A server that reconstructs historical state can accept `atSeq` and support `onUndo`. Do not advertise replay merely because the runtime exposes a callback.

Read [the panel runtime]({{< relref "sorti/sorti-panel-runtime.md" >}}) and [testing guidance]({{< relref "sorti/testing-sorti-panels.md" >}}) before registering a panel.
