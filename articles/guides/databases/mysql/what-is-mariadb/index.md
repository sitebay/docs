---
slug: what-is-mariadb
description: MariaDB Server is an open-source relational database. Many WordPress installations use it through the
  MySQL-compatible database interface.
keywords:
- mariadb
- database
- mysql
- wordpress database
tags:
- mariadb
- mysql
- database
- wordpress
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: What is MariaDB?
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- database-basics
- wp-security
---

MariaDB Server is an open-source relational database. Many WordPress installations use it through the MySQL-compatible database interface.

## Check compatibility

MariaDB and MySQL share many interfaces but are not identical products. Review the installed version, SQL features, collations, authentication, and backup tooling before moving between them.

For WordPress, use a supported database version and test the application's plugins and queries in the target environment. The [WordPress requirements](https://wordpress.org/about/requirements/) describe the upstream baseline; your hosting environment determines the installed service.

## Work with site data

Keep database access limited to the application and authorized operators. Take a recoverable copy before imports or schema changes, and verify the application after the operation.

Use [MariaDB documentation](https://mariadb.com/docs/server) for server-specific behavior rather than assuming every MySQL example is interchangeable.
