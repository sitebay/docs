---
slug: alias-frequently-used-commands
description: 'Create shell aliases for frequently used WordPress commands in SiteBay.'
keywords: ["WordPress", "alias", "command line", "SiteBay"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2024-12-04
modified_by:
  name: SiteBay
title: 'Alias Frequently Used Commands'
tags: ["sitebay"]
aliases: ['/quick-answers/sitebay/alias-frequently-used-commands/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Aliases create shortcuts for commands you use often.

## List Existing Aliases

```bash
alias
```

## Config File Locations

| Shell | File |
|-------|------|
| Bash | `~/.bashrc` |
| ZSH | `~/.zshrc` |
| fish | `~/.config/fish/config.fish` |

## Create Temporary Alias

```bash
alias wpRoot="cd /var/www/html/mysite.com"
```

## Remove Alias

```bash
unalias wpRoot
```

## Create Permanent Alias

Add to your shell config file:

```bash
alias wpUpdate="wp core update"
```

Apply changes:

```bash
source ~/.bashrc
```

## Common WordPress Aliases

```bash
alias wpUpdate="wp core update"
alias wpPlugins="wp plugin list"
alias wpThemes="wp theme list"
```

Aliases are environment-specific. Recreate them on new machines.
