---
slug: alias-frequently-used-commands
description: 'Learn how to streamline your WordPress management tasks in Site Bay using aliases for frequently used commands. This guide explains creating and removing aliases for efficiency.'
keywords: ["WordPress", "alias", "command line", "Site Bay"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2024-04-04
modified_by:
  name: Site Bay
title: 'Alias Frequently Used Commands in Site Bay'
tags: ["sitebay"]
aliases: ['/quick-answers/sitebay/alias-frequently-used-commands/']
authors: ["Site Bay"]
---
What is an Alias?

An alias in Site Bay simplifies your WordPress management by creating shortcuts for the commands you use most. It’s like having speed dial for your website management tasks.

List Existing Aliases

To see the aliases you’ve already set up, simply type:
alias

Managing Aliases in WordPress Hosting

In Site Bay, aliases can be particularly useful for WordPress commands that you find yourself using often. Depending on your shell (Bash, Z shell (ZSH), or fish), the place to set these aliases varies:

Bash: ~/.bashrc
ZSH: ~/.zshrc
fish: ~/.config/fish/config.fish
Create a Temporary Alias

To quickly create an alias for a session, use the syntax alias shortcut="command to run". For instance, to easily navigate to your WordPress site's root directory:
alias wpRoot="cd /var/www/html/mysite.com"

Remove an Alias

To remove an alias within the same session, type:
unalias wpRoot

Create a Permanent Alias

For aliases you want to keep across sessions, add them to your shell's configuration file:
# Add this to your ~/.bashrc or equivalent file
alias wpUpdate="wp core update"


After adding, apply the changes:
source ~/.bashrc

Example: Alias for WordPress Commands

Aliasing WordPress CLI commands can save time. For instance, updating WordPress core with a simple command:
alias wpUpdate="wp core update"


Remember, while aliases can greatly increase your efficiency, they rely on the environment you've set them up in. If you switch to a new machine or environment, you'll need to recreate your aliases there.