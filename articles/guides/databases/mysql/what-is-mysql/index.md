---
slug: what-is-mysql
description: MySQL is a relational database server. Applications use SQL to store and query data organized in tables.
keywords:
- mysql
- database
- wordpress database
- sql
tags:
- mysql
- database
- wordpress
- sql
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: What is MySQL?
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- database-basics
- wp-cli
---

MySQL is a relational database server. Applications use SQL to store and query data organized in tables.

WordPress uses a database for content, users, settings, and plugin data. Media files and application code also live in the site's filesystem, so a database export alone is not a complete site backup.

## Inspect a WordPress database

Use the credentials and access method provided for the selected site. Start with a read-only query or the site's WP-CLI tools. Do not copy database credentials into a public document or a browser-side script.

Check the actual server version before following version-specific SQL or upgrade instructions. A managed site's database is not a general-purpose server you can replace independently.

See [Database choices]({{< relref "guides/databases/mysql/list-of-databases/index.md" >}}) and [WP-CLI basics]({{< relref "guides/tools-reference/basics/basic-wp-cli-commands/index.md" >}}).
