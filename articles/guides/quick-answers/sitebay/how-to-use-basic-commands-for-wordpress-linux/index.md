---
slug: how-to-use-basic-commands-for-wordpress-linux
description: These examples are ordinary shell commands.
keywords:
- sitebay
- WordPress
- Linux commands
- navigate directories
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-22
title: Navigate a WordPress workspace
tags:
- sitebay
- WordPress
- Linux
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- code-server
---

These examples are ordinary shell commands. They act on the filesystem visible to your current terminal, which may be a container or a managed workspace rather than the hosting node.

## Inspect before editing

```bash
pwd
ls -la
```

SiteBay's managed code-server source sets its workspace to `/home/coder/wordpress/wp-content`. Treat that as orientation, not a reason to create the path if it is missing. Open the intended site through its authenticated workspace link.

## Move through directories

```bash
cd -- themes
pwd
cd ..
```

Run these only when the current directory actually contains `themes`. `cd` by itself goes home; `cd -` returns to the previous location. The old literal example `cd ~ or cd` is not valid shell syntax.

## Work on a disposable example

```bash
mkdir -p -- "$HOME/shell-practice"
cd -- "$HOME/shell-practice" || exit 1
printf '%s\n' 'sample' > example.txt
cp -i -- example.txt example-copy.txt
mv -i -- example-copy.txt renamed.txt
cat -- renamed.txt
```

This creates and edits only the named practice files. `cp` and `mv` can overwrite a destination; interactive mode gives a prompt when applicable. `rm` deletes rather than moving a file to a desktop trash folder. Check the actual target and permissions before using the same operations in a site.
