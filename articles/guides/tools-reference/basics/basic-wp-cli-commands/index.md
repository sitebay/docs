---
slug: basic-wp-cli-commands
description: Use WP-CLI from the selected site's terminal. Identify the WordPress installation before running a
  command.
keywords:
- wp cli
- shell
- wp commands
tags:
- wp-cli
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-03-04
title: Basic WP-CLI commands
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- wp-cli
- wp-cli-inspect
---

Use WP-CLI from the selected site's terminal. Identify the WordPress installation before running a command.

## Set the target

Set `WP_ROOT` to the actual WordPress directory in this workspace. Do not copy a path from a different site.

```sh
: "${WP_ROOT:?Set the target WordPress directory}"
wp --path="$WP_ROOT" core version
wp --path="$WP_ROOT" option get home
wp --path="$WP_ROOT" plugin list
wp --path="$WP_ROOT" theme list
```

These commands inspect the installation and help confirm the target.

## Make an authorized change

The following examples change WordPress state. Replace the user or plugin slug, test in staging, and verify the result before using them on a live site.

```sh
wp --path="$WP_ROOT" user set-role example-user editor
wp --path="$WP_ROOT" plugin install akismet
wp --path="$WP_ROOT" plugin activate akismet
```

Installing and activating are separate operations. A plugin can require additional configuration afterward.

For a password change, use WordPress's reset flow or a controlled interactive prompt rather than putting a password in shell history:

```sh
wp --path="$WP_ROOT" user update example-user --prompt=user_pass
```

Do not record a terminal session containing secrets. Read the [WP-CLI command reference](https://developer.wordpress.org/cli/commands/) before using a command that deletes or replaces data.
