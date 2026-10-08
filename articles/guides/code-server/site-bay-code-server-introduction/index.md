---
slug: site-bay-code-server-introduction
author:
  name: SiteBay
  email: support@sitebay.org
keywords:
- code server
- vscode
- wordpress
description: Code-server lets you inspect and edit the selected site through a browser workspace.
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-08
modified_by:
  name: SiteBay
published: 2024-04-04
title: Code-server introduction
show_on_frontpage: true
weight: 10
icon: book
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

Code-server lets you inspect and edit the selected site through a browser workspace. Begin by confirming the team and domain, because live and staging changes have different consequences.

## Access

Open the site’s authenticated code-server action and complete its session flow. A copied hostname or another user’s launch link is not a substitute for your own authorization.

## Directory Structure

Inspect `pwd` and the file tree. The managed workspace is configured under `/home/coder/wordpress/wp-content`; confirm the live or staging target before changing files.

## Terminal Commands

Use `wp --info`, `wp core version`, and a scoped plugin list to verify the environment before editing. A missing tool should be investigated rather than worked around with root access.

## Current procedure

[Open and verify a workspace]({{< relref "products/code-server/get-started/index.md" >}}) covers the launch grant, actual path, extensions and completion checks. For command examples, see [workspace navigation]({{< relref "guides/quick-answers/sitebay/how-to-use-basic-commands-for-wordpress-linux/index.md" >}}) and [WP-CLI checks]({{< relref "guides/quick-answers/sitebay/wordpress-command-line-tips/index.md" >}}).
