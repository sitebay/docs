---
slug: compress-files-using-the-command-line
description: "Archive and compress files with tar and gzip on SiteBay."
keywords: ["tar", "gzip", "file compression", "archive files", "SiteBay hosting"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2024-12-04
modified_by:
  name: SiteBay
title: "Compress Files with Command Line"
tags: ["SiteBay"]
aliases: ['/quick-answers/sitebay/compress-files-using-the-command-line/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Use `tar` and `gzip` to archive and compress files.

## Create Archive

```bash
tar -cvf myfolder.tar myfolder/
```

## Compress with gzip

```bash
gzip myfolder.tar
```

Result: `myfolder.tar.gz`

## One-Step Archive + Compress

```bash
tar -czvf myfolder.tar.gz myfolder/
```

## Extract

```bash
tar -xzvf myfolder.tar.gz
```

## Common Flags

| Flag | Purpose |
|------|---------|
| `-c` | Create archive |
| `-x` | Extract archive |
| `-v` | Verbose output |
| `-z` | Use gzip compression |
| `-f` | Specify filename |

## Other Options

| Flag | Purpose |
|------|---------|
| `-t` | List contents |
| `-r` | Append to archive |
| `-u` | Update (no overwrite) |
| `--delete` | Remove from archive |

Run `man tar` for full documentation.
