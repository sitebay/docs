---
slug: how-to-use-git
description: Git records repository files. It does not prove that a SiteBay deployment has completed, and it does
  not automatically back up the WordPress database.
aliases:
- /quick-answers/sitebay/how-to-use-git/
- /quick-answers/how-to-use-git/
keywords:
- git
- version control
tags:
- version control
- sitebay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-19
title: Git basics for a reviewed change
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- wp-cli
- lifecycle
- git-sync
---

Git records repository files. It does not prove that a SiteBay deployment has completed, and it does not automatically back up the WordPress database.

## Start a practice repository

```bash
mkdir -p -- git-practice
cd -- git-practice || exit 1
git init -b main
printf '%s\n' '<h1>Practice</h1>' > index.html
git status --short
```

Use a disposable folder, not the site's active Git Sync checkout. Configure your author identity for the repository when Git requests it; do not invent another person's identity.

## Review before staging

```bash
git diff --
git add -- index.html
git diff --cached --
git status --short
git commit -m 'Add practice page'
```

Untracked files do not appear in an ordinary `git diff`. Check status as well as the diff. Stage specific files rather than indiscriminately including secrets, generated data or another contributor's edits with `git add -A`.

## Connect to an intended remote

Inspect the configured remote and branch before a push. Adding a remote does not authenticate you, and a private repository can require a separately authorized provider connection. Push only after reviewing the diff and obtaining the necessary repository permission.

## Distinguish history and runtime

A push updates Git history; the sync/deployment system has its own health and result. Do not run reset-hard, clean, force-push, or an automatic pull to “fix” a dirty shared checkout. Identify ownership of the changes and resolve conflicts deliberately.
