---
title: "Agent Bridge Troubleshooting"
description: "Fix common SiteBay Agent Bridge connection and edit issues."
tags: ["sitebay", "vscode", "troubleshooting"]
published: 2026-04-28
---

# Agent Bridge Troubleshooting

## Won't Connect

Check that the API key is saved, the active room name matches the Sorti session, and `sitebay.autoConnect` is enabled if you expect startup connection.

If the status item mentions LiveKit native bindings, reinstall the VSIX that matches your platform.

## Edits Do Not Apply

The bridge rejects paths outside the open workspace. Open the correct workspace folder, then retry the Sorti action.

## Checkpoint Restore Does Nothing

Restore requests are sent to the agent. Confirm the bridge is connected and the Sorti session is still active.

## DBCode Connection Missing

Reload VS Code after SiteBay writes the bridge config file and confirm the DBCode extension is installed.
