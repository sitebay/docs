---
title: "SiteBay Agent Bridge"
description: "Use the headless VS Code bridge with Sorti sessions."
tags: ["sitebay", "vscode", "sorti"]
published: 2026-04-28
---

# SiteBay Agent Bridge

SiteBay Agent Bridge is a headless VS Code extension. It connects your workspace to the same Sorti session you use in SiteBay, then shares editor context and applies approved agent actions.

The extension does not add chat panels or avatars. Sorti and SiteClaw handle the interface; the bridge runs in VS Code so the agent can read diagnostics, understand the focused file, and apply file edits.

## What It Enables

- Share the focused file and selected code with Sorti.
- Let Sorti request diagnostics, symbols, file reads, and workspace search.
- Apply agent edits through VS Code workspace APIs.
- Restore checkpoints created during an agent session.
- Connect code-server workspaces to the active SiteBay session.

Next: [Install The Bridge](/articles/vscode/install/) or review [Bridge Commands](/articles/vscode/commands/).
