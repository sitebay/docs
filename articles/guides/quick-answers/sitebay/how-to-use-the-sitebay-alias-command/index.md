---
slug: how-to-use-the-sitebay-alias-command
description: 'Create command shortcuts with the Linux alias command.'
keywords: ["sitebay alias command"]
aliases: ['/quick-answers/sitebay/how-to-use-the-sitebay-alias-command/']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-12-04
modified_by:
  name: SiteBay
published: 2024-04-17
title: Linux alias Command
tags: ["sitebay"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Create shortcuts for frequently used commands.

## View Current Aliases

```bash
alias
```

## Create Temporary Alias

```bash
alias s='git status'
```

Lasts until session ends.

## Create Permanent Alias

Add to `~/.bashrc` (or `~/.zshrc`):

```bash
alias update='sudo apt update && sudo apt upgrade'
alias cls='clear'
```

Apply changes:

```bash
source ~/.bashrc
```

## Remove Alias

```bash
unalias s        # Remove one
unalias -a       # Remove all
```

## Bypass Alias

Use backslash to run original command:

```bash
\ls    # Runs ls without alias
```

## Useful Examples

```bash
# Directory shortcuts
alias docs="cd ~/Documents"

# Git shortcuts
alias gst="git status"
alias gdiff="git diff"

# Python venv
alias venv="python3 -m venv env"
alias actv="source env/bin/activate"

# Utility
alias myip="curl ipinfo.io/ip"
```
