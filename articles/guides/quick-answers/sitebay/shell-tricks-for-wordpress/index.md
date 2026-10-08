---
slug: shell-tricks-for-wordpress
title: Use WP-CLI with explicit scope
description: Start with inspection commands and a verified WordPress path. Shell access to a workspace is not permission
  to upgrade every plugin or rewrite a live database.
keywords:
- wp-cli
- shell
- wordpress
- command line
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
authors:
- SiteBay
contributors:
- SiteBay
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
doc_sources:
- shell-reference
- wp-cli
- lifecycle
- git-sync
---

Start with inspection commands and a verified WordPress path. Shell access to a workspace is not permission to upgrade every plugin or rewrite a live database.

## Read the current installation

```bash
wp --info
wp core version
wp plugin list --fields=name,status,version,update --format=table
wp theme list --fields=name,status,version --format=table
```

Run in the intended installation or use its explicit `--path`. A multisite also requires the intended site context. A missing command or authentication error is not a reason to use `--allow-root` or another site's database.

## Make a private recovery export

`wp db export` supports an explicit output path. Store the file outside the web-served directory, check its exit status, and preserve the recovery handle. Do not chain a failed backup into an upgrade command using `;`.

## Preview a URL replacement

```bash
wp search-replace 'https://old.example' 'https://new.example' --skip-columns=guid --dry-run
```

This is a preview for the tables selected by WP-CLI; it does not write the replacement. Review the exact old/new values, affected tables and serialization behavior before approving a real migration. Do not add `--all-tables` to a shared database merely to obtain more matches.

## Use only supported dry runs

Not every WP-CLI subcommand implements `--dry-run`. Check `wp help <command>` rather than assuming a universal safety switch. Update an explicitly selected plugin or theme on a test copy, then verify site behavior. A successful command and a cache flush are not substitutes for testing the application.
