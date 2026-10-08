---
slug: delete-file-command-line
description: "Delete files and directories from the command line on SiteBay."
keywords: ["remove files", "delete files", "SiteBay rm"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-03
modified: 2024-12-04
modified_by:
  name: SiteBay
title: "Delete Files from Command Line"
tags: ["sitebay"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Use `rm` to delete files and directories.

{{< note respectIndent=false >}}
Replace `filename.txt` with your actual file names.
{{< /note >}}

## Basic Usage

```bash
# Single file
rm filename.txt

# Multiple files
rm file1.txt file2.txt

# All .txt files
rm *.txt
```

## Common Options

| Flag | Purpose |
|------|---------|
| `-i` | Confirm each deletion |
| `-f` | Force (no prompts) |
| `-v` | Verbose output |
| `-d` | Delete empty directory |
| `-r` | Recursive (directories + contents) |

## Examples

```bash
# Interactive mode
rm -i filename.txt

# Verbose
rm -v *.png

# Delete directory + contents
rm -r directoryname/

# Force delete directory (use carefully)
rm -rf directoryname/
```

## Delete Old Files

Find and delete files older than 28 days:

```bash
find directoryname* -type f -mtime +28 -exec rm '{}' ';' -print
```

Use PIT Machine to restore accidentally deleted files.
