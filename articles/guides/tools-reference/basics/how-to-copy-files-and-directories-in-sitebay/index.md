---
slug: how-to-copy-files-and-directories
description: Use cp to copy files in the selected Linux workspace. Confirm the source and destination before copying
  over an existing file.
keywords:
- linux
tags:
- linux
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-03-04
title: Copy files and directories
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
---

Use `cp` to copy files in the selected Linux workspace. Confirm the source and destination before copying over an existing file.

## Copy one file

```sh
cp -i -- "source.txt" "destination.txt"
```

The interactive option prompts before overwriting an existing destination. Keep quotes around paths that contain spaces.

## Copy a directory

```sh
mkdir -p -- "backup"
cp -a -- "theme/." "backup/"
```

This copies the directory's contents, including hidden files, into the destination and attempts to preserve attributes. Inspect the result and any errors; ownership preservation depends on your permissions.

## Verify

For a file, `cmp -- "source.txt" "destination.txt"` checks whether its bytes match. For a directory, inspect its important files and permissions before relying on the copy.

A file copy is not a WordPress database backup. For site recovery, keep both the application files and the database and use the documented recovery workflow.
