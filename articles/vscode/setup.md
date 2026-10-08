---
title: "Set Up The Agent Bridge"
description: "Connect VS Code to a SiteBay Sorti session."
tags: ["sitebay", "vscode", "sorti"]
published: 2026-04-28
---

# Set Up The Agent Bridge

Run `SiteBay: Set API Key` from the command palette. The key is stored in VS Code SecretStorage.

After the key is saved, the bridge can connect in three ways:

- SiteBay code-server provisioning writes the active room name automatically.
- You set `sitebay.roomName` in workspace settings.
- You run `SiteBay: Connect to Session` and paste a Sorti connection code.

When connected, the SiteBay status item appears in the VS Code status bar.

## Auto-Connect

`sitebay.autoConnect` is enabled by default. If credentials and a room name are available when VS Code starts, the bridge connects automatically.

Turn it off when you want to connect only by command palette.
