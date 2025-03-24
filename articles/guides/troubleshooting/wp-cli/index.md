---
slug: wp-cli-tutorial
author:
  name: SiteBay
  email: support@sitebay.org
description: "Learn how to use WP-CLI, the command-line interface for WordPress, to manage your SiteBay WordPress sites more efficiently."
keywords: ['WP-CLI', 'command line', 'WordPress management']
tags: ["wordpress"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-27
modified: 2024-04-27
modified_by:
  name: SiteBay
title: "Mastering WP-CLI on SiteBay"
---

Hey! Wanna level up how you manage your WordPress site? Let's dive into WP-CLI, the superhero command-line tool that lets you boss around your WordPress site straight from the terminal. And yep, you can totally do this on SiteBay with our browser-based VSCode (code-server). Cool, right? Let's get started.

## Setting Up Your Environment
First things first, you gotta let WP-CLI know how you roll. This means setting up environment variables to customize how WP-CLI behaves when you run it.

### Quick Command Customization
Wanna run a command with a special setup just once? Easy. Just type your environment variable right before your command like this:

```bash
$ EDITOR=vim wp post edit 1
```

This tells WP-CLI to open up post number 1 in vim editor for you to edit. Super handy for quick changes.

Making It Stick

If you're like, "I want vim all the time," you can make it the default. Just add this line to your ~/.bashrc or ~/.zshrc file:

```bash
export EDITOR=vim
```


Now, every time you want to edit something, vim's your go-to editor. No need to specify it every time.

Must-Know Environment Variables for WP-CLI:
- WP_CLI_CACHE_DIR: Where WP-CLI keeps its cache. Default's at ~/.wp-cli/cache/.
- WP_CLI_CONFIG_PATH: The path to your global config.yml for WP-CLI. It's at ~/.wp-cli/config.yml by default.
- WP_CLI_CUSTOM_SHELL: Overwrite the default shell if you wanna use something other than /bin/bash.
- WP_CLI_DISABLE_AUTO_CHECK_UPDATE: Not feeling those auto-update checks? Set this to disable 'em.
- WP_CLI_PACKAGES_DIR: This is where any packages you add to WP-CLI live. Look in ~/.wp-cli/packages/.
- WP_CLI_PHP: Got a specific PHP binary you wanna use? Here's where you tell WP-CLI about it.
- WP_CLI_PHP_ARGS: Any special arguments you want to pass to PHP? Set 'em here.
- WP_CLI_SSH_PRE_CMD: Using --ssh to connect? Run a command before WP-CLI does its thing on the remote server.
- WP_CLI_STRICT_ARGS_MODE: Keep things clear by making arguments before a command global and after local.
- WP_CLI_SUPPRESS_GLOBAL_PARAMS: Know WP-CLI like the back of your hand? Turn this on to hide global parameters in help screens.

And there you have it! With WP-CLI on SiteBay, you're ready to take your WordPress management game to the next level. Dive in, and see what you can do. It's not just about making things easier; it's about making them faster and more powerful too. Welcome to the WP-CLI club!