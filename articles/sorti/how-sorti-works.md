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
- sorti-current-core
- sorti-current-app
- sorti-current-skills
- docs-knowledge
modified: 2026-10-08
---

Sorti separates the host application, agent runtime, and connected services. A session carries the conversation and workspace context; each service remains responsible for the operations and data it owns.

## Request flow

1. The app supplies the user request and the current workspace context.
2. The agent inspects available tools and loads a relevant skill when needed.
3. A direct operation uses its owning tool; larger scoped work can use a mission.
4. The owning service checks identity, permissions, and current state before executing a write.
5. Tool results and events update the conversation, panels, and mission records.
6. The result is verified against the requested outcome.

Context can include the active site, environment, page, selection, panel, and editor connection. Inspect that context instead of assuming every visible surface belongs to the same target.

## Applications own their state

An MCP connection can advertise tools and resources. An application manifest describes its identity and panel resources; the host discovers those declarations rather than copying product-specific operations into every screen.

For example, SiteBay's site application declares a state reader and an available-actions reader. The panel reflects the backend's current facts. A documentation MCP connection instead advertises bounded reference reads and no site-write tools.

Read [Work with your site]({{< relref "sorti/work-with-your-site.md" >}}) for that application's behavior and [MCP connections]({{< relref "sorti/connect-mcp-services.md" >}}) for the transport choices.

## Skills guide work; missions record it

Skills are instruction documents, not tool implementations. The available-skills list advertises names and descriptions; `read_skill` loads the body and provides continuation offsets for long instructions. Team collections organize shared skills and require the library's own write permissions.

A mission has a recorded status, plan progress, results, and potentially pending decisions. The read tool `mission_activity` helps distinguish work in progress from a blocked step, an owner decision, or a finished result. Controls address a specific execution attempt, not every task with a similar name.

See [Skills and collections]({{< relref "sorti/skills-and-collections.md" >}}) and [Missions and approvals]({{< relref "sorti/missions-and-approvals.md" >}}) for those workflows.

## Results and failures

An accepted request is not necessarily a completed operation. A source commit does not prove a deployment succeeded. A mission marked `completed_with_gaps` still has unmet items, and a control request marked `requested` has not necessarily settled.

When an outcome is uncertain, inspect the original operation or receipt before retrying. Preserve the site, session, mission or operation ID, and relevant error. Do not replay an operation merely to obtain a clearer message.

## Reference and storage boundaries

The documentation build produces pages, browser search files, and a source-line corpus. The reader can use that file directly, or an optional PostgreSQL index of the same revision. Its pgvector configuration belongs to the documentation service, not the Sorti app or SiteBay customer database.

Use the [system map]({{< relref "knowledge/system-map.md" >}}) to locate the owning source before editing. Indexed documentation identifies reviewed behavior; it does not certify which revision is running in a particular environment.
