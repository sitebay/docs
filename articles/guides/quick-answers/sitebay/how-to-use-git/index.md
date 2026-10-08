---
slug: how-to-use-git
description: 'Git basics.'
aliases: ['/quick-answers/sitebay/how-to-use-git/','/quick-answers/how-to-use-git/']
keywords: ["git", "version control"]
tags: ["version control","sitebay"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2025-12-04
modified_by:
  name: SiteBay
published: 2024-04-19
title: "Git Basics"
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Git Basics

{{< note >}}
SiteBay's Git Sync handles this automatically. This guide is for manual git usage.
{{< /note >}}

## Setup

```bash
mkdir myproject
cd myproject
git init
```

## Basic Workflow

```bash
# Create files
touch index.html style.css

# Check status
git status

# Stage files
git add index.html      # one file
git add -A              # all files

# Commit
git commit -m "Initial commit"

# Push to remote
git push origin main
```

## Common Commands

| Command | Action |
|---------|--------|
| `git status` | Show changes |
| `git add -A` | Stage all changes |
| `git commit -m "msg"` | Commit with message |
| `git push` | Push to remote |
| `git pull` | Get remote changes |
| `git log` | View history |
