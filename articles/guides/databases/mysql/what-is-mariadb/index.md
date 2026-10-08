---
slug: what-is-mariadb
description: 'MariaDB is an enhanced MySQL fork used by many WordPress hosts.'
keywords: ['mariadb', 'database', 'mysql', 'wordpress database']
tags: ["mariadb", "mysql", "database", "wordpress"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2024-12-04
modified_by:
  name: SiteBay
title: "What is MariaDB?"
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

MariaDB is a MySQL fork created by MySQL's original developers. It's a drop-in replacement with enhancements.

## MariaDB vs MySQL

| Feature | MariaDB | MySQL |
|---------|---------|-------|
| Performance | Enhanced optimizer | Standard |
| Development | Community-driven | Oracle-controlled |
| Storage engines | More options (Aria, ColumnStore) | Standard (InnoDB, MyISAM) |
| Replication | Multi-source, parallel | Standard |
| License | Fully open-source | Mixed |

## Why Hosts Use MariaDB

- Faster complex queries (up to 40%)
- Better connection handling
- Enhanced security features
- Transparent development

## WordPress Compatibility

WordPress cannot distinguish between MySQL and MariaDB. No code changes needed.

## Migration

1. Backup MySQL database
2. Install MariaDB
3. Import database
4. No WordPress config changes needed

SiteBay uses optimized MariaDB for all WordPress installations.
