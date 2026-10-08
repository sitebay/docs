---
title: "Panels and MCP"
description: "How Sorti uses MCP App panels, first-party panels, and BYO MCP servers."
tags: ["sorti", "mcp", "panels"]
published: 2026-06-04
weight: 50
---

# Panels and MCP

Panels are interactive surfaces that Sorti can render inside the workspace.
They are backed by MCP App resources and tools.

The goal is simple: a panel shows state, the user acts, and the action goes
through a typed tool call.

## First-party panels

Sorti ships first-party panels for:

- Git
- Diff
- PostHog Analytics
- Artifacts
- Ask
- WP-AI
- Gutenberg Composer
- Files
- Security

Each first-party panel has a stable server id and resource URI. Each panel
exposes a `read_state` tool that returns the view-model the panel renders.
Panel actions use panel tools, and model-facing tools can remain available when
the assistant should call them directly.

| Panel kind | Use it for |
|---|---|
| Git and Diff | Repository status, file changes, commits, checkpoints, and review. |
| PostHog Analytics | Product analytics queries and investigation. |
| Artifacts and Files | Durable generated output and file-oriented workspace state. |
| Ask | Structured user input when the agent is waiting on a question. |
| WP-AI and Composer | WordPress and Gutenberg-specific assistant workflows. |
| Security | WordPress security scanning and remediation workflows. |

## One panel-to-agent channel

Panels reach the agent through `tools/call`. Sorti does not need a separate
hidden chat channel for panel actions.

When a panel needs the agent to respond in the main conversation, it calls the
shared `sorti.ask` tool with:

- `text`: the full prompt the agent receives.
- `summary`: an optional short label shown in the chat transcript.

Panel-local work should call the panel's own tool instead. For example, clearing
a scratchpad or running a query should be a panel action, not a chat message
that asks the agent to route it.

## Tool or panel

Add a tool when the assistant needs a new action. Add a panel when the user also
needs a durable surface to inspect, compare, or operate that action.

Good panel candidates have at least one of these traits:

- The result is visual or stateful.
- The user may need to rerun or refine the operation.
- The output is easier to scan as a table, graph, diff, file list, or form.
- The workflow has panel-local actions that should not become chat messages.

## Bring your own MCP

BYO MCP servers can plug into Sorti when they expose the expected capability and
server-card endpoints, plus an MCP endpoint. A BYO server can contribute tools,
specialists, and panels.

Before loading a BYO server, run the conformance checks described in
[Build your own MCP for Sorti](/docs/mcp/byo-mcp/). The checks protect the
basics: capability shape, tool-list parity, panel namespacing, and safe
tool-call behavior.

## Trust and boundaries

Sorti treats first-party panels and BYO panels differently. First-party panels
can receive shared first-party tools such as `sorti.ask`. BYO panels do not get
those tools automatically.

Panel calls stay within the owning server unless a trusted or user-granted
cross-server path exists. This keeps an external panel from silently acting as a
different integration.

## Panel design rules

A good Sorti panel:

- Renders from a `read_state` view-model.
- Calls tools directly for panel-local actions.
- Uses `sorti.ask` only when it should create a visible conversation turn.
- Keeps tool results small and structured.
- Avoids embedding changing lists or large dynamic context inside tool
  descriptions.
- Provides a useful minimal HTML surface even when the panel is simple.

## Where STS2 fits

The STS2 bridge is a reference example of a domain-specific co-op integration.
It exposes state, tools, and panels so Sorti can render external surfaces and
coordinate actions through the same MCP-style model.

The same pattern applies outside games: a domain bridge should expose state and
actions through portable tools and panels, while Sorti hosts the workspace and
conversation.
