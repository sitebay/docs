---
title: "What Sorti Is"
description: "An overview of Sorti as the SiteBay agent workspace."
tags: ["sorti", "sitebay", "ai"]
published: 2026-06-04
weight: 20
---

# What Sorti Is

Sorti is the SiteBay agent workspace: a place to talk with an assistant,
inspect a live site, run tools, open panels, and coordinate larger site work.

It is not only a chat box. The chat is the command surface, but the workspace
also includes a site canvas, panels, mission progress, specialist routing, and
live SiteBay context.

## What you can do with Sorti

Use Sorti to:

- Ask questions about the active site, recent work, analytics, files, Git state,
  and security posture.
- Make targeted canvas edits from the page you are viewing.
- Run larger multi-step missions with a plan, confirmation, progress updates,
  and verification.
- Inspect PostHog analytics, Git history, diffs, file activity, artifacts,
  security scans, and WordPress AI helpers through panels.
- Connect external MCP servers that expose their own tools, panels, and
  specialists.
- Work with domain-specific or co-op bridges, such as STS2, when those bridges
  expose the Sorti-compatible contract.

## The main surfaces

The Sorti app is the user-facing cockpit. It renders the assistant
conversation, the workspace tabs, the live canvas, and panels.

The Sorti agent is the worker behind the conversation. It joins the same
session, receives user intent, calls tools, routes work to specialists or
missions, and publishes events back to the app.

SiteBay provides the account and site backend. It supplies active site data,
canvas sessions, SiteBay API access, LiveKit session tokens, model provider
contracts, WordPress and Shopify actions, and related platform services.

MCP servers extend what Sorti can do. First-party and BYO MCP servers expose
tools and panels in a portable shape so Sorti can host them without special UI
wiring for every integration.

## What makes Sorti different

Sorti keeps conversation and action in the same loop. When you select something
on the canvas, the agent can see that context. When a tool changes the site, the
UI can show progress and refresh the relevant surface. When a panel needs the
agent, it calls a tool that creates a real user turn in the main chat.

This model makes the assistant more practical for site work:

- The user can point at the site instead of describing every selector.
- The agent can choose small direct actions or larger confirmed missions.
- The UI can show the work, not only describe it.
- Panels can be simple status views or rich workflow surfaces without inventing
  separate protocols.

## What Sorti is not

Sorti is not a second SiteBay backend. SiteBay still owns account data, site
records, provider APIs, LiveKit tokens, and canvas backends.

Sorti is not a browser automation service. It opens and coordinates SiteBay
canvas sessions, then mirrors the resulting context into the assistant
workspace.

Sorti is not a pile of panel-specific chat commands. Panels call tools. If a
panel needs the assistant to respond, it calls `sorti.ask` and creates a visible
conversation turn.

## Common vocabulary

Canvas means the live site surface Sorti can inspect and edit.

Workspace means the app area that holds the canvas, panels, files, artifacts,
and other tabs.

Panel means an MCP App resource that renders UI and calls tools.

Mission means a multi-step site-changing job delegated through the
`execute_agent` flow.

Specialist means an agent role scoped to a domain, such as analytics, canvas
work, Git, security, or STS2.

BYO MCP means a user- or team-provided MCP server that Sorti can load through
the capability contract.
