---
slug: playwright-mcp-chrome-extension
author:
  name: SiteBay
  email: support@sitebay.org
title: Connect Playwright MCP to a browser
description: Playwright MCP exposes browser actions to an MCP client. Extension mode connects to a running Chrome
  or Edge browser through the Playwright extension.
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- setting up a playwright mcp server with chrome extension support
- sitebay documentation
published: 2025-03-26
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- playwright-mcp
modified: 2026-10-07
---

Playwright MCP exposes browser actions to an MCP client. Extension mode connects to a running Chrome or Edge browser through the Playwright extension.

## Configure the client

Install the extension through the distribution linked by the [official project](https://github.com/microsoft/playwright-mcp). Review its permissions. A typical MCP server configuration for extension mode is:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--extension"]
    }
  }
}
```

Use the configuration format required by your client. For a repeatable environment, replace `latest` with a version you have tested and approved.

## Connect a test session

Use a separate browser profile with only the accounts needed for the task. Follow the extension's connection prompt and verify the selected tab before allowing automation.

## Check the boundary

Browser automation can act with the session's logged-in permissions. Start with a read-only inspection; review form submissions, purchases, account changes, and destructive actions separately.

Do not publish extension tokens or session data. Disconnect the browser when the task is complete.
