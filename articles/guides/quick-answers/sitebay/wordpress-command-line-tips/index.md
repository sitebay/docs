---
slug: wordpress-command-line-tips
description: Use the terminal for the selected site and check which WordPress installation WP-CLI will load.
keywords:
- terminal
- command line
- wp
- cli
aliases:
- /quick-answers/sitebay/sitebay-command-line-tips/
- /quick-answers/sitebay-command-line-tips/
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-13
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Practical WP-CLI checks
tags:
- sitebay
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- wp-cli
- lifecycle
- git-sync
---

Use the terminal for the selected site and check which WordPress installation WP-CLI will load. Browser keyboard shortcuts can be intercepted by the browser or operating system; use the editor's Terminal menu when needed.

## Inspect before changing

```bash
pwd
wp --info
wp core version
wp plugin list --fields=name,status,version --format=json
```

Structured output is useful for scripts. Keep diagnostic output separate from machine-parsed data and inspect the command's exit code rather than treating an empty result as success.

## Request command-specific help

```bash
wp help plugin update
wp help db export
wp help search-replace
```

A backup, plugin activation, database import and cache flush have different effects. Check their actual options; a dry-run flag is not supported universally.

## Choose a controlled change

Record the affected plugin/theme and desired version, create an appropriate recovery point, and test the smallest change first. Broad `--all` updates can combine unrelated compatibility changes and make a failure harder to diagnose. Do not place secret exports under publicly served uploads.

## Verify afterwards

Check the current versions, the relevant page, logs and application behavior. A site cache, browser cache and object cache are different layers. Clearing one does not prove a deploy or database migration succeeded. Use the site's guarded intent workflow when a restore or staging promotion requires explicit confirmation.
