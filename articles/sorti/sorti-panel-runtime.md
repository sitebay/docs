---
title: First-party panel runtime
description: Use the shared SortiPanel runtime for first-party HTML panels instead of implementing a second transport.
tags:
- sorti
- mcp
- panels
- development
published: 2026-06-04
weight: 80
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- sorti panel runtime
- sitebay documentation
slug: sorti-panel-runtime
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-panels
modified: 2026-10-07
---

Use the shared `SortiPanel` runtime for first-party HTML panels instead of implementing a second transport.

| Method | Purpose |
| --- | --- |
| `rpc(method, params)` | Send a request and await its result |
| `notify(method, params)` | Send a notification |
| `init({ uri, onState, readStateTool, onUndo })` | Connect state and optional undo handling |
| `refresh(uri, args)` | Request updated state |
| `onNotification(handler)` | Observe host notifications |

Initialize the panel with its URI and state tool. Render the view-model in `onState` and show errors rather than leaving a control indefinitely busy.

## Tool calls

```js
const result = await window.SortiPanel.rpc('tools/call', {
  name: 'example_panel.read_state',
  arguments: {},
});
```

Replace the example name with your registered tool. The runtime selects the web or React Native bridge, correlates replies by `callId`, and wraps non-tool RPC in the typed proxy envelope. Do not post bare JSON-RPC from a template.

## Lifecycle and trust

Keep rendering separate from mutations. Repeated delivery of the same state must not trigger another write. Dispose listeners when the panel unmounts and handle connection loss visibly.

A native renderer, when present, consumes the same state and calls the same tools. Shared transport does not eliminate the need to test both renderers.

See [the server contract]({{< relref "sorti/sorti-panel-server-contract.md" >}}).
