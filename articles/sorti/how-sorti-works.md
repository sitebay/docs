---
title: "How Sorti Works"
description: "The operating model behind Sorti sessions, tools, missions, and events."
tags: ["sorti", "architecture", "sitebay"]
published: 2026-06-04
weight: 30
---

# How Sorti Works

Sorti works by keeping the app, the agent, and SiteBay services connected
inside one live session.

At a high level:

1. The Sorti app opens a session and joins a LiveKit room.
2. The Sorti agent joins the same room.
3. The app sends user input, active site context, canvas selections, and
   workspace events.
4. The agent calls tools through SiteBay, first-party panels, MCP servers, or
   internal runtime tools.
5. The agent publishes responses, progress, panel resources, and state updates
   back to the app.

## Session context

Every Sorti session carries context. That context can include:

- The active site and provider type.
- The current canvas surface and URL.
- The last selected element or region on the page.
- Available tools and specialists.
- Open panels and panel state.
- Recent user turns, agent responses, tasks, and tool activity.
- Editor or VS Code bridge context when connected.

This context is what lets the agent answer "change this heading" or "audit this
page" without asking the user to restate every detail.

## Tools

The agent acts through tools. Tools are grouped by capability, such as tasks,
tool search, image inspection, execute-agent missions, ask-user prompts,
routine drafts, site memory, analytics, canvas actions, MCP resources,
specialists, Git, and SiteBay Git.

Some tools are internal to Sorti. Others come from SiteBay APIs or MCP servers.
The important rule is that actions are typed and explicit: a site edit, panel
action, analytics query, or mission request is a tool call, not an invisible
chat side channel.

## Direct action or mission

Sorti has two common ways to act:

- Direct action for small, clear operations. Canvas edits such as changing copy,
  patching a selected section, inserting content, or navigating a page can use
  the canvas tool directly.
- Mission for complex site-changing work. Multi-step work can go through
  `execute_agent`, where Sorti creates a plan, asks for confirmation, tracks
  progress, and verifies the result.

This split keeps simple edits fast while preserving review and confirmation for
larger changes.

| User request | Better route | Why |
|---|---|---|
| "Change this headline" | Direct canvas action | The target is local and visible. |
| "Add a page next to this menu item" | Direct canvas action or small mission | The selected anchor gives context. |
| "Redesign the homepage" | Mission | The work is multi-step and site-changing. |
| "Explain this analytics spike" | Tool call plus answer | The user needs analysis, not a site mutation. |
| "Run a security scan" | Panel or security tool | The result belongs in a durable surface. |

## Specialists

Specialists are scoped agent roles. A specialist can focus on a domain such as
analytics, canvas work, Git, security, or a co-op bridge.

Specialists are not separate apps. They are routing and instruction surfaces
inside the agent system. The main assistant can hand work to a specialist when
the task benefits from focused tools or domain rules.

## Events back to the app

The app does not wait for a single final answer to understand what happened.
The agent publishes events during the session, including:

- Agent responses and streamed tokens.
- Status and activity updates.
- User transcript echoes for panel-originated turns.
- Mission task updates.
- Panel resources and notifications.
- Canvas interaction and context snapshots.
- Tool usage, checkpoints, and memory status.

The app uses those events to keep the transcript, workspace, panels, and
progress surfaces current.

## Failure boundaries

Sorti is easiest to debug when failures stay on the right side of the boundary:

- If a panel button hangs, check the panel runtime, host bridge, and
  `ui_mcp_proxy` path.
- If the agent chose the wrong action, check tool descriptions, active context,
  and specialist routing.
- If a canvas edit fails, check the provider-specific canvas contract.
- If a BYO server cannot call a tool, check server ownership and cross-server
  grants before changing panel code.

## The working rule

Sorti is most reliable when each piece owns its responsibility:

- The app owns the visible workspace.
- The agent owns reasoning, tool choice, and orchestration.
- SiteBay owns account, site, and canvas backend services.
- MCP servers own their external tool and panel contracts.
- The shared contract package owns the message shapes that cross boundaries.
