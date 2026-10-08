---
layout: documentation-section
title: "Sorti"
description: "A practical guide to Sorti, the SiteBay agent workspace for building, inspecting, and operating sites."
tags: ["sorti", "sitebay", "ai"]
published: 2026-06-04
weight: 10
---

# Sorti

Sorti is the SiteBay agent workspace. It combines a chat assistant, a live site
canvas, tool panels, specialists, and SiteBay account context in one place so
you can move from "what is happening on this site?" to "change it and show me
the result" without switching tools.

Use this section as the foundation for Sorti documentation. It starts with what
Sorti is, then explains the operating model behind the app, the canvas
workspace, the MCP panel system, and how developers add new panel surfaces.

## Start here

- [What Sorti is](what-is-sorti/) explains the product in plain language and
  names the core surfaces users see.
- [How Sorti works](how-sorti-works/) describes the request flow from the app to
  the agent and back.
- [Canvas and workspace](canvas-and-workspace/) explains the live preview, user
  selections, and site editing model.
- [Panels and MCP](panels-and-mcp/) explains first-party panels, bring-your-own
  MCP servers, and the panel tool-call pattern.

## Developer guides

- [Developing Sorti panels](developing-sorti-panels/) gives the end-to-end shape
  of a first-party panel.
- [Sorti panel server contract](sorti-panel-server-contract/) explains the
  resource, tool, and view-model contract.
- [Sorti panel runtime](sorti-panel-runtime/) explains the HTML runtime,
  `tools/call`, refresh, and `sorti.ask`.
- [Testing Sorti panels](testing-sorti-panels/) lists the checks that keep panel
  changes compatible with Sorti and STS2-style MCP hosts.

## Core ideas

Sorti is built around a few simple ideas:

- The site is the workspace. Sorti keeps the active site, current surface,
  selected element, open panels, and recent tool results close to the
  conversation.
- The agent acts through tools. Site changes, analytics queries, Git work,
  security scans, and panel actions are routed through typed tools instead of
  hidden chat commands.
- The user stays in the loop. Complex site-changing missions use confirmation,
  progress, and verification flows; small canvas edits can run directly against
  the selected page.
- Panels are first-class. Panels can show state, run local actions, and ask the
  agent for help through the same tool-call channel.
- Integrations are portable. The MCP and BYO contracts let external systems
  expose tools, panels, and specialists without becoming part of the core app.

## Source map

The docs in this section are grounded in these Sorti source areas:

| Area | Source |
|---|---|
| App and agent overview | `README.md` |
| LiveKit topics and payloads | `packages/sorti-contract/src/events.ts` |
| First-party panel manifests | `packages/sorti-contract/src/firstPartyPanelManifests.ts` |
| Panel servers and runtime | `apps/sorti-agent/lib/mcp/panels/` |
| Panel host bridge | `apps/sorti/lib/panels/` |
| Canvas tools and topics | `apps/sorti-agent/lib/tools/canvas/`, `apps/sorti-agent/lib/canvas/` |

For panel development, also read
`~/sts2-engine/src/mcp/panels/spec/README.md`. STS2 is the clearest local
example of many panels following one server/template/view-model pattern.

## Who this is for

Use these pages if you are:

- Learning what Sorti does inside SiteBay.
- Writing docs for users who need to operate Sorti day to day.
- Building an MCP server or panel that should plug into Sorti.
- Explaining how the assistant, canvas, and SiteBay backend fit together.

## Related integrations

- [Build your own MCP for Sorti]({{< relref "mcp/byo-mcp.md" >}}).
- [Play Slay the Spire 2 with Sorti]({{< relref "games/sts2.md" >}}).
