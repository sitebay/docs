---
slug: mcp-agent-intents
description: "Use SiteBay MCP agent intent tools for higher-level WordPress site operations."
keywords: ["mcp", "sitebay", "wordpress", "agent", "automation"]
license: "[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)"
published: 2026-04-28
modified: 2026-04-28
modified_by:
  name: SiteBay
title: "SiteBay MCP agent intent tools"
bible: true
tags: ["sitebay", "mcp", "ai"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# SiteBay MCP agent intent tools

Agent intent tools are higher-level SiteBay MCP tools for common WordPress operations. They reduce multi-step workflows into safer, structured actions an AI agent can call directly.

## Tools

| Tool | Use it for |
|---|---|
| `site_summary_full` | Get the site, team, staging, restore window, and execution-readiness snapshot. |
| `site_diagnose` | Run a read-only health check and get recommended actions. |
| `site_plugin_ensure` | Install, update, activate, or deactivate a plugin declaratively. |
| `site_content_apply` | Apply WordPress settings and page updates in one idempotent request. |
| `site_stage_promote` | Promote staging to live after explicit confirmation. |
| `site_restore_to_point` | Restore a live site to a timestamp or Dolt restore hash after explicit confirmation. |

## Example prompts

Ask for a diagnosis:

```text
Diagnose example.com and tell me the highest-priority fix.
```

Make a plugin state declarative:

```text
Make sure WooCommerce is installed and active on example.com.
```

Promote staging only after approval:

```text
Summarize the staging changes for example.com. If I approve, promote staging to live.
```

Restore safely:

```text
Find the restore point before my last content change on example.com and prepare a rollback plan.
```

The destructive tools require confirmation flags so the agent must present the action before promotion or restore.
