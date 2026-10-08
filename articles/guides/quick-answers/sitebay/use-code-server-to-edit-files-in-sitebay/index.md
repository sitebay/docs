---
slug: use-code-server-to-edit-files-in-sitebay
description: Make the smallest intended change in the correct workspace. Editing a live theme file can immediately
  affect visitors, so use a test copy and recovery point for risky changes.
keywords:
- code-server
- SiteBay
- WordPress
- IDE
- browser-based editor
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases:
- /quick-answers/use-code-server-to-edit-files-in-sitebay/
- /quick-answers/sitebay/use-code-server-to-edit-files-in-sitebay/
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Edit a file with code-server
tags:
- sitebay
- code-server
- WordPress
- IDE
- development
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- code-server
- wp-config
- shell-reference
- lifecycle
---

Make the smallest intended change in the correct workspace. Editing a live theme file can immediately affect visitors, so use a test copy and recovery point for risky changes.

## Edit and review

Open the file, read its current contents, make the scoped edit and inspect the diff. Save it and check the application result. Do not replace an entire file merely because a partial search failed.

## Managed configuration

The old instructions to open and rewrite `wp-config.php` are not appropriate for platform-managed credentials. Use supported configuration settings or the allowlisted repository overrides instead; rejected values must be reviewed, not bypassed.

## Current procedure

[Open and verify a workspace]({{< relref "products/code-server/get-started/index.md" >}}) covers the launch grant, actual path, extensions and completion checks. For command examples, see [workspace navigation]({{< relref "guides/quick-answers/sitebay/how-to-use-basic-commands-for-wordpress-linux/index.md" >}}) and [WP-CLI checks]({{< relref "guides/quick-answers/sitebay/wordpress-command-line-tips/index.md" >}}).
