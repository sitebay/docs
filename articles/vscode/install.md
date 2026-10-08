---
title: Install the SiteBay Agent Bridge
description: Install the SiteBay Agent Bridge package supplied for your environment. Its extension identifier is
  sitebay.sitebay-agent-bridge.
tags:
- sitebay
- vscode
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- install the agent bridge
- sitebay documentation
slug: install
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- editor-bridge
modified: 2026-10-07
---

Install the SiteBay Agent Bridge package supplied for your environment. Its extension identifier is `sitebay.sitebay-agent-bridge`.

## Install a package

For a `.vsix` package, open the Command Palette, run **Extensions: Install from VSIX**, and select the trusted package. Reload the extension host if prompted.

Check the installed extension's publisher, identifier, and version. Desktop VS Code and a hosted code-server environment may use different distribution paths; the source manifest alone does not establish a public marketplace release.

## Connect

Open a workspace you trust and follow [Set up the bridge]({{< relref "vscode/setup.md" >}}). Do not place an API key in a repository or a shared settings file.

The [VS Code extension guide](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace) describes package installation and updates.
