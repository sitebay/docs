---
slug: list-of-databases
title: Choose a database for the application
description: Choose a database that the application supports and that you can operate and recover reliably.
keywords:
- database comparison
- mysql vs mariadb
- sqlite wordpress
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-25
modified: 2026-10-07
modified_by:
  name: SiteBay
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- database-basics
---

Choose a database that the application supports and that you can operate and recover reliably.

| Engine | Operating model |
| --- | --- |
| MySQL | Relational database server accessed by clients |
| MariaDB | Relational server with substantial, but not universal, MySQL compatibility |
| SQLite | Embedded database engine working with local database files |

## Start with application support

For WordPress, check its supported database requirements and the service supplied by the host. Do not substitute an engine solely because a different application uses it.

## Compare operations

Review expected concurrency, data size, backup and restore, authentication, monitoring, and version upgrades. Include required application extensions and the cost of maintaining them.

## Test a realistic operation

Load representative data into an authorized test environment. Check the important queries and a recovery procedure. A successful empty-database connection does not verify production compatibility.

Continue with [MySQL]({{< relref "guides/databases/mysql/what-is-mysql/index.md" >}}), [MariaDB]({{< relref "guides/databases/mysql/what-is-mariadb/index.md" >}}), or [SQLite]({{< relref "guides/databases/mysql/what-is-sqlite/index.md" >}}).
