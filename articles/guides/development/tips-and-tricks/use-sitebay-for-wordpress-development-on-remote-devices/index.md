---
slug: wordpress-development-on-remote-devices
author:
  name: SiteBay
  email: support@sitebay.org
description: "Remote WordPress development with SiteBay Git Sync."
keywords: ["docker", "container", "sitebay", "remote", "git sync"]
tags: ["git", "vscode", "ide"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-14
modified: 2024-12-04
modified_by:
  name: SiteBay
title: 'Remote WordPress Development'
audiences: ["beginner"]
aliases: ['/features/tips-and-tricks/wordpress-development-on-remote-devices','/development/wordpress-development-on-remote-devices']
---

Configure SiteBay for remote WordPress development.

## Development Approaches

| Approach | Pros | Cons |
|----------|------|------|
| Local (LAMP/MAMP) | Instant changes, familiar tools | Buggy clients, machine-dependent |
| WordPress editor | Instant preview | No IDE features, no version history |
| IDE + FTP | Full IDE features | Slow, risky |

## Recommended: Git Sync + Staging

Best of both worlds:
- Use your preferred IDE
- Changes sync every 30 seconds
- No risk to production site
- Works on any OS

## Setup Git Sync

1. Sign up for SiteBay
2. Install SiteBay app on GitHub
3. Go to **My SiteBay** → **Account** → **Git Sync**
4. Find your wp-content repo
5. Click **Create new Site from this repo**

## Workflow

1. Make changes locally in your IDE
2. Push to GitHub
3. SiteBay auto-deploys to staging
4. Test and verify
5. Sync to production when ready

Changes made in WordPress also sync back to GitHub.
