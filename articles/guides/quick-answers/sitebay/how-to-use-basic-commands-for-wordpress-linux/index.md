---
slug: how-to-use-basic-commands-for-wordpress-linux
description: "Essential Linux commands for WordPress server navigation."
keywords: ["sitebay", "WordPress", "Linux commands", "navigate directories"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-12-04
modified_by:
  name: SiteBay
published: 2024-04-22
title: "Basic Linux Commands for WordPress"
tags: ["sitebay", "WordPress", "Linux"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Essential commands for navigating your WordPress server.

## cd - Change Directory

```bash
cd /usr/local       # Absolute path
cd share            # Relative path
cd ..               # Parent directory
cd ../..            # Two levels up
cd /                # Root
cd ~ or cd          # Home directory
cd -                # Previous directory
```

## Options

| Option | Purpose |
|--------|---------|
| `-L` | Follow symbolic links (default) |
| `-P` | Use physical path |

## Other Essential Commands

```bash
ls                  # List files
ls -la              # List with details
pwd                 # Print current directory
cat file.txt        # View file contents
cp src dest         # Copy file
mv src dest         # Move/rename file
rm file.txt         # Delete file
mkdir dirname       # Create directory
```

## WordPress-Specific Paths

```bash
cd /var/www/html           # Web root
cd wp-content/themes       # Themes
cd wp-content/plugins      # Plugins
cd wp-content/uploads      # Media files
```
