---
title: Agent Bridge settings
description: Configure the bridge through VS Code settings. Keep credentials in the dedicated API-key flow, not
  in a checked-in workspace file.
tags:
- sitebay
- vscode
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- agent bridge settings
- sitebay documentation
slug: settings
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- editor-bridge
modified: 2026-10-07
---

Configure the bridge through VS Code settings. Keep credentials in the dedicated API-key flow, not in a checked-in workspace file.

| Setting | Default | Purpose |
| --- | --- | --- |
| `sitebay.serverUrl` | `"https://my.sitebay.org"` | SiteBay backend URL. The bridge calls ${serverUrl}/f/api/v1/keys/livekit to mint a LiveKit token. Set to e.g. http://localhost:8000 for local dev. |
| `sitebay.livekitUrlOverride` | `""` | Optional LiveKit server URL override (e.g. ws://localhost:7880). When set, the bridge ignores the server_url returned by the token endpoint and connects here instead. Leave empty to use the backend-provided URL. |
| `sitebay.autoConnect` | `true` | Automatically connect to the agent when VS Code starts (requires API key) |
| `sitebay.roomName` | `""` | LiveKit room name to join (set by SiteClaw to sync editor with the active session) |
| `sitebay.environment` | `""` | Generated workspace environment metadata for the active SiteBay session, such as prod or stage |
| `sitebay.siteId` | `""` | Generated SiteBay site identifier for the active workspace |
| `sitebay.wpHome` | `""` | Generated WordPress home URL for the active workspace |
| `sitebay.mcpProxy.enabled` | `false` | Allow the SiteBay agent to use local stdio MCP servers (e.g. Playwright browser automation against localhost). Off by default; also requires workspace trust. |
| `sitebay.mcpProxy.servers` | `[]` | Local stdio MCP servers offered to the agent: `{ name, command, args, env?, description? }`. Empty = built-in default (`playwright` via `npx @playwright/mcp --isolated`). |

Generated environment, site, and WordPress URL values describe the active workspace. Do not copy them from another site. Local MCP servers are opt-in and require workspace trust.

[Troubleshoot a connection]({{< relref "vscode/troubleshooting.md" >}}).
