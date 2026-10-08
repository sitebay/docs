---
slug: compress-files-using-the-command-line
description: tar collects files into an archive; gzip compresses that archive. Keep the output outside the input
  tree and use a private destination when the files contain customer data.
keywords:
- tar
- gzip
- file compression
- archive files
- SiteBay hosting
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Create and verify a compressed archive
tags:
- SiteBay
aliases:
- /quick-answers/sitebay/compress-files-using-the-command-line/
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

`tar` collects files into an archive; gzip compresses that archive. Keep the output outside the input tree and use a private destination when the files contain customer data.

## Create Archive

From a parent directory containing a disposable `practice` folder:

```bash
tar -czf practice.tar.gz -- practice/
tar -tzf practice.tar.gz
```

`-c` creates, `-z` selects gzip, `-f` names the archive and `-t` lists contents. `-v` adds verbose output, which can disclose filenames in shared logs.

## Extract to a separate location

```bash
mkdir -p -- extracted
tar -xzf practice.tar.gz -C extracted
```

Review an archive's entries and trust before extracting. Extraction can overwrite existing paths; use an empty destination owned by your account rather than a live document root. Do not use elevated privileges for an untrusted archive.

## Compression is not backup verification

Check the exit status, list the contents, and compare the extracted files with the originals. Ensure the archive includes the intended files, including any necessary dotfiles. A tar archive of `wp-content` does not automatically include the WordPress database.

Appending or deleting entries is not generally available on an already gzip-compressed archive. `tar -u` appends files that are newer than their archive copy; it is not a blanket “no overwrite” guarantee. Consult the installed tool's help for format-specific operations.
