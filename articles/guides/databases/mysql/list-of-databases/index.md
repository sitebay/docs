---
slug: list-of-databases
title: "Database Comparison: MySQL vs MariaDB vs SQLite"
description: "Compare MySQL, MariaDB, and SQLite for WordPress."
keywords: ['database comparison', 'mysql vs mariadb', 'sqlite wordpress']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-25
modified: 2024-12-04
modified_by:
  name: SiteBay
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Compare the three database options for WordPress.

## Quick Comparison

| Feature | MySQL | MariaDB | SQLite |
|---------|-------|---------|--------|
| Architecture | Client-server | Client-server | File-based |
| Setup | Moderate | Moderate | Zero config |
| Performance | Good | Better | Good for small sites |
| Concurrency | Hundreds | Thousands | Dozens |
| Plugin compatibility | Universal | Near-universal | Variable |
| Scaling | Excellent | Excellent | Limited |

## When to Use Each

### MySQL
- Universal compatibility needed
- Managed WordPress hosting
- Risk-averse projects

### MariaDB
- Maximum performance
- High-traffic sites
- Open-source commitment

### SQLite
- Development/testing
- Personal blogs
- Simple deployments
- Portable sites

## Performance

| Workload | Best Choice |
|----------|-------------|
| Read-heavy blog | Any |
| High-traffic site | MariaDB |
| Multi-user editing | MySQL/MariaDB |
| Local development | SQLite |
| E-commerce | MySQL/MariaDB |

## Migration

- MySQL ↔ MariaDB: Drop-in replacement
- MySQL/MariaDB → SQLite: Requires adapter plugin
- SQLite → MySQL/MariaDB: Export/import
