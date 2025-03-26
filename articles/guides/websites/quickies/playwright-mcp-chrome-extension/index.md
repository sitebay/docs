---
slug: playwright-mcp-chrome-extension
author:
  name: SiteBay
  email: support@sitebay.org
title: "Setting Up a Playwright MCP Server with Chrome Extension Support"
description: "A comprehensive guide to launching a Playwright MCP server with Chrome extension integration"
---

# Setting Up a Playwright MCP Server with Chrome Extension Support

## Prerequisites
- Node.js installed
- Playwright installed globally [Microsoft Playwright](https://github.com/microsoft/playwright-mcp)
- Chrome extension you want to use
- Claude Desktop or Cline/Roo

## Step 1: Launch Playwright Server with Chrome Extension

### Create Configuration File (config.json)
```json
{
  "headless": false,
  "args": [
    "--disable-extensions-except=./path/to/extension",
    "--load-extension=./path/to/extension"
  ],
  "userDataDir": "./my-profile"
}
```

### Launch Command
```bash
npx playwright@latest launch-server --browser chromium --config=config.json
```

## Step 2: Getting the WebSocket Endpoint
When you run the launch command, Playwright will output a WebSocket (WS) endpoint. It will look similar to:
```
ws://localhost:34143/49963c6a33d3f1d477555b60d045008d
```

## Step 3: Add to MCP Configuration
Update your MCP settings (typically in `cline_mcp_settings.json`) with the following configuration:
```json
{
  "mcpServers": {
    "playwright-server": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--vision"
      ],
      "env": {
        "PLAYWRIGHT_WS_ENDPOINT": "ws://localhost:34143/49963c6a33d3f1d477555b60d045008d"
      },
      "disabled": false
    }
  }
}
```

## Step 4: Downloading Chrome Extension

### Method 1: From Chrome Web Store
1. Open Chrome Web Store
2. Find the desired extension
3. Click "Details" 
4. Note the extension ID from the URL (e.g., `hdokiejnpimakedhajhdlcegeplioahd`)

### Method 2: Manually Extract from Chrome
1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Pack extension"
5. Select the extension folder
6. Chrome will generate `.crx` and `.pem` files

### Method 3: Download from GitHub/Source
1. Find the extension's source repository
2. Clone or download the repository
3. Use the extension folder directly

### Path Configuration Tip
Replace `./path/to/extension` in the `config.json` with the actual path to your extension folder.

## Additional Notes
- Ensure the extension is compatible with the Chrome version used by Playwright
- Some extensions may require additional configuration
- Test the extension manually first to verify functionality

## Troubleshooting
- Check WebSocket endpoint is correctly copied
- Verify extension path is correct
- Ensure Playwright and Chrome versions are compatible