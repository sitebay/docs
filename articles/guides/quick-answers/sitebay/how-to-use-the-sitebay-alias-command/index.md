---
slug: how-to-use-the-sitebay-alias-command
description: alias is a shell feature, not a SiteBay API operation. It affects the terminal in which it is defined;
  it does not register a remote agent tool or change another user's shell.
keywords:
- sitebay alias command
aliases:
- /quick-answers/sitebay/how-to-use-the-sitebay-alias-command/
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-17
title: Use and inspect shell aliases
tags:
- sitebay
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- code-server
---

`alias` is a shell feature, not a SiteBay API operation. It affects the terminal in which it is defined; it does not register a remote agent tool or change another user's shell.

## Define and inspect

```bash
alias gst='git status --short'
alias gst
type gst
```

Use single quotes when the alias should keep variable references or command substitutions unevaluated until use. For example, putting a date substitution inside double quotes evaluates it when the alias is defined, which can unexpectedly reuse a backup filename.

## Persist deliberately

Edit the startup file appropriate to the shell shown by your terminal. For interactive Bash, `~/.bashrc` is the usual location. Review the diff before sourcing it: sourcing a file executes its contents immediately.

## Bypass or remove

```bash
unalias gst
command ls
```

A backslash such as `\ls` prevents alias expansion, while `command` also helps bypass a shell function. Neither grants additional filesystem permissions. In a script, prefer explicit commands or defined functions rather than depending on someone's interactive aliases.

Do not create convenience shortcuts that run package upgrades or overwrite a database without making the action clear.
