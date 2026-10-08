---
slug: get-started-mcp
description: "Give your AI agents the keys to the server. The SiteBay MCP server enables direct infrastructure control for Claude and other LLMs."
keywords: ['mcp', 'claude', 'anthropic', 'wordpress management', 'ai agent', 'automation']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-12
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "SiteBay MCP Server: AI Infrastructure Control"
bible: true
tags: ["sitebay", "mcp", "ai", "claude"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# SiteBay MCP Server: AI Infrastructure Control

Clicking through dashboards is legacy behavior. The **Model Context Protocol (MCP)** is an open standard that allows AI agents, like Anthropic's Claude, to interact directly with external APIs and data. 

We built the **SiteBay MCP Server** to give your AI assistants a deep, programmatic connection directly into your WordPress infrastructure. You don't tell the agent *how* to do something; you tell it *what* you want done, and the agent orchestrates the underlying API calls to make it happen.

## The Power of Intent-Based Management

Instead of opening an SSH terminal, finding the right directory, and looking up a WP-CLI command, you just open Claude Desktop and say:

> *"Check the PostHog logs for mysite.com. If there are any PHP fatal errors from the new plugin we just installed, disable the plugin and restore the database to how it was 10 minutes ago."*

The agent handles the investigation, executes the commands, and reports back.

## Core Capabilities

When you attach the SiteBay MCP Server to your agent, you grant it a massive toolbelt:

*   **Bare-Metal Execution (`sitebay_site_shell_command`):** The agent can drop into an interactive bash shell or execute any `wp-cli` command natively on your container.
*   **Surgical Code Edits (`sitebay_site_edit_file`):** The agent can read files from your `wp-content` directory, write complex regex search-and-replace blocks, and refactor your theme on the fly.
*   **Time Travel (`sitebay_backup_restore`):** Agents can autonomously trigger Point-in-Time restores if their automated tests fail.
*   **Analytics Proxy (`sitebay_posthog_proxy`):** Claude can query your raw PostHog analytics, summarizing session replays or identifying conversion bottlenecks.
*   **Fleet Management:** Spin up new staging sites, manage DNS records, and configure edge caching—all through conversation.

## Quick Installation

The fastest way to wire up Claude Desktop is using **Smithery**.

1.  Fire up your terminal.
2.  Run the installer:
    ```bash
    npx -y @smithery/cli install @sitebay/sitebay-mcp --client claude
    ```
3.  Drop in your SiteBay API key (grab one from your profile dashboard). 

### The Hacker Way (Manual Setup)

If you like to control your own `claude_desktop_config.json`, just point it at the `npx` package:

```json
{
  "mcpServers": {
    "sitebay": {
      "command": "npx",
      "args": ["-y", "@sitebay/sitebay-mcp"],
      "env": {
        "SITEBAY_API_KEY": "sk_live_your_token_here"
      }
    }
  }
}
```

The MCP Server effectively turns Claude into your personal DevOps engineer, available 24/7, with zero onboarding time required.
