---
slug: managing-your-staging-site-on-code-server
author:
  name: SiteBay
  email: support@sitebay.org
keywords: ["staging", "code server", "wordpress"]
description: 'Manage your WordPress staging site with Code Server.'
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-12-04
modified_by:
  name: SiteBay
published: 2024-04-04
title: Managing Staging with Code Server
show_on_frontpage: true
weight: 10
icon: "book"
---

Edit your staging site directly in the browser with Code Server.

## Access Staging

1. Log into [SiteBay dashboard](https://my.sitebay.org)
2. Go to your site → **Staging** tab
3. Click **Code Server**

## Directory Structure

| Directory | Purpose |
|-----------|---------|
| `/bitnami/stagewordpress` | Staging root |
| `/bitnami/stagewordpress/wp-content/themes` | Themes |
| `/bitnami/stagewordpress/wp-content/plugins` | Plugins |
| `/bitnami/stagewordpress/wp-content/uploads` | Media |

## Common WP-CLI Commands

```bash
# List plugins
wp plugin list --path=/bitnami/stagewordpress

# Update all plugins
wp plugin update --all --path=/bitnami/stagewordpress

# Export database
wp db export backup.sql --path=/bitnami/stagewordpress

# Search-replace URLs
wp search-replace 'old-url.com' 'new-url.com' --path=/bitnami/stagewordpress
```

## Workflow

1. Edit theme files in `/bitnami/stagewordpress/wp-content/themes/your-theme`
2. Save (Ctrl+S)
3. View staging site to verify
4. Deploy to production when ready

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Changes not appearing | Clear browser cache |
| WP-CLI errors | Verify `--path=/bitnami/stagewordpress` |
| Permission issues | Use `chmod` in terminal |
