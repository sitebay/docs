---
title: "Install The Agent Bridge"
description: "Install SiteBay Agent Bridge from a VSIX."
tags: ["sitebay", "vscode"]
published: 2026-04-28
---

# Install The Agent Bridge

Install the SiteBay Agent Bridge VSIX in VS Code or code-server.

```bash
code --install-extension sitebay-agent-bridge-0.3.0.vsix
```

In code-server, use the Extensions view or the matching `code-server --install-extension` command.

## Before You Start

- Use VS Code 1.85 or newer.
- Keep the extension installed in the workspace where Sorti should operate.
- Do not install a stale VSIX if SiteBay provides a newer one.

After installing, open [Setup](/articles/vscode/setup/) to connect the bridge to SiteBay.
