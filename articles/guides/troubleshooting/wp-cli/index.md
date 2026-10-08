---
slug: wp-cli-tutorial
author:
  name: SiteBay
  email: support@sitebay.org
description: Separate a missing executable, an incorrect WordPress target, and a WordPress bootstrap error before
  changing anything.
keywords:
- WP-CLI
- command line
- WordPress management
tags:
- wordpress
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-27
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Troubleshoot WP-CLI
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- wp-cli
- wp-cli-inspect
---

Separate a missing executable, an incorrect WordPress target, and a WordPress bootstrap error before changing anything.

## Check the environment

```sh
command -v wp
wp --info
: "${WP_ROOT:?Set the target WordPress directory}"
wp --path="$WP_ROOT" core version
wp --path="$WP_ROOT" option get home
```

Use the correct site workspace and PHP environment. A local command does not automatically target the hosted installation.

## Isolate a loading error

For a diagnostic read, `--skip-plugins --skip-themes` can bypass ordinary plugins and themes. Must-use plugins are still loaded. Do not treat this option as a permanent repair.

## Check core files

```sh
wp --path="$WP_ROOT" core verify-checksums
```

This compares core files with the checksums for the selected version and locale. It is not a complete scan of plugins, uploads, or database content.

## Record a useful error

Keep the command, exit status, relevant error, and target site. Redact credentials. Use `wp help <command>` to inspect arguments rather than repeatedly trying a mutation.

See [Basic commands]({{< relref "guides/tools-reference/basics/basic-wp-cli-commands/index.md" >}}).
