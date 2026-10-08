---
title: "Testing Sorti Panels"
description: "Verification patterns for Sorti panel servers, templates, runtime calls, and conformance."
tags: ["sorti", "mcp", "panels", "testing"]
published: 2026-06-04
weight: 90
---

# Testing Sorti Panels

Panel tests should prove the contract, not only the helper functions. A useful
test reads the panel resource, calls `read_state`, dispatches at least one
action tool, and checks the result shape the host depends on.

## Test the server contract

For each panel server, cover:

- `resources/list` includes the expected resource URI.
- `resources/read` returns the panel HTML.
- `tools/list` includes `<name>_panel.read_state`.
- `tools/call <name>_panel.read_state` returns `structuredContent`.
- Action tools mutate or query the intended state.
- Error cases return explicit tool errors instead of hanging.

This mirrors the STS2 slice test for the hand panel: read `ui://sts2/hand`,
call `hand.read_state`, then call `hand.play_card` through `tools/call`.

## Test the manifest

When the panel is first-party, cover the manifest too:

- `FIRST_PARTY_PANEL_NAMES` includes the panel name.
- `firstPartyPanelServerId(name)` produces `sorti.panel.<name>`.
- `firstPartyPanelResourceUri(name)` produces `ui://sorti.panel.<name>`.
- The open command maps back to the same panel.
- Provider applicability is correct for WordPress, static, Shopify, or `any`.

## Test the template protocol

Template tests should look for the protocol features that keep panels portable:

- The shared runtime is present or injected.
- The template calls `SortiPanel.rpc('tools/call', ...)`.
- The template does not call a removed hidden chat channel.
- The template does not post bare JSON-RPC for tool calls.
- Drag-source templates emit the Sorti drag-start notification.
- Drop-target templates handle Sorti drag-over and drag-drop notifications.

Do not only snapshot the whole HTML file. Snapshotting full templates produces
large brittle diffs. Assert on the protocol markers and the important rendered
state instead.

## Test the host bridge

The host bridge maps iframe messages to the agent proxy. Focus on these cases:

- A `tools/call` message includes a `callId`.
- Missing `callId` or missing tool name is rejected before proxy dispatch.
- Proxy replies map back to the original `callId`.
- Tool errors are forwarded as tool-call errors.
- Host-owned tools, such as canvas host tools, are handled by the host when
  appropriate.

The relevant Sorti references are:

- `apps/sorti/lib/panels/createAppBridge.ts`
- `apps/sorti/lib/panels/__tests__/createAppBridge.test.ts`
- `apps/sorti-agent/lib/rpc/ui-mcp-proxy-handler.ts`

## Test trust boundaries

Panel security is part of the contract.

Cover these cases:

- A same-server panel can call its own tools.
- A BYO or community server cannot call first-party-only tools such as
  `sorti.ask`.
- A forged trusted server id is rejected by the cross-server gate.
- A first-party panel keeps secrets in the agent and never passes bearer tokens
  into HTML.

Sorti's proxy handler and session-command tests already cover the important
pieces of this pattern. Use them as the model for new panel tests.

## Run focused checks

Use focused checks before broad suite runs:

```bash
bun test apps/sorti-agent/lib/mcp/panels/<name>/server.test.ts
bun test apps/sorti/lib/panels/__tests__/createAppBridge.test.ts
bunx tsc -p apps/sorti-agent/tsconfig.json --noEmit
```

When a panel touches shared host behavior, also run the relevant app-side panel
tests. When it changes shared contract types, run the contract package tests and
rebuild any generated output the package owns.

## Acceptance checklist

A panel change is ready when:

- The server test proves resource read, `read_state`, and action dispatch.
- The template uses the shared runtime.
- The host bridge test covers any new message shape.
- The proxy trust rules still deny untrusted cross-server calls.
- TypeScript passes for every package touched by the panel.
- The docs or README mention any new panel-specific rule.

## Keep tests source-faithful

Do not make the server smaller just to satisfy a test. If the view-model grows,
update the test to assert the meaningful subset or the new contract fields. STS2
uses this rule for panel VMs because the client-engine fields can change while
the model-facing text payload stays intentionally small.
