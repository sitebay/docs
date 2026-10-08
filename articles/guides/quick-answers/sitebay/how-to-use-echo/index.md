---
slug: how-to-use-echo
description: 'Display text and write to files with the echo command.'
keywords: ["sitebay", "how to", "echo"]
aliases: ['quick-answers/how-to-use-echo/']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-12-04
modified_by:
  name: SiteBay
published: 2024-03-04
image: UseEchoCommand.png
title: echo Command
tags: ["sitebay", "command line", "echo"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Display text or write to files.

## Basic Usage

```bash
echo "Hello World"
```

## Options

| Option | Purpose |
|--------|---------|
| `-e` | Enable escape sequences |
| `-n` | No trailing newline |

## Escape Sequences

```bash
echo -e "Line1\nLine2"      # New line
echo -e "Col1\tCol2"        # Tab
echo -e "\aAlert"           # Beep sound
```

## Write to Files

```bash
# Overwrite
echo "text" > file.txt

# Append
echo "more text" >> file.txt

# With date
echo "Backup: $(date)" >> log.txt
```

## List Files

```bash
echo *           # All files
echo *.php       # PHP files only
```

## Add to PATH

```bash
echo 'export PATH=$PATH:/opt/bin' >> ~/.bashrc
```
