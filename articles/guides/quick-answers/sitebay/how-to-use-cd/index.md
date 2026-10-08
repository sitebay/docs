---
slug: how-to-use-cd
description: cd changes the current directory of the shell. Start with pwd instead of assuming every WordPress installation
  lives under /var/www/html.
keywords:
- sitebay
- how to
- cd
- change directory
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-08
modified_by:
  name: SiteBay
published: 2024-04-22
image: UseTheCDCommand.png
title: Change directories with cd
tags:
- sitebay
aliases:
- /quick-answers/sitebay/how-to-use-cd/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- code-server
---

`cd` changes the current directory of the shell. Start with `pwd` instead of assuming every WordPress installation lives under `/var/www/html`.

## Basic Usage

```bash
pwd
cd -- "$HOME"
cd -- 'folder with spaces'
```

The last example needs an existing directory of that name. Quoting preserves spaces as part of one argument; `--` separates options from a name that might begin with a hyphen.

## Shortcuts

| Command | Result |
|---|---|
| `cd ..` | Parent of the current directory |
| `cd` or `cd ~` | Home directory |
| `cd -` | Previous directory, when available |
| `pwd -P` | Show the physical path after resolving symbolic links |

## Logical and physical paths

Bash supports `cd -L` for logical traversal and `cd -P` for physical traversal. Choose the traversal mode you need. A symlink can make the logical path differ from the underlying filesystem path.

## Stop when navigation fails

```bash
cd -- "$HOME/project" && pwd
```

Use `&&` or explicit error handling before a command that must run in that directory. A failed `cd` followed by deletion or extraction can target the previous directory. Inside SiteBay code-server, verify the opened site's workspace and whether it is live or staging before editing.
