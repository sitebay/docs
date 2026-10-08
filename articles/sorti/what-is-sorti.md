---
title: What is Sorti?
description: Understand Sorti applications, skills, missions, and documentation reads in the current assistant
  workspace.
tags:
- sorti
- sitebay
- ai
published: 2026-06-04
weight: 20
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- what sorti is
- sitebay documentation
slug: what-is-sorti
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-runtime
- sorti-panels
- sorti-canvas
- sorti-current-core
- sorti-current-app
- sorti-current-skills
- docs-knowledge
modified: 2026-10-08
---

Sorti is SiteBay's assistant workspace. It combines conversation with applications, panels, files, and visible task progress. Use it to inspect a system, request a defined change, and check the result in the same workspace.

## Choose the surface for the task

Use the conversation to describe the result. Select a page or element when the request concerns the canvas. Open an application's panel when you need to inspect its state or repeat an action through visible controls. Use an editor connection for source files and diagnostics.

The selected site, application, and environment are part of the request context. They do not replace authentication or the service's current permission checks. Check live versus staging before asking for a write.

## Separate apps, skills, and missions

An application exposes tools and resources through its service. A panel displays state and actions for that application. SiteBay's site app, an external MCP app, and the documentation reader are separate connections with different capabilities.

A skill provides reusable instructions. Shared collections organize the team's skills; the agent uses `read_skill` to load an applicable skill's body. Saving a skill does not install a missing tool or grant access to another service.

A mission records larger work, progress, decisions, and outcomes. It is not the same as a conversation message or an open panel. A pending approval or a paused attempt needs its own inspection before work can continue.

## Use references while you work

The documentation reader provides `search_docs` and `read_doc` with source citations. It can read SiteBay procedures and a separately selected upstream reference library. It does not execute the operations it describes.

Start with [Get started with Sorti]({{< relref "products/sorti/get-started/index.md" >}}), then use [Missions and approvals]({{< relref "sorti/missions-and-approvals.md" >}}), [Skills and collections]({{< relref "sorti/skills-and-collections.md" >}}), or [MCP connections]({{< relref "sorti/connect-mcp-services.md" >}}) for the task at hand.

## Check the outcome

A queued request, a completed tool call, a saved file, and a published deployment are different outcomes. Read the operation's result and verify the behavior that matters to the task. Opening a mission report does not start it, and stopping an attempt does not undo remote effects.

Choose a task in [Current Sorti workflows]({{< relref "sorti/current-workflows.md" >}}). Capabilities described here are checked against current source; a particular server may still require an update or a separate connection before exposing them.
