---
slug: what-is-sqlite
description: SQLite is an embedded SQL database engine. It reads and writes a database file without requiring a
  separate database-server process.
keywords:
- sqlite
- wordpress sqlite
- file-based database
- lightweight database
tags:
- sqlite
- wordpress
- database
- performance
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: What is SQLite?
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- database-basics
---

SQLite is an embedded SQL database engine. It reads and writes a database file without requiring a separate database-server process.

## When the distinction matters

A file-backed database can simplify local tools and some embedded applications. Concurrency, filesystem behavior, backup, and application support still need to match the workload.

SQLite is not a drop-in replacement for a managed WordPress database. Check the application's supported database adapter and test its behavior before changing storage.

## Protect the file

Keep database files outside publicly served paths. Use the database's supported backup process when it can be written concurrently; copying a live file without considering its journal can miss required state.

Read [About SQLite](https://www.sqlite.org/about.html) and [WordPress requirements](https://wordpress.org/about/requirements/) before choosing an engine.
