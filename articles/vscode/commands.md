---
title: Agent Bridge commands
description: Use these commands from the VS Code Command Palette.
tags:
- sitebay
- vscode
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- agent bridge commands
- sitebay documentation
slug: commands
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- editor-bridge
modified: 2026-10-07
---

Use these commands from the VS Code Command Palette.

| Command | Identifier |
| --- | --- |
| SiteBay: Set API Key | `sitebay.setApiKey` |
| SiteBay: Disconnect | `sitebay.disconnect` |
| SiteBay: Toggle Connection | `sitebay.toggleConnection` |
| SiteBay: Restore Checkpoint | `sitebay.restoreCheckpoint` |
| SiteBay: Connect to Session | `sitebay.connectSession` |

**Restore Checkpoint changes workspace state.** Inspect the checkpoint and current edits before using it. Disconnecting the editor is different from reverting files.

[Set up the connection]({{< relref "vscode/setup.md" >}}) before starting assisted work.
