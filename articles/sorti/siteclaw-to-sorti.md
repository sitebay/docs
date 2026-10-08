---
title: SiteClaw is now Sorti
description: Find the current product, setup guides, and implementation names when following older SiteClaw
  instructions.
slug: siteclaw-to-sorti
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- siteclaw is now sorti
- sorti
- sitebay documentation
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
weight: 15
---

SiteClaw is now called **Sorti**. Use Sorti for the assistant workspace and current setup instructions. Older links and screenshots may still use SiteClaw; the former product-guide URLs redirect to their Sorti replacements.

## Start with the current workflow

Read [Get started with Sorti]({{< relref "products/sorti/get-started/index.md" >}}) to inspect a workspace and request a first change. The current model separates the conversation, the selected site or app, and any work running as a mission.

| Older instruction | Current starting point |
| --- | --- |
| Open SiteClaw and ask it to change a site | [Work with your site in Sorti]({{< relref "sorti/work-with-your-site.md" >}}) |
| Let the assistant keep working | [Missions and approvals]({{< relref "sorti/missions-and-approvals.md" >}}) |
| Give the assistant reusable instructions | [Skills and collections]({{< relref "sorti/skills-and-collections.md" >}}) |
| Connect an MCP server | [Choose the MCP connection]({{< relref "sorti/connect-mcp-services.md" >}}) |
| Add a SiteClaw signal hook | [Session signals]({{< relref "products/sorti/signal-hooks/index.md" >}}) |
| Ask the assistant to read the documentation | [Documentation MCP]({{< relref "knowledge/read-with-mcp.md" >}}) |

## Keep names and identifiers separate

Use **Sorti** in titles, descriptions, and new instructions. Do not replace an API path, VS Code setting, package name, or stored identifier just because its spelling looks older than the product name.

The editor bridge still uses settings such as `sitebay.roomName` and `sitebay.serverUrl`. The site application identifies itself as `sitebay-mcp` and exposes the resource `ui://sitebay/site`. The documentation reader is a different service, named `sitebay-docs`. These identifiers have different jobs; renaming them in a configuration can break discovery.

A documentation redirect is not an account, database, or credential migration. Keep an existing connection's identity until the owning service provides a supported replacement. Use the [settings reference]({{< relref "vscode/settings.md" >}}) instead of translating an old screenshot into guessed keys.

## Check what is available

A page describes the implementation reviewed for that workflow. It does not mean every deployed server has the newest optional feature. For example, the team skill library can fall back to browsing on an older backend, and a saved mission report can be readable while its live controls are unavailable.

When an old instruction disagrees with the current screen, record the selected team, site, session, and unavailable action. Consult the [system map]({{< relref "knowledge/system-map.md" >}}) and the current tool schema before changing configuration.
