---
slug: shell-tricks-for-wordpress
title: "Shell Tricks for WordPress"
description: "WP-CLI shell tricks for efficient WordPress management on SiteBay."
keywords: ['wp-cli', 'shell', 'wordpress', 'command line']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
authors: ["SiteBay"]
contributors: ["SiteBay"]
published: 2024-04-04
modified: 2024-12-04
modified_by:
  name: SiteBay
---

Useful WP-CLI commands and shell tricks for SiteBay.

## Batch Plugin Updates

```shell
wp plugin update --all
```

## Database Snapshot

```shell
wp db export pre-change-snapshot.sql
```

## Search-Replace for Migration

```shell
wp search-replace 'oldsite.com' 'newsite.com'
```

## Common Aliases

Add to `~/.bashrc`:

```bash
alias wpu="wp plugin update --all"
alias wpdb="wp db export backup-$(date +%Y%m%d).sql"
alias wpc="wp cache flush"
```

## Combine Commands

Update plugins and flush cache:

```shell
wp plugin update --all && wp cache flush
```

## Script Example

```bash
#!/bin/bash
# Pre-deploy backup
wp db export "backup-$(date +%Y%m%d-%H%M%S).sql"
wp plugin update --all
wp theme update --all
wp cache flush
```

## Tips

- Use `--dry-run` to preview changes
- Pipe output to `grep` for filtering
- Combine with Git hooks for automated deployments
