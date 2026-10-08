---
slug: alias-frequently-used-commands
description: An alias expands a command name in an interactive shell. Use it for a transparent shortcut, not to
  hide destructive actions behind a harmless-looking name.
keywords:
- WordPress
- alias
- command line
- SiteBay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Create useful Bash aliases
tags:
- sitebay
aliases:
- /quick-answers/sitebay/alias-frequently-used-commands/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- code-server
---

An alias expands a command name in an interactive shell. Use it for a transparent shortcut, not to hide destructive actions behind a harmless-looking name.

## List Existing Aliases

```bash
alias
type gst
```

`type` shows whether a name is an alias, function, builtin or executable. A command that works in one terminal may have a different definition in another.

## Create Temporary Alias

```bash
alias gst='git status --short'
alias gdiff='git diff --'
```

Enter the definition and usage on separate prompt lines. These aliases last for that shell session. Quoting keeps the intended replacement together.

## Create Permanent Alias

For interactive Bash, place reviewed definitions in `~/.bashrc`, then open a new terminal or source that file. Zsh and fish use their own startup files and syntax; do not paste a Bash configuration into another shell blindly. Avoid repeatedly appending the same definitions.

## Remove Alias

```bash
unalias gst
```

For shortcuts with arguments, use a function instead of expecting an alias to behave like a parameterized command. Avoid auto-update aliases that silently change WordPress, a database, or the operating system. Check the intended site and recovery point before those operations.
