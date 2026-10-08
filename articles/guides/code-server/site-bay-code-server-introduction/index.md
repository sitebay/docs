---
slug: site-bay-code-server-introduction
author:
  name: SiteBay
  email: support@sitebay.org
keywords: ["code server", "vscode", "wordpress"]
description: 'Use VS Code in the browser to edit your WordPress site.'
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-12-04
modified_by:
  name: SiteBay
published: 2024-04-04
title: Code Server Introduction
show_on_frontpage: true
weight: 10
icon: "book"
---

Edit WordPress files with VS Code in your browser.

## Access

1. Log into [SiteBay dashboard](https://my.sitebay.org)
2. Select your WordPress site
3. Click **Code Server**

## Features

- Syntax highlighting (PHP, JS, CSS, HTML)
- Code completion for WordPress functions
- Built-in terminal for WP-CLI
- Git integration
- File tree navigation
- Search across files

## Pre-installed Extensions

- PHP IntelliSense
- WordPress Hooks IntelliSense
- WordPress Snippets
- ESLint & Prettier

## Directory Structure

| Path | Content |
|------|---------|
| `/bitnami/wordpress` | Live site |
| `/bitnami/stagewordpress` | Staging site |
| `wp-content/themes/` | Themes |
| `wp-content/plugins/` | Plugins |

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Quick file open | Ctrl+P | Cmd+P |
| Command palette | Ctrl+Shift+P | Cmd+Shift+P |
| Find in files | Ctrl+Shift+F | Cmd+Shift+F |
| Terminal | Ctrl+` | Cmd+` |
| Save | Ctrl+S | Cmd+S |

## Terminal Commands

```bash
wp core version --path=/bitnami/wordpress
wp plugin list --path=/bitnami/wordpress
wp theme list --path=/bitnami/wordpress
```

Changes to `/bitnami/wordpress` are applied immediately to your live site. Use staging for testing.
