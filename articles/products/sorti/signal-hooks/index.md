---
slug: signal-hooks
description: A signal carries a named event and payload into the session hook bus. Hooks receive only the channels
  they explicitly subscribe to.
keywords:
- sorti
- hooks
- signals
- mcp
- webhooks
- automation
- git
- external signals
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-04-25
modified: 2026-10-08
modified_by:
  name: SiteBay
title: React to session signals
tags:
- sorti
- hooks
- signals
- mcp
- automation
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- sorti-hooks
- sorti-panels
- sorti-current-signals
aliases:
- /products/siteclaw/signal-hooks/
---

A signal carries a named event and payload into the session hook bus. Hooks receive only the channels they explicitly subscribe to.

## Subscribe to a channel

Use `ExternalSignal` as the hook event and list the channel in `signals`. An empty or missing list receives no external signals. Review and enable the hook through the supported approval flow; a copied definition is not an approval.

Relevant definition fields for a notification hook look like this:

```json
{
  "event": "ExternalSignal",
  "signals": ["git_changed"],
  "action": {
    "kind": "toast",
    "toast_params": {
      "message": "Git state changed",
      "level": "info"
    }
  }
}
```

This is a configuration excerpt, not a complete create-hook request. Use the current schema for required identity and approval fields.

## Understand delivery

Snapshot channels such as `git_changed`, `editor_signal`, `lsp_diagnostics`, and `workspace_problems` use `latest` coalescing. Event-shaped channels such as `file_renamed`, `file_deleted`, and `posthog_event` use `queue`.

Queueing within a session is not durable external-event storage. Keep business-critical delivery and retries in the system that owns those events.

## Connect an event source

Editor adapters, workflow signals, and the first-party `sorti.signal` tool feed the session bus through their supported paths. An arbitrary external webhook is not automatically a trusted session event. Authenticate its sender, validate its payload, and use an explicitly supported adapter.

Template fields can use `{{channel}}`, `{{payload}}`, `{{site}}`, and `{{timestamp}}`. Keep payloads small and exclude secrets. Test the hook with a harmless action before allowing writes.

## Keep channel names stable

The SiteClaw-to-Sorti product rename does not rename signal channels. Keep `git_changed`, `editor_signal`, and other producer-defined names intact. The registry is a naming convention, not a payload-validation service. Version an incompatible payload instead of silently changing what existing hooks receive.

Inspect the producer and the hook subscription when an event is missing. Test one harmless notification, then check which channel and payload arrived. A session signal is not a receipt that a deployment or external workflow completed.
