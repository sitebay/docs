---
title: "Developing Sorti Panels"
description: "The end-to-end workflow for adding a first-party panel to Sorti."
tags: ["sorti", "mcp", "panels", "development"]
published: 2026-06-04
weight: 60
---

# Developing Sorti Panels

A Sorti panel is an MCP App resource that renders HTML and talks back to its
server through `tools/call`. The pattern is the same discipline STS2 uses for
its panel servers: a server owns state and actions, a template renders a
view-model, and every user action goes through a typed tool.

Use this workflow for first-party Sorti panels. If you want a panel built
*inside* a session — no code, assembled by the agent from state, reducer
tools, and a bound scene — that is the forge instead: see
[Forging Panels](/articles/sorti/forging-panels/) for the concepts and the
[Forge Reference](/articles/sorti/forge-reference/) for the exact vocabulary.

## Start from the panel standard

Read the local standard first:

- `apps/sorti-agent/lib/mcp/panels/README.md`
- `apps/sorti-agent/lib/mcp/panels/git/server.ts`
- `apps/sorti-agent/lib/mcp/panels/git/template.html`
- `~/sts2-engine/src/mcp/panels/spec/README.md`

STS2 is useful because it keeps each panel in one predictable shape:
`server.ts`, `template.html`, `read_state`, action tools, and tests. Sorti uses
the same idea, with a shared `SortiPanel` runtime injected into each template.

## Development checklist

Before coding, name these pieces:

- The panel's canonical `<name>`.
- The state the panel renders.
- The tools the panel needs.
- Which tools are panel-only and which are model-visible.
- Whether the panel needs drag sources or drop targets.
- Whether a native renderer is justified, or HTML is enough.

## Create the panel folder

Add a folder under:

```text
apps/sorti-agent/lib/mcp/panels/<name>/
```

The minimum files are:

- `server.ts`
- `template.html`
- `server.test.ts` when behavior is non-trivial

If the panel only shows a small status surface, still ship HTML. A first-party
panel without a real resource becomes a special case for the host and for future
developers.

## Minimal server skeleton

```ts
export function createExamplePanelServer(deps: ExamplePanelDeps): PanelServer {
  return {
    resource,
    resourceContent,
    tools,
    callTool: async (name, args) => {
      if (name === 'example_panel.read_state') {
        return createCallToolResult(await readExampleState(deps, args));
      }
      throw new Error(`unknown tool: ${name}`);
    },
    readResource: async (uri) => {
      if (uri !== EXAMPLE_PANEL_RESOURCE_URI) {
        throw new Error(`unknown resource: ${uri}`);
      }
      return resourceContent;
    },
  };
}
```

Keep the real implementation typed. The skeleton is only the shape.

## Name the resource and tools

Use the first-party naming functions in
`packages/sorti-contract/src/firstPartyPanelManifests.ts`:

- Server id: `sorti.panel.<name>`
- Resource URI: `ui://sorti.panel.<name>`
- Open command: `sorti.panel.<name>.open`

Use panel tool names with the panel prefix:

- `<name>_panel.read_state`
- `<name>_panel.<action>` for panel-facing actions

Do not invent a second resource URI, a second server id, or a separate chat
topic. One panel should have one canonical identity.

## Return a view-model

The server should return current panel state through `read_state` as
`structuredContent`. The template renders that object.

Use a small discriminated shape:

```ts
type ExamplePanelViewModel =
  | { kind: "example"; ready: false; reason: string }
  | { kind: "example"; ready: true; rows: ExampleRow[] };
```

Keep derivation in `server.ts` or a pure helper imported by the server. The
template should render values and call tools; it should not rediscover business
rules that already live in the agent, SiteBay API, or engine.

## Register the panel

First-party panels are registered by
`apps/sorti-agent/lib/mcp/panels/bootstrapFirstPartyPanels.ts`. That bootstrap
adapts each `PanelServer` into the UI proxy registry and adds model-visible
panel tools to the agent tool map.

Also update `packages/sorti-contract/src/firstPartyPanelManifests.ts` if the
panel should appear as a first-party panel in the palette and workspace.

## Keep the trust boundary clear

Panel HTML runs in a sandbox. Secrets stay in the agent. The iframe calls
`tools/call`; the server performs the privileged work.

That is why the Git panel can query a working tree and call SiteBay while the
HTML never receives the SiteBay bearer token. Treat this as the default model
for every panel.

## Avoid these mistakes

- Do not add a new LiveKit topic for a panel button.
- Do not send hidden natural-language commands for panel-local work.
- Do not put mutable lists into tool descriptions.
- Do not expose SiteBay or provider credentials to template HTML.
- Do not give one panel multiple ids unless you are explicitly migrating old
  names with tests.
