---
slug: using-the-terminal
description: 'This guide shows how to access and use the command line interface, also known as the Shell, via a Terminal application like PuTTY to perform system admin tasks on your SiteBay WordPress hosting.'
keywords: ["Linux terminal", "terminal HOWTO", "SiteBay terminal tutorial"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases: ['/networking/ssh/using-the-terminal/', '/tools-reference/tools/using-the-terminal/', '/tools-reference/ssh/using-the-terminal/', '/using-sitebay/using-the-terminal/']
modified: 2024-04-15
modified_by:
  name: SiteBay
published: 2024-04-04
title: Using the Terminal for SiteBay WordPress Hosting
---

# Shell Basics for SiteBay WordPress Hosting

The shell, also known as the **command line interface (CLI)**, is a powerhouse for interacting with your SiteBay WordPress hosting environment. It's your go-to for managing files, running scripts, and performing tasks that keep your site humming. You might already be familiar with the terminal from Linux or Mac's Terminal.app.

This overview will walk you through terminal basics, offering tips to make your command line journey smooth and beneficial. When you hop onto a terminal, you're met with a prompt, signaling you're ready to start. This guide will break down command structures, file system navigation, and more.

## Command Structure Basics

Commands typically start with the action (**verb**), followed by options (**adjectives**) that tweak the command's behavior, and targets (**objects**) the action is applied to. Need help? Slap a `--help` flag next to a command for usage info.

## Navigating Files and Directories

The shell is your ticket to cruising through your site's files and folders:

### Listing Directories

- `ls` shows you what's in a directory.
- `ls /etc/init.d/` to peek into `/etc/init.d/`.
- Add `-a` to see all files, including hidden ones.
- Use `-lha` for detailed listings in human-readable form.

### Changing Directories

- `cd` switches your current directory.
- Jump into `/etc/` with `cd /etc/`.
- Use `..` to go up a level, or `.` to reference the current directory in commands.

### Making and Removing Directories

- `mkdir` crafts a new folder.
- `mkdir ~/website/` creates a website folder under your home directory.
- Use `rmdir` to delete an empty directory.

### Handling Files

- Create files without content using `touch`.
- Delete files with `rm`. Be careful with `rm`, as it's irreversible.
- Use `rm -r` to remove non-empty directories.

### Copying and Moving

- `cp` duplicates files.
- `mv` renames or moves files and directories.
- Remember, `mv` is like `cp`, but for moving stuff around.

## Text Editors and Stream Management

SiteBay recommends using the **code-server editor** for quick file edits. It's straightforward and includes basic commands right in the terminal window.

- Direct streams with pipes (`|`) and redirect output with `>` to save command outputs to files.
- Use `>>` to append to an existing file without overwriting.

## System Monitoring

Keep an eye on your WordPress hosting with commands like:

- `ps` for process IDs.
- `top` for real-time resource usage.
- `df` for disk space details.
- `du` helps identify directories hogging space.

## Terminal Tricks and Tips

Make the most of the terminal with:

- **Tab completion**: Speed up your typing.
- **Screen sessions**: Multitask efficiently.
- **Command history**: Quickly recall previous commands.
- **Emacs-like keybindings**: Efficient text navigation supported by `bash`.

## Conclusion

The terminal is a robust tool for managing your SiteBay WordPress hosting. Start with these basics, and you'll find yourself more confident in handling your hosting environment directly from the command line. For more advanced topics and system monitoring, explore SiteBay's comprehensive guides.