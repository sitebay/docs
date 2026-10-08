---
slug: how-to-use-cd
description: "Navigate directories with the cd command."
keywords: ["sitebay", "how to", "cd", "change directory"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-12-04
modified_by:
  name: SiteBay
published: 2024-04-22
image: UseTheCDCommand.png
title: "cd Command"
tags: ["sitebay"]
aliases: ['/quick-answers/sitebay/how-to-use-cd/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Change directories in the terminal.

## Basic Usage

```bash
cd /usr/local          # Absolute path
cd share               # Relative path
```

## Shortcuts

| Command | Result |
|---------|--------|
| `cd ..` | Parent directory |
| `cd ../..` | Two levels up |
| `cd /` | Root directory |
| `cd ~` | Home directory |
| `cd` | Home directory |
| `cd -` | Previous directory |

## Options

| Option | Purpose |
|--------|---------|
| `-L` | Follow symbolic links (default) |
| `-P` | Use physical path, ignore symlinks |

## Examples

```bash
# Go to WordPress directory
cd /var/www/html

# Go up one level
cd ..

# Toggle between two directories
cd -
```

{{< note respectIndent=false >}}
If both `-L` and `-P` are specified, `-P` is ignored.
{{< /note >}}
