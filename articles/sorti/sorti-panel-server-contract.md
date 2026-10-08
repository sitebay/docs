---
title: "Sorti Panel Server Contract"
description: "How a Sorti panel server exposes resources, read_state, action tools, and model-visible tools."
tags: ["sorti", "mcp", "panels", "development"]
published: 2026-06-04
weight: 70
---

# Sorti Panel Server Contract

A first-party Sorti panel server implements `PanelServer` from
`@sitebay/sorti-contract`. The server is the authority for the resource, tool
list, tool execution, and resource reads.

## Required pieces

Every first-party panel server returns:

- `resource`: the MCP App resource list entry.
- `resourceContent`: the HTML content for the resource.
- `tools`: the panel's tool definitions.
- `callTool(name, args)`: dispatch for `tools/call`.
- `readResource(uri)`: dispatch for `resources/read`.

The STS2 panel spec uses the same shape for each panel. Its `hand` panel, for
example, exposes `ui://sts2/hand`, `hand.read_state`, and `hand.play_card`.
Sorti first-party panels use `ui://sorti.panel.<name>` and
`<name>_panel.*` tool names.

## Resource shape

Use the standard first-party resource URI:

```ts
const RESOURCE_URI = firstPartyPanelResourceUri("<name>");
const SERVER_ID = firstPartyPanelServerId("<name>");
```

The HTML should be loaded with:

```ts
const TEMPLATE_HTML = readPanelTemplateWithRuntime(__dirname);
```

That helper inserts the shared `SortiPanel` runtime when the template does not
already include it.

## Tool visibility

Panel tools can be panel-facing, model-facing, or both. The usual split is:

- `read_state` is panel-facing.
- Panel UI actions are panel-facing.
- Existing assistant tools may remain model-facing when the LLM should call
  them directly.

Keep panel-facing actions named after the panel:

```text
git_panel.read_state
git_panel.commit
git_panel.restore_checkpoint
```

The bootstrap layer enforces a few contract rules:

- A panel server may advertise at most 12 tools.
- A panel tool must not declare the reserved visibility value `app`.
- If a tool declares `outputSchema`, it must be an object.

## Metadata

Use resource metadata to describe host behavior instead of hardcoding host
exceptions. Common metadata includes:

- CSP domains for resource and network access.
- Tool visibility.
- Drag sources and drop targets under the Sorti metadata namespace.
- Layout hints when a panel belongs in a particular workspace slot.

When metadata is missing, the host should choose the conservative behavior:
render the resource, but do not grant extra access.

## View-model result

Return the rendered state through `structuredContent`:

```ts
return createCallToolResult(viewModel, {
  structuredContent: viewModel,
});
```

Use text content for the model-facing summary, not as the only carrier for panel
state. Tests should assert that `structuredContent` is present and matches the
view-model the template expects.

## View-model rules

Good view-models are:

- Small enough to inspect in a test.
- Stable across template rewrites.
- Explicit about inactive states.
- Derived from source data in one place.
- Free of secrets and bearer tokens.

If the template needs a display label, put the label in the view-model. Do not
make the template infer business meaning from ids when the server already knows
the answer.

## Action tools

Panel action tools should do the real work and return a small result. Do not
ask the agent to perform a panel-local mutation in natural language.

Use `sorti.ask` only when the action should create a visible chat turn. For
example:

- Good panel-local action: `posthog_panel.clear_scratchpad`
- Good conversational action: `sorti.ask { text, summary }`
- Bad action: send a hidden chat message that asks the agent to clear state

## Source-grounded examples

Use these as references when building a new server:

- `apps/sorti-agent/lib/mcp/panels/git/server.ts` for a complex panel.
- `apps/sorti-agent/lib/mcp/panels/ask/server.ts` for a focused panel.
- `apps/sorti-agent/lib/mcp/panels/_session/sessionCommands.ts` for the shared
  `sorti.ask` tool.
- `~/sts2-engine/src/mcp/panels/spec/hand/server.ts` for the STS2 server and
  view-model pattern.
