---
slug: delete-file-command-line
description: rm removes filesystem entries; it does not move them to a desktop recycle bin.
keywords:
- remove files
- delete files
- SiteBay rm
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-03
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Delete only the intended files
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

`rm` removes filesystem entries; it does not move them to a desktop recycle bin. Recovery requires an available, verified backup and is not guaranteed by the presence of a Time Machine tab.

## Inspect first

```bash
pwd
ls -ld -- ./practice/example.txt
```

The path must be the file you intend to remove. A wildcard is expanded by the shell before `rm` runs, and a different working directory changes what it matches.

## Delete an explicit practice file

```bash
rm -i -- ./practice/example.txt
```

`-i` requests confirmation. `--` stops option parsing, so an option-like filename is not interpreted as a command flag. Use `rmdir` for an empty directory when recursive deletion is not needed. Avoid adding `-f` simply to hide an unexpected error.

## Preview a cleanup selection

```bash
find ./practice -type f -name '*.tmp' -mtime +28 -print
```

GNU find counts completed 24-hour periods for `-mtime`; check the boundary against your retention requirement. Review the selected list before authorizing deletion, and use a stable directory rather than a wildcard search root. Concurrent file changes can invalidate a previous preview.

Deleting a plugin directory can leave WordPress database state behind. Use the plugin's supported uninstall procedure when that is the actual task, and take a recovery point before a production change.
