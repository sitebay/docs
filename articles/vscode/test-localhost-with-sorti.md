---
title: Test localhost with Sorti and the editor bridge
description: Connect an isolated Playwright browser through the SiteBay editor bridge and verify a local page
  without publishing it.
slug: test-localhost-with-sorti
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- Sorti localhost
- Playwright MCP
- VS Code browser testing
- headless browser
- editor bridge
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- practical-editor-proxy
- playwright-mcp-primary
- vscode-host-primary
task:
  goal: Use the editor bridge to inspect a development page with an isolated Playwright browser.
  prerequisites: Confirm the extension host, trusted workspace, intended session, working development-server
    address, and required browser dependencies.
  effects: The enabled proxy can start configured local processes. Browser form submissions and other external
    effects need their own scope.
  verification: List the actual browser tools, open the intended address, check the title and heading, then
    perform the agreed interaction test.
---

Use the SiteBay Agent Bridge when Sorti needs browser access to a development server reachable from your editor. The bridge can start a configured local MCP server and relay its tools to the agent.

## Check where the browser will run

The MCP process starts alongside the extension host, not inside the remote assistant. In a remote editor workspace, that host may be a server or development container rather than your laptop. Confirm the host before choosing the page address; `localhost` refers to the machine running the browser process.

Open a trusted project with the bridge installed. Use **SiteBay: Set API Key**, then **SiteBay: Connect to Session** for the intended session. Check the connected workspace and site before allowing browser actions. The [bridge setup guide]({{< relref "vscode/setup.md" >}}) covers the initial connection.

Start the project's normal development server and verify its actual address. This tutorial uses `http://127.0.0.1:3000` as an example, not as a SiteBay default.

## Enable the local MCP proxy

Review the project and any configured executable before trusting it. The bridge requires both workspace trust and `sitebay.mcpProxy.enabled`; enabling only one is insufficient.

In VS Code's JSON settings, merge this key with the existing configuration:

```json
{
  "sitebay.mcpProxy.enabled": true
}
```

With no custom server catalog, the bridge currently offers Playwright through `npx -y @playwright/mcp@latest --isolated`. It starts the process on demand rather than when you save a setting.

The isolated browser profile is separate from your normal browsing profile. Do not expect your existing login cookies to be present. Install the Node and browser dependencies required by the selected Playwright version on the extension host.

## Configure a headless browser when needed

A server without a desktop can use a custom headless entry:

```json
{
  "sitebay.mcpProxy.enabled": true,
  "sitebay.mcpProxy.servers": [
    {
      "name": "playwright",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest", "--isolated", "--headless"],
      "description": "Inspect the development server in an isolated browser"
    }
  ]
}
```

This replaces the configured server list; retain other reviewed entries you still need. `@latest` matches the bridge's current default but can resolve to different versions over time. For a repeatable team setup, replace it with the exact version your team has tested.

The proxy passes an allowlisted environment to child processes. Add per-server environment values only when needed, and keep credentials out of committed settings. Server commands and arguments may appear in bridge logs, so do not put a token in the command line.

## Verify discovery before interacting

Ask:

> List the local browser tools available through this editor connection. Then open http://127.0.0.1:3000 and report the page title and visible heading. Do not submit forms or change files.

Use the actual address of your development server. If the page is unreachable, confirm that it is reachable from the extension host before changing the public site or opening an external port.

Next request one defined check:

> At a narrow viewport, inspect the contact-page button and report whether it stays inside the page. Capture the result. Do not submit the form.

An interaction test needs its own scope and test data. A browser connection does not make payment, deletion, or real-message actions harmless.

## Diagnose the failing layer

| Symptom | Check |
| --- | --- |
| No local browser advertised | Workspace trust, proxy setting, and the active bridge session |
| Unknown server | The exact name in `sitebay.mcpProxy.servers` |
| Process does not start | `npx` availability and the configured command on the extension host |
| Browser launch fails | Browser dependencies and whether headless mode is required |
| Page does not load | Development-server address and the host where it runs |

The bridge relays tool listing, tool calls, and notifications. Do not assume this proxy supports every MCP capability offered by another client. Disable the proxy when it is no longer needed, and inspect any already-running child process separately rather than assuming a settings change killed it.

The server flags are documented in the [Playwright MCP reference](https://github.com/microsoft/playwright-mcp). VS Code documents [extension hosts](https://code.visualstudio.com/api/advanced-topics/extension-host) and [workspace trust](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust) separately from the SiteBay bridge settings.
