---
slug: how-to-use-sitebay-git-sync
authors: ["SiteBay"]
contributors: ["SiteBay"]
modified_by:
  name: SiteBay
description: 'How to use Git Sync to develop your WordPress site from anywhere.'
keywords: ['git-sync']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-26
modified: 2024-03-26
title: "How to Use SiteBay's Git Sync"
h1_title: "Using Git Sync"
tags: ["sitebay platform","development", "git sync"]
aliases: ['/platform/git-sync/how-to-use-git-sync/']
---

Using Git Sync on SiteBay totally changes the game for WordPress development. Since SiteBay is an AI-native platform built on Kubernetes, connecting your codebase directly to a Git repo gives you incredible flexibility, speed, and rock-solid version control. Here's how to get it running.

### Step 1: Enable Git Sync on Your SiteBay Site

First up, you need to flip the switch for Git Sync in your SiteBay dashboard. This tells our platform to start tracking your WordPress site's files via Git. We support all the major players: GitHub, GitLab, and Bitbucket.

### Step 2: Connect Your Repository

Once enabled, just drop in your repository URL and set up the access permissions. This links your SiteBay environment to your repo so changes can flow securely in both directions.

### Step 3: Work Locally or Remotely

Now the fun part. You can code locally in your favorite IDE, pull in the **SiteBay MCP Server** for some AI assistance, or work with your team remotely. Whenever you add a plugin, tweak a theme, or push custom code, just use your standard Git commands to track the changes and commit them.

### Step 4: Sync Changes

Ready to go live? Just run a `git push`. SiteBay's Git Sync catches the push and automatically updates your live WordPress site on our Kubernetes clusters. 

What if someone makes a change directly in the WordPress dashboard (like updating a plugin)? No problem. Because the sync is bi-directional, you can simply pull those changes down to your local machine to keep your repo perfectly matched with reality. 

### Why You Should Be Using Git Sync

- **Collaboration:** Stop stepping on each other's toes. Multiple devs can work on the same project smoothly.
- **Version Control:** If something breaks—say, SiteClaw flags a bad plugin update—you have a full history of your code and can easily roll back.
- **Flexibility:** Work from anywhere, anytime, without needing clunky FTP access to your live server.

Git Sync is a must-have for modern, professional WordPress development. Hook it up and see how much faster you can move.

### Repo Layout

Your git-sync repo should contain a `wp-content/` directory at the root. SiteBay manages WordPress core and your database — you only commit content.

```
your-repo/
├── wp-content/
│   ├── plugins/
│   ├── themes/
│   └── mu-plugins/         # optional
├── wp-config-overrides.php # optional, allowlisted constants only
└── .gitignore
```

**Do not commit:** `wp-includes/`, `wp-admin/`, `wp-config.php`, or anything with DB credentials. These are managed by SiteBay and will be rejected.

### Starter `.gitignore`

Media uploads are handled by SiteBay's MinIO storage, so you don't need them in git. Cache and log files will bloat your repo. Drop this at the root:

```gitignore
# SiteBay manages these — don't commit
wp-content/uploads/
wp-content/cache/
wp-content/upgrade/
wp-content/backup*/
wp-content/advanced-cache.php
wp-content/object-cache.php

# Logs
wp-content/*.log
wp-content/debug.log

# OS / editor cruft
.DS_Store
Thumbs.db
*.swp
.idea/
.vscode/
```

### `wp-config-overrides.php` (optional)

For PHP-level settings (debug flags, memory limits, revisions), drop a `wp-config-overrides.php` at your repo root. SiteBay reads an allowlisted subset — database constants, keys, and salts are rejected automatically to protect your site's isolation.

```php
<?php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_MEMORY_LIMIT', '512M');
define('WP_POST_REVISIONS', 10);
define('DISALLOW_FILE_EDIT', true);
```

Supported constants cover debug, memory, revisions, autosave, trash, file-edit locks, and auto-update behavior. Anything touching `DB_*`, `AUTH_*`, `*_SALT`, `WP_HOME`, `WP_SITEURL`, or path constants is silently dropped — those stay under SiteBay's control.