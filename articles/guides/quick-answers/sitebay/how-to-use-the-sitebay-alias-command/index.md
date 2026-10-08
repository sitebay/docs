---
slug: how-to-use-the-sitebay-alias-command
description: 'Master time-saving techniques with the Linux "alias" command for creating customizable command shortcuts on SiteBay.'
keywords: ["sitebay alias command"]
aliases: ['/quick-answers/sitebay/how-to-use-the-sitebay-alias-command/']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-04-04
modified_by:
  name: SiteBay
published: 2024-04-17
title: Mastering Shortcuts with the Linux alias Command on SiteBay
title_meta: How to Utilize the Linux alias Command on SiteBay
tags: ["sitebay"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Navigating your SiteBay WordPress hosting environment efficiently is crucial for managing your websites effectively. One powerful yet underutilized feature within Linux, which forms the backbone of SiteBay's hosting, is the alias command. This guide illuminates how to leverage alias to create customizable shortcuts, saving you time and streamlining your workflow.

Unveiling Current Aliases

Linux systems often come with pre-set aliases. Discover them with:

alias


Here's an example output reflecting typical aliases:

alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'

Crafting Command Shortcuts

While unique alias names avoid conflicts, you can also intentionally overwrite existing command names with alias for convenience or to enforce specific options. For instance:

Redirect ls to ls -lah for detailed listings.
Swap top with htop for an enhanced system monitoring experience.

Use \\command to bypass an alias and execute the original command.

Creating Aliases: Temporary vs. Permanent
For a Session

Temporary aliases vanish with the session's end. To create one:

alias s='git status'


This example creates a shortcut s for git status.

For Persistent Use

Permanent aliases survive beyond the session. Embed them in your shell's configuration file (.bashrc, .zshrc, or ~/.config/fish/config.fish for Fish users).

Edit the file (~/.bashrc for Bash users) and add your aliases:

# Custom Aliases
alias update='sudo apt update && sudo apt upgrade'
alias cls='clear'


Activate new aliases without restarting your session:

source ~/.bashrc

Dissolving Aliases

Remove a specific alias:

unalias s


Or erase all aliases (including defaults):

unalias -a

Practical Alias Examples
Quick Directory Access: alias docs="cd ~/Documents"
Python Environment Setup:
alias venv="python3 -m venv env"
alias actv="source env/bin/activate"
Find Your IP: alias myip="curl ipinfo.io/ip"
Git Shortcuts:
alias gst="git status"
alias gdiff="git diff"
Embarking on Your Next Steps

With the alias command, you're equipped to streamline your SiteBay administrative tasks, enhancing productivity. For more detailed examples, including how to use arguments in aliases, refer to our extensive guides on managing Linux environments and customizing your SiteBay experience.