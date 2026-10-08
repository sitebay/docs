---
title: How Sorti works
description: The app, agent, and connected services exchange input, tool results, and state within a session.
tags:
- sorti
- architecture
- sitebay
published: 2026-06-04
weight: 30
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- how sorti works
- sitebay documentation
slug: how-sorti-works
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-runtime
- sorti-canvas
modified: 2026-10-07
---

The app, agent, and connected services exchange input, tool results, and state within a session.

## Request flow

1. The app supplies the user request and current workspace context.
2. The agent selects an available tool or delegates scoped work.
3. The owning service checks the request and performs the operation.
4. Results and events update the conversation, panels, and task state.
5. The result is checked against the requested outcome.

Session context can include the active site, provider, page, selection, open panels, and editor connection. Context helps identify the target; it does not replace authorization or a current revision check.

## Direct actions and larger work

A focused request can use a direct tool call. Work spanning several steps can use a mission with a plan, progress, and verification. The requested action and applicable permissions determine the route; a friendly name for a task does not make it read-only.

Specialists provide focused instructions and tools for a domain. They operate inside the same system rather than acting as independent authorizations to change a site.

## Results and failures

A queued operation, accepted request, completed tool call, saved artifact, and published deployment are different states. Report the state actually returned by the owning service.

When an outcome is uncertain, read the original operation status or receipt before retrying. Preserve the site, session, operation ID, and relevant error when escalating.

See [Panels and MCP]({{< relref "sorti/panels-and-mcp.md" >}}) for UI actions and [Canvas and workspace]({{< relref "sorti/canvas-and-workspace.md" >}}) for site context.
