---
title: "Sorti Panel Runtime"
description: "How panel templates use SortiPanel, tools/call, refresh, notifications, and sorti.ask."
tags: ["sorti", "mcp", "panels", "development"]
published: 2026-06-04
weight: 80
---

# Sorti Panel Runtime

Sorti panel templates use the shared `SortiPanel` runtime. The runtime lives in:

```text
apps/sorti-agent/lib/mcp/panels/_runtime/panel-runtime.html
apps/sorti-agent/lib/mcp/panels/_runtime/panelRuntime.ts
```

The server injects that runtime into `template.html` with
`readPanelTemplateWithRuntime(__dirname)`.

## What the runtime does

The runtime gives every template the same API:

- `SortiPanel.rpc(method, params)`
- `SortiPanel.notify(method, params)`
- `SortiPanel.init({ uri, onState, readStateTool, onUndo })`
- `SortiPanel.refresh(uri, args)`
- `SortiPanel.onNotification(handler)`

It chooses the transport for the host:

- React Native WebView uses `window.ReactNativeWebView.postMessage`.
- Web uses `window.parent.postMessage`.

The template does not need to know which host is running it.

## Lifecycle

A normal panel lifecycle is:

1. The host reads the MCP resource and mounts the HTML.
2. The template calls `SortiPanel.init`.
3. The host replies with `host-ready`.
4. The template calls `read_state` through `tools/call`.
5. The template renders the returned view-model.
6. User actions call panel tools through `tools/call`.
7. Tool-result notifications trigger refresh when needed.

## Use tools/call for actions

Panel actions call tools:

```js
await window.SortiPanel.rpc('tools/call', {
  name: 'git_panel.read_state',
  arguments: {},
});
```

For panel-local work, call the panel's own tool. For example, a Git panel should
call a Git panel action, and a PostHog panel should call a PostHog panel action.

Do not post bare JSON-RPC from a template. The runtime wraps non-tool RPC in the
typed proxy envelope that the Sorti host and agent understand.

## Render from read_state

A normal template does this:

```js
window.SortiPanel.init({
  uri: 'ui://sorti.panel.git',
  readStateTool: 'git_panel.read_state',
  onState: render,
});
```

When the host sends a tool-result notification, the runtime refreshes
subscribed panels by calling their `read_state` tool again. This is the same
basic idea STS2 uses: the panel renders a projection of server or engine state
and refreshes after actions.

## Ask the agent only when needed

`sorti.ask` creates a real user turn in the main transcript:

```js
await window.SortiPanel.rpc('tools/call', {
  name: 'sorti.ask',
  arguments: {
    text: 'Explain the unusual analytics changes from the last seven days.',
    summary: 'Explain analytics changes',
  },
});
```

Use it when the user expects the assistant to respond. Do not use it for
panel-local mutations. A button that clears a scratchpad should call the panel
tool that clears the scratchpad.

## Drag and notifications

The runtime normalizes Sorti drag notifications:

- `ui/notifications/sorti-drag-start`
- `ui/notifications/sorti-drag-over`
- `ui/notifications/sorti-drag-drop`

STS2 uses this same concept for card and potion drag surfaces. Sorti panels use
it for workspace objects such as files or checkpoints when a panel declares
drag sources or targets in resource metadata.

## Standalone fixtures

The runtime has a standalone mode for simple local fixtures. It can return a
fixture when a `read_state` tool is called outside the live Sorti host.

Treat standalone mode as a development aid. The live contract is still
`tools/call` through the Sorti host and agent proxy.

## Runtime checklist

Before shipping a template, check that it:

- Calls `SortiPanel.init`.
- Reads state with `tools/call`.
- Handles a missing or inactive view-model.
- Shows tool errors without trapping the user in a loading state.
- Uses `sorti.ask` only for visible assistant turns.
- Keeps panel-local actions as panel tool calls.
