---
slug: code-server-linux-commands
description: A code-server terminal sees the filesystem and process namespace available to that workspace. Standard
  directory names do not establish permission to edit host configuration.
keywords:
- linux
tags:
- linux
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-03-04
title: Linux commands in a managed workspace
deprecated: true
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- code-server
- wp-config
- shell-reference
- lifecycle
---

A code-server terminal sees the filesystem and process namespace available to that workspace. Standard directory names do not establish permission to edit host configuration.

## Inspect the current directory

```bash
pwd
ls -la
```

Check that the expected project files are present before navigating or editing. `cd` must succeed before a subsequent file operation; use `&&` or explicit error handling.

## Practice safely

Use a disposable directory for `mkdir`, `cp`, `mv`, archive and deletion examples. These commands can overwrite or remove data, and a file copy is not a WordPress database backup. Pass quoted filenames as arguments and check the exit status.

## Current procedure

[Open and verify a workspace]({{< relref "products/code-server/get-started/index.md" >}}) covers the launch grant, actual path, extensions and completion checks. For command examples, see [workspace navigation]({{< relref "guides/quick-answers/sitebay/how-to-use-basic-commands-for-wordpress-linux/index.md" >}}) and [WP-CLI checks]({{< relref "guides/quick-answers/sitebay/wordpress-command-line-tips/index.md" >}}).
