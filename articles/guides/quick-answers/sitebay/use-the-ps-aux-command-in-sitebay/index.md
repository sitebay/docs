---
slug: use-the-ps-aux-command-in-sitebay
keywords: ["ps aux command", "process monitoring", "sitebay"]
description: "Monitor running processes with ps aux."
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-12-04
modified_by:
  name: SiteBay
published: 2024-04-25
title: "ps aux Command"
tags: ["sitebay"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

View running processes on your system.

## Basic Usage

```bash
ps        # Current terminal processes
ps aux    # All system processes
```

## Output Columns

| Column | Meaning |
|--------|---------|
| PID | Process ID |
| USER | Owner |
| %CPU | CPU usage |
| %MEM | Memory usage |
| VSZ | Virtual memory (KB) |
| RSS | Physical memory (KB) |
| TTY | Terminal (? = none) |
| STAT | State (S=sleeping, R=running) |
| CMD | Command |

## Common Variations

```bash
ps aux              # All processes, BSD style
ps -ef              # All processes, UNIX style
ps -He              # Process hierarchy
ps aux | grep php   # Filter by name
```

## Process States

| Code | Meaning |
|------|---------|
| S | Sleeping |
| R | Running |
| Z | Zombie |
| T | Stopped |

## Related Commands

- `top` - Real-time process monitor
- `htop` - Interactive process viewer
- `kill PID` - Terminate process
