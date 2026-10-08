---
title: Find the procedure for a task
description: Choose the owning workflow, read its prerequisites, and verify the outcome.
slug: task-map
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- find the procedure for a task
- sitebay documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-knowledge
- sorti-runtime
- lifecycle
- sorti-current-core
- sorti-current-skills
---

Choose the task, not the nearest product name. A saved file, a site restore, and a deployed release require different checks.

## Site operations

| Task | Procedure | Verify |
| --- | --- | --- |
| Create a site | [SiteBay setup]({{< relref "guides/get-started/getting-started-with-site-bay/index.md" >}}) | Team, site identity, and readiness |
| Change site files | [Code-server workspace]({{< relref "products/code-server/get-started/index.md" >}}) | Live or staging target and saved output |
| Deploy a repository | [Git sync]({{< relref "products/git-sync/get-started/index.md" >}}) | Repository, revision, and deployment result |
| Recover a site | [Time Machine]({{< relref "products/time-machine/get-started-with-pit-machine/index.md" >}}) | Recovery point, file/database scope, and application behavior |
| Change access or billing | [Teams and billing]({{< relref "products/platform/teams-and-billing/index.md" >}}) | Owner permissions, selected team, and provider receipt |
| Inspect vulnerabilities | [Security scanning]({{< relref "guides/security/vulnerabilities/scanning-your-wordpress-site-for-malware/index.md" >}}) | Completed scan and affected versions |

## Sorti development

| Task | Start with | Owning source |
| --- | --- | --- |
| Understand request execution | [How Sorti works]({{< relref "sorti/how-sorti-works.md" >}}) | `apps/sorti-agent` and shared contracts |
| Build a panel | [Forge workflow]({{< relref "sorti/forging-panels.md" >}}) | Canonical Forge skill and panel packages |
| Connect an MCP application | [BYO-MCP contract]({{< relref "mcp/byo-mcp.md" >}}) | MCP client, session extensions, and capabilities |
| Inspect canvas context | [Canvas and workspace]({{< relref "sorti/canvas-and-workspace.md" >}}) | Active page, site, selection, and workspace |
| Test a panel | [Panel testing]({{< relref "sorti/testing-sorti-panels.md" >}}) | Actual renderer and interaction checks |

## Agent reading sequence

Call `search_docs` with a concrete task and keep the default `sitebay` source. Read a returned ID with `read_doc`; follow `next_line` when the procedure continues. Cite the source path, revision, and lines. Inspect the current owning code and live tool schema before proposing a write.

Use `source: "linode"` for external references. An Akamai provisioning procedure does not apply to a SiteBay site just because both guides mention WordPress or PostgreSQL.

## Current Sorti procedures

| Task | Procedure |
| --- | --- |
| Find the current Sorti procedure | [Current workflows]({{< relref "sorti/current-workflows.md" >}}) |
| Inspect a mission or pending approval | [Missions and approvals]({{< relref "sorti/missions-and-approvals.md" >}}) |
| Organize shared team skills | [Skills and collections]({{< relref "sorti/skills-and-collections.md" >}}) |
| Choose a documentation or product MCP connection | [MCP connections]({{< relref "sorti/connect-mcp-services.md" >}}) |
| Decide where pgvector belongs | [Service ownership]({{< relref "knowledge/service-ownership.md" >}}) |
