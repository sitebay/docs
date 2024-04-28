---
slug: basic-wp-cli-commands
description: 'Basic commands to add or change a user, change your password, and install plugins'
keywords: ["wp cli", "shell", "wp commands"]
tags: ["wp-cli"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-04-04
modified_by:
  name: Site Bay
published: 2024-03-04
title: 'basic-wp-cli-commands'
authors: ["Site Bay"]
---
# Basic WP-CLI Commands

When managing a WordPress site, using the command line can make tasks quicker and easier. WP-CLI, or WordPress Command Line Interface, is a powerful tool that helps you manage your WordPress sites without using the web browser. Whether you're looking to add a new user, change your password, or install plugins, here's how you can do it using WP-CLI.

## Code Server
Go to your My Site Bay site's dashboard to try these out

If you aren't on Site Bay, you need to install wp-cli first on your local machine
## Installation (Non Site Bay Users)
Make sure you have it installed on your local development machine or hosting environment. You can install WP-CLI by following the instructions on the [official website](https://wp-cli.org/).
(This is preinstalled on Site Bay Code Server)

## Adding or Changing a User

### Adding a New User

To add a new user to your WordPress site via WP-CLI, you can use the following command:

```bash
wp user create <username> <email> --role=<role>
```

- Replace `<username>` with the desired username.
- Replace `<email>` with the user's email address.
- Replace `<role>` with the appropriate user role (e.g., `administrator`, `editor`, `subscriber`).

Example:

```bash
wp user create juan juan@example.com --role=editor
```

### Changing a User’s Role

If you need to change a user's role, use this command:

```bash
wp user set-role <username> <role>
```

- Replace `<username>` with the username of the user.
- Replace `<role>` with the new role.

Example:

```bash
wp user set-role juan contributor
```

## Changing Your Password

If you've forgotten your password or need to update it for security reasons, WP-CLI makes it simple.

```bash
wp user update <username> --user_pass=<newpassword>
```

- Replace `<username>` with your username.
- Replace `<newpassword>` with your new password.

Example:

```bash
wp user update juan --user_pass=newstrongpassword
```

## Installing Plugins

Installing plugins using WP-CLI is straightforward and can be faster than using the WordPress dashboard.

### Install a Plugin

To install a plugin, you need to know its slug from the WordPress plugin repository.

```bash
wp plugin install <plugin_slug>
```

- Replace `<plugin_slug>` with the slug of the plugin.

Example:

```bash
wp plugin install akismet
```

### Activate a Plugin

After installing, you need to activate the plugin:

```bash
wp plugin activate <plugin_slug>
```

Example:

```bash
wp plugin activate akismet
```

## Summary

Learning the basics of WP-CLI can greatly reduce the time you spend managing your WordPress site. It gives you the ability to perform critical tasks directly from the command line—whether you’re managing users, changing passwords, or handling plugins. It’s a tool that, once mastered, can offer you a straightforward and efficient way to manage your site’s back-end.