---
title: Troubleshoot the Agent Bridge
description: Start with the extension's connection state and the workspace you intended to join.
tags:
- sitebay
- vscode
- troubleshooting
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- agent bridge troubleshooting
- sitebay documentation
slug: troubleshooting
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- editor-bridge
modified: 2026-10-07
---

Start with the extension's connection state and the workspace you intended to join.

## Cannot connect

Check the backend URL, API key, and selected session. Leave the LiveKit override empty for the backend-provided connection. Reconnect after correcting the setting; repeated requests do not repair an expired credential.

## The wrong files appear

Verify the workspace, site, environment, and session. Generated metadata such as `sitebay.siteId` and `sitebay.wpHome` should describe the active workspace, not a previous site.

## Local MCP tools are missing

Check workspace trust, `sitebay.mcpProxy.enabled`, and the server configuration. A configured command must exist in the editor's environment.

Use **SiteBay: Disconnect** to stop the bridge connection. Review [Commands]({{< relref "vscode/commands.md" >}}) before using a checkpoint restore, which changes workspace state.
