---
title: Current Sorti workflows
description: Choose the current procedure for site edits, missions, skills, panels, and connected services.
slug: current-workflows
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- Sorti workflows
- site changes
- missions
- skills
- MCP connections
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-current-core
- sorti-current-app
- docs-knowledge
- sorti-current-skills
- editor-bridge
- current-platform-activation
weight: 15
---

Sorti is the assistant workspace for inspecting a system, requesting a defined task, and verifying the result. Choose the workflow that matches the outcome rather than treating every panel or connection as the same capability.

## Choose a task

| Outcome | Start here |
| --- | --- |
| Inspect the selected team, site, and environment | [Get started with Sorti]({{< relref "products/sorti/get-started/index.md" >}}) |
| Repair a saved staging page | [Fix a page on staging]({{< relref "sorti/fix-a-staging-page.md" >}}) |
| Check live changes and publish after approval | [Review a staging release]({{< relref "sorti/review-a-staging-release.md" >}}) |
| Inspect progress, approvals, or a stopped task | [Missions and approvals]({{< relref "sorti/missions-and-approvals.md" >}}) |
| Reuse team instructions | [Create a review skill]({{< relref "sorti/create-a-review-skill.md" >}}) |
| Build a panel with state and controls | [Build a counter with Forge]({{< relref "sorti/build-a-counter-panel.md" >}}) |
| Connect a reference reader or another application | [Choose the MCP connection]({{< relref "sorti/connect-mcp-services.md" >}}) |
| Test a local development page | [Test localhost through the editor]({{< relref "vscode/test-localhost-with-sorti.md" >}}) |
| React to a producer's events | [Session signals]({{< relref "products/sorti/signal-hooks/index.md" >}}) |

## Keep product names and connection identifiers separate

Use **Sorti** for the assistant. Keep the exact identifiers advertised by the owning service. The editor bridge uses settings including `sitebay.roomName` and `sitebay.serverUrl`. The site application identifies itself as `sitebay-mcp` and exposes `ui://sitebay/site`; the documentation reader is a separate service named `sitebay-docs`.

Those are working configuration names, not interchangeable product labels. Use the [settings reference]({{< relref "vscode/settings.md" >}}) and live tool schemas rather than guessing replacements. A documentation redirect does not migrate an account, credential, or database.

## Separate actions from evidence

A preview does not save a page. A saved staging fix does not publish live. A pending approval does not mean its tool has run. A mission's stopped attempt does not undo effects already issued to another service.

Keep the site, session, mission, and operation identifiers with the result. Inspect the original operation when its outcome is uncertain. [Recover an interrupted task]({{< relref "sorti/recover-an-interrupted-task.md" >}}) explains continuation without repeating unknown writes.

## Check which service is active

The current source includes both host-side interfaces and separately installed backend capabilities. Updating the Sorti client does not activate every server feature. A skill library can be readable when editing is unavailable; a saved mission can be readable while execution controls are disconnected.

The SiteBay router now includes the shared mission-runtime service and Forge domain routes. Shared mission access still needs the owning runtime installation. Forge custom domains need an enabled deployment and an installed provider; their DNS and publication actions are owner-reviewed and are not advertised as ordinary MCP tools. The existence of a route is not proof that the feature is enabled for an account.

These services do not use the documentation pgvector database as a mission ledger. Use the [system map]({{< relref "knowledge/system-map.md" >}}) to find each owner, then check the selected deployment and its current schema before acting.
