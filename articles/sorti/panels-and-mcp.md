---
title: Panels and MCP
description: An MCP server exposes tools and resources. A panel provides a persistent UI for reading state and invoking
  the tools that own it.
tags:
- sorti
- mcp
- panels
published: 2026-06-04
weight: 50
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- panels and mcp
- sitebay documentation
slug: panels-and-mcp
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-panels
- sorti-byo
modified: 2026-10-07
---

An MCP server exposes tools and resources. A panel provides a persistent UI for reading state and invoking the tools that own it.

## Choose a tool or a panel

Use a tool for an action the assistant needs to perform. Add a panel when a user also needs to inspect state, compare results, or repeat the action through visible controls.

Keep mutable data in tool results and view-models, not in descriptions that become stale. The service remains responsible for authentication, authorization, and mutations.

## First-party panel actions

A first-party panel calls its own action through `SortiPanel.rpc('tools/call', ...)`. Use the shared `sorti.ask` tool only when the action should create a visible conversational user turn:

```js
window.SortiPanel.rpc('tools/call', {
  name: 'sorti.ask',
  arguments: {
    text: 'Explain the findings shown in this security panel.',
    summary: 'Explain security findings',
  },
});
```

`text` is the request; `summary` is optional display text. A local panel action such as refreshing results should call that panel's tool directly.

## External applications

BYO applications declare their modules, tools, specialists, and panels. They do not automatically receive first-party shared tools or unrestricted cross-server access.

Run the [BYO conformance checks]({{< relref "mcp/byo-mcp.md" >}}) against a test server. Passing those checks does not grant installation permissions or prove production behavior.

For implementation details, read [the first-party server contract]({{< relref "sorti/sorti-panel-server-contract.md" >}}).
