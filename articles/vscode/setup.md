---
title: Set up the Agent Bridge
description: Connect the editor to the intended SiteBay session before allowing assisted changes.
tags:
- sitebay
- vscode
- sorti
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- set up the agent bridge
- sitebay documentation
slug: setup
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- editor-bridge
- api-auth
modified: 2026-10-07
---

Connect the editor to the intended SiteBay session before allowing assisted changes.

## Configure the connection

1. Open a trusted workspace with the bridge installed.
2. Check `sitebay.serverUrl`; the default is `https://my.sitebay.org`.
3. Run **SiteBay: Set API Key** and supply the appropriate credential.
4. Run **SiteBay: Connect to Session** for the intended session.
5. Verify the selected workspace and connection before requesting an edit.

The bridge obtains a LiveKit token through the backend. Leave `sitebay.livekitUrlOverride` empty unless you are configuring a known alternate environment.

## Optional local tools

Local stdio MCP access is disabled by default. Enabling `sitebay.mcpProxy.enabled` also requires workspace trust. Review each configured server command before enabling it.

See [Settings]({{< relref "vscode/settings.md" >}}) for the exact keys.
