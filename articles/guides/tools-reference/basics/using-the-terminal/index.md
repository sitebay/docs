---
slug: using-the-terminal
description: The terminal runs commands in the environment attached to the selected workspace. Check the target
  before inspecting or changing files.
keywords:
- Linux terminal
- terminal HOWTO
- SiteBay terminal tutorial
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases:
- /networking/ssh/using-the-terminal/
- /tools-reference/tools/using-the-terminal/
- /tools-reference/ssh/using-the-terminal/
- /using-sitebay/using-the-terminal/
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Use the site terminal
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- code-server
---

The terminal runs commands in the environment attached to the selected workspace. Check the target before inspecting or changing files.

## Locate the work

```sh
pwd
ls -la
```

Confirm the site and environment through the workspace as well. A familiar directory name is not enough to identify a production site.

## Run a small command

Start with a read-only command. Quote paths and variable values, especially when they can contain spaces. Read the output and exit status before chaining more operations.

Use `command --help` or the relevant manual to check an unfamiliar option. Do not paste a downloaded shell script into the terminal without reviewing its source.

## Protect data

File deletion, redirects, imports, and recursive permission changes can affect more than the current page. Confirm the exact paths and keep a recoverable copy before changing data. Do not put passwords or tokens into commands that will be saved in history.

Continue with [WP-CLI basics]({{< relref "guides/tools-reference/basics/basic-wp-cli-commands/index.md" >}}) or [Copy files]({{< relref "guides/tools-reference/basics/how-to-copy-files-and-directories-in-sitebay/index.md" >}}).
