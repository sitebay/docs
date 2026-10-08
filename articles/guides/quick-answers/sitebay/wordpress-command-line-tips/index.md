---
slug: wordpress-command-line-tips
description: 'WP-CLI tips for SiteBay.'
keywords: ["terminal", "command line", "wp", "cli"]
aliases: ['/quick-answers/sitebay/sitebay-command-line-tips/','/quick-answers/sitebay-command-line-tips/']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-13
modified: 2025-12-04
modified_by:
  name: SiteBay
title: 'WP-CLI Tips'
tags: ["sitebay"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# WP-CLI Tips

Use in Code Server terminal (Ctrl+`).

## Navigation

| Key | Action |
|-----|--------|
| ↑ | Previous command |
| TAB | Autocomplete |
| Ctrl+C | Stop process |
| Ctrl+A | Start of line |
| Ctrl+E | End of line |
| Ctrl+W | Delete word before cursor |
| Ctrl+U | Clear line |

## Common Commands

```bash
# List plugins
wp plugin list

# Install and activate plugin
wp plugin install query-monitor --activate

# Deactivate plugin
wp plugin deactivate query-monitor

# Update all plugins
wp plugin update --all

# Clear cache
wp cache flush
```
