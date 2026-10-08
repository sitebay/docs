---
slug: what-is-sqlite
description: 'SQLite is a lightweight file-based database for WordPress development.'
keywords: ['sqlite', 'wordpress sqlite', 'file-based database', 'lightweight database']
tags: ["sqlite", "wordpress", "database", "performance"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2024-12-04
modified_by:
  name: SiteBay
title: "What is SQLite?"
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

SQLite is a serverless, file-based database. The entire database is a single file.

## SQLite vs MySQL

| Feature | SQLite | MySQL/MariaDB |
|---------|--------|---------------|
| Architecture | Single file | Client-server |
| Setup | Zero config | Server required |
| Concurrency | File-level locking | Row-level locking |
| Best for | Dev, small sites | Production, high traffic |

## Benefits

- **No server needed** - Just a file
- **Easy migration** - Copy one file
- **Fast reads** - No network overhead
- **Simple backups** - Copy the file
- **Great for dev** - Clone sites instantly

## Limitations

- Locks entire database on write
- Not ideal for high concurrency
- Some plugins may have compatibility issues
- Limited scaling options

## When to Use SQLite

**Good for:**
- Local development
- Personal blogs
- Small business sites
- Testing environments

**Use MySQL/MariaDB for:**
- High-traffic sites
- Multi-user content creation
- E-commerce
- Complex plugins

## WordPress SQLite Plugins

- SQLite Integration
- WP SQLite DB
- Pressable SQLite
