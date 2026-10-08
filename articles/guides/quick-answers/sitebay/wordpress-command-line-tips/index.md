---
slug: wordpress-command-line-tips
description: 'Unleash the power of the WP CLI: Your ultimate guide to mastering WordPress management from the command line with SiteBay hosting.'
keywords: ["terminal", "command line", "shell", "tips", "tricks", "wp", "cli"]
aliases: ['/quick-answers/sitebay/sitebay-command-line-tips/','/quick-answers/sitebay-command-line-tips/']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-13
modified: 2024-04-17
modified_by:
  name: SiteBay
title: 'Command Line Mastery in VS Code Server'
tags: ["sitebay"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Managing WordPress via CLI on Code Server

## Essential Terminal Commands for Navigating WordPress on SiteBay

- **Navigating Command History**: Simply use the **Up arrow** on your keyboard to cycle through previously used commands. Press **Enter** to execute the chosen command.
- **Interrupt Processes**: Use **CTRL+C** to stop any ongoing processes and return to the prompt.
- **Autocomplete Feature**: Press the **TAB** key to autocomplete commands and file paths, a handy tool that saves time.

## Simple Command Line Editing

- Move left by one word: **ESC+B**
- Move right by one word: **ESC+F**
- Jump to the start of the line: **CTRL+A**
- Leap to the end of the line: **CTRL+E**
- Erase the word behind the cursor: **CTRL+W**
- Clear the current line: **CTRL+U**

## Instant Command Correction and Re-execution

Enhance your efficiency with these quick fixes:

### Correcting Typos Easily

To correct a typo in your previous command, especially useful in long lines:
    wp plugin install query-monitor –activate ^query-monitor^debug-bar

### Changing a Command Action Quickly

If you need to change an action in a command without retyping the entire line:
    wp plugin deactivate debug-bar ^deactivate^activate

Using these streamlined command line inputs can enhance your productivity and simplify your WordPress management tasks on SiteBay.

Note: Replace `^old^new` in the commands with the actual syntax required for command correction in your environment, as this notation is used here for illustrative purposes.