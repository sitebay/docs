---
title: "Agent Bridge Settings"
description: "Settings reference for SiteBay Agent Bridge."
tags: ["sitebay", "vscode"]
published: 2026-04-28
---

# Agent Bridge Settings

| Setting | Default | Purpose |
|---|---:|---|
| `sitebay.serverUrl` | `https://my.sitebay.org` | SiteBay API base URL. |
| `sitebay.autoConnect` | `true` | Connect automatically when credentials are available. |
| `sitebay.roomName` | empty | LiveKit room name for the active Sorti session. |
| `sitebay.environment` | empty | Generated workspace environment metadata. |
| `sitebay.siteId` | empty | Generated SiteBay site id. |
| `sitebay.wpHome` | empty | Generated WordPress home URL. |

Most users should only set the API key. SiteBay and code-server provisioning normally write the room and workspace metadata.
