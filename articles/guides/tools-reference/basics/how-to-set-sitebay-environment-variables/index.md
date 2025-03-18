---
slug: how-to-set-sitebay-environment-variables
description: ''
keywords: ["linux", "custom kernel", "grub legacy"]
tags: ["linux"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-04-04
modified_by:
  name: SiteBay
published: 2024-03-04
title: 'how-to-set-sitebay-environment-variables'
deprecated: true
authors: ["SiteBay"]
contributors: ["SiteBay"]
---
Let's remake the article for SiteBay Powerful WordPress hosting, making it relatable and straightforward. We'll focus on setting and using environment variables in the context of SiteBay, ensuring it's clear and accessible for everyone, especially those new to WordPress hosting on Kubernetes platforms.

Setting Up Your SiteBay Environment Like a Pro

Welcome to the world of SiteBay, where hosting your WordPress site becomes as easy as posting your favorite meme. But before you dive into the deep end, let's get you equipped with the basics, starting with environment variables. Think of them as the secret sauce that makes your website run just the way you like it.

Before We Jump In

First things first, if you haven't got a SiteBay account yet, it's time to create one. It's your first step towards making your website dreams come true. Once you're set up, your journey into the world of WordPress hosting on Kubernetes with all the cool analytics from Posthog, recordings, and Grafana dashboards begins.

What's an Environment Variable Anyway?

Imagine you have a backpack (your website) that you take everywhere (the internet). Environment variables are like the essential items you pack in your backpack. They include stuff like your home address (where your site lives), your favorite shortcuts (paths to important files or commands), and your ID (user permissions).

The Scope
Globally scoped variables: These are like your ID and phone. No matter where you go, they're with you.
Locally scoped variables: Picture your house keys. They only work for your home (or in this case, the terminal session they were created in).
Environment vs. Shell Variables: The Showdown
Environment variables are the big bosses, available across your entire session and to any apps or scripts you're running.
Shell variables are the interns, only hanging around in the current shell session, making temporary changes until they log off.
The Usual Suspects

Here are a few environment variables you'll meet often:

USER: Your username.
HOME: Where your digital home is located.
PATH: The roads your system takes to find commands and programs.
PWD: Your current location in the system.
Setting and Using These Variables
Listing 'Em All

Wanna see what you've got? Pop open your terminal and type:

printenv


This command is like opening your backpack to see all the goodies (variables) you've packed.

Setting New Variables

Got something new to add? Just type it like this:

export MY_VAR="awesome_value"


Now, MY_VAR is ready to roll and set to "awesome_value".

Making Them Stick

To keep your variables around for the long haul, you'll want to add them to your .bashrc file for single users or /etc/profile.d/custom.sh for all users. This way, they'll always be there, ready for your next adventure.

Wrapping Up

And there you have it! You're now a budding SiteBay environment variable expert. With these basics, you're well on your way to customizing your WordPress hosting experience and making your site run just the way you want. Happy hosting!

This guide simplifies the concept of environment variables and their application within SiteBay, making it accessible and easy to understand. Whether you're setting up your WordPress site for the first time or looking to fine-tune your hosting environment, mastering environment variables is a crucial step on your journey.