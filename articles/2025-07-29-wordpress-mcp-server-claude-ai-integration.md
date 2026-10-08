---
title: Connect an MCP client to SiteBay
date: 2025-07-29
tags:
- wordpress
- ai
- automation
- development
- mcp
hn_link: https://news.ycombinator.com/item?id=44705761
authors:
- SiteBay
contributors:
- SiteBay
description: An MCP connection lets a compatible client discover the SiteBay tools permitted for its credentials.
keywords:
- 'wordpress mcp server: bridging claude desktop and wordpress through ai'
- sitebay documentation
published: 2025-07-29
slug: 2025-07-29-wordpress-mcp-server-claude-ai-integration
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- mcp-platform
- api-auth
- wp-agent-plugin
modified: 2026-10-07
---

An MCP connection lets a compatible client discover the SiteBay tools permitted for its credentials. It is different from giving a client unrestricted access to WordPress or your machine.

## Configure the connection

Use the SiteBay MCP endpoint and authentication method supported by your client. Keep tokens in the client's credential store or environment rather than a checked-in JSON file. The available tools can differ by account, site, and deployment.

## Verify access

Connect and inspect the advertised tools. Start with a read-only request for the intended site. Check the returned site identifier and environment before allowing an edit.

An authentication failure, missing tool, or permission denial needs to be resolved at that boundary. Installing another bridge does not grant access automatically.

## Keep WordPress and hosting operations separate

A WordPress plugin integration acts within the WordPress installation. SiteBay's platform MCP exposes hosting and account workflows through its own API and authorization. Verify which server owns the requested action.

Use [MCP setup]({{< relref "products/mcp/get-started/index.md" >}}) for the maintained connection guide and [Agent intents]({{< relref "products/mcp/agent-intents/index.md" >}}) for scoped platform operations.
