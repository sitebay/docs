---
slug: signal-hooks
description: "Wire any external event — webhooks, websockets, git saves — into Sorti's agent hooks. One MCP notification, infinite automation."
keywords: ['sorti', 'hooks', 'signals', 'mcp', 'webhooks', 'automation', 'git', 'external signals']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-04-25
modified: 2026-04-25
modified_by:
  name: SiteBay
title: "Signal Hooks: React to Anything in Sorti"
tags: ["sorti", "hooks", "signals", "mcp", "automation"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Signal Hooks: React to Anything in Sorti

Sorti's hook system lets you run an action — show a toast, open a panel, inject context, run a workflow — whenever something happens. Hooks already fire on tool calls, user prompts, and agent lifecycle events. **Signal hooks** extend that to *any external event*: a webhook from Stripe, a Linear issue update, a git push, or a message from your own service.

## The three-layer model

```
External source                Signal bus               Hook
──────────────────────────     ──────────────────────   ────────────────────────────
VS Code git status push   ──→  channel: git_changed ──→  { signals: ['git_changed'] }
                                                          action: open_panel
                                                                (ui://git)

Your MCP server           ──→  channel: stripe_pay  ──→  { signals: ['stripe_pay'] }
signal/emit notification       ment                       action: toast "New payment!"

Any future source         ──→  any channel name    ──→  any matching hook fires
```

Signals are just strings with a payload. The bus is per-session, so signals from one user's workspace can't leak to another.

## Publishing signals from an MCP server

Any MCP server can push a signal using the `signal/emit` notification:

```python
# Python MCP server example — Stripe webhook → Sorti signal
from mcp.server import Server
import stripe

server = Server("my-webhooks")

@app.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    event = stripe.Event.construct_from(await request.json(), stripe.api_key)

    await server.send_notification("signal/emit", {
        "channel": "stripe_payment",
        "payload": {
            "amount": event.data.object.amount,
            "currency": event.data.object.currency,
        },
        "coalesce": "queue",   # don't drop events — queue them
    })
```

The method name `signal/emit` is the stable contract. Sorti picks it up automatically from any connected MCP server — no adapter code needed on your side.

### Coalescing

| Mode | Behaviour | Use when |
|------|-----------|----------|
| `latest` (default) | Rapid-fire signals on the same channel collapse into one — only the most recent payload is delivered | Status snapshots (git state, heartbeats) |
| `queue` | Every emission is delivered in order | Discrete events (payments, messages) |

## Declaring a hook for an external signal

In the Sorti hooks UI (or via the `create_hook` tool), set `event` to `ExternalSignal` and add a `signals` list:

```json
{
  "id": "stripe-payment-toast",
  "displayName": "Stripe payment notification",
  "event": "ExternalSignal",
  "signals": ["stripe_payment"],
  "action": {
    "kind": "toast",
    "toast_params": {
      "message": "💳 New payment: {{payload}}",
      "level": "info",
      "durationMs": 5000
    }
  }
}
```

**Explicit opt-in:** a hook only receives `external_signal` events for channels it declares in `signals`. Hooks without a `signals` array never receive external signals — this prevents high-volume channels from waking up unrelated hooks.

### Template tokens

Inside `message` and `text` fields you can use:

| Token | Value |
|-------|-------|
| `{{channel}}` | The signal channel name |
| `{{payload}}` | The signal payload as JSON (capped at 2 KB) |
| `{{site}}` | Active site FQDN |
| `{{timestamp}}` | ISO-8601 timestamp |

## Built-in signals

These channels are published automatically when the VS Code bridge is connected — no MCP server needed:

| Channel | Payload | Published when |
|---------|---------|----------------|
| `git_changed` | `GitStatus` — branch, staged/unstaged files, ahead/behind counts | Every time git state changes in the workspace |
| `editor_signal` | `EditorSignalEvent` — focus, save, dirty | File focus or save events |

The **Git panel** (`ui://git`) listens on `git_changed` and updates automatically. The **Save / Undo / Sync** buttons in that panel send plain-English messages to the chat, which the git specialist picks up.

## Git specialist

When a VS Code bridge is connected, Sorti includes a **git specialist** that understands three plain-English verbs:

| What you say | What happens |
|---|---|
| "save my work" / "checkpoint this" | Reads the diff, generates a commit message, stages and commits |
| "undo that" / "go back to before lunch" | Finds the right commit in the log, creates a `sorti/safety-<timestamp>` branch, checks out |
| "send to team" / "push this" | Pulls first if behind, then pushes — asks before touching main/master |

You never see a git command. The specialist enforces hard rules internally: no force-push, no empty commits, no push to main without confirmation, always a safety branch before destructive operations.

## Phase 3: declarative signal sources (coming soon)

Future versions will let specialist manifests declare signal sources without an MCP server:

```typescript
// Not yet implemented — type is stable, runtime will warn
signalSources: [
  { type: 'ws',   url: 'wss://api.example.com/events', channel: 'my_events' },
  { type: 'poll', url: 'https://api.example.com/status', intervalMs: 30_000, channel: 'status_update' },
  { type: 'cron', expr: '*/15 * * * *', channel: 'scheduled_check', payload: {} },
]
```

Until then, the MCP `signal/emit` pathway covers all of these cases — any source that can send an MCP notification can push signals today.
