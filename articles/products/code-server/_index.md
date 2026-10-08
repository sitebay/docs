---
title: Code-server workspaces
title_meta: Code-server workspaces
description: A code-server workspace is the browser editor for the selected site.
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- code server
- sitebay documentation
published: 2025-03-18
slug: code-server
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- code-server
- wp-config
- shell-reference
- lifecycle
modified: 2026-10-07
layout: documentation-section
---

A code-server workspace is the browser editor for the selected site. Its connection, permissions, runtime health and lease must be checked separately from the existence of a site record.

## Choose the task

For file edits, verify live versus staging and inspect the diff before saving. For terminal work, start with read-only environment checks and command-specific help. For extensions, review compatibility and publisher trust before installation.

## Current procedure

[Open and verify a workspace]({{< relref "products/code-server/get-started/index.md" >}}) covers the launch grant, actual path, extensions and completion checks. For command examples, see [workspace navigation]({{< relref "guides/quick-answers/sitebay/how-to-use-basic-commands-for-wordpress-linux/index.md" >}}) and [WP-CLI checks]({{< relref "guides/quick-answers/sitebay/wordpress-command-line-tips/index.md" >}}).

{{< section-links >}}
