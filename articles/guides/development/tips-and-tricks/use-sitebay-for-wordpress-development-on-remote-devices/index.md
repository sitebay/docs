---
slug: wordpress-development-on-remote-devices
author:
  name: SiteBay
  email: support@sitebay.org
description: Choose either a local development checkout with a reviewed Git workflow or the authenticated browser
  workspace for the target site.
keywords:
- docker
- container
- sitebay
- remote
- git sync
tags:
- git
- vscode
- ide
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-14
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Develop WordPress from another device
audiences:
- beginner
aliases:
- /features/tips-and-tricks/wordpress-development-on-remote-devices/
- /development/wordpress-development-on-remote-devices/
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

Choose either a local development checkout with a reviewed Git workflow or the authenticated browser workspace for the target site. They are separate environments, not automatically identical copies.

## Prepare remote work

Use an authorized device, a stable connection and the intended account. Avoid shared-browser sessions for credentials. Confirm the repository branch, file state and live/staging target before editing.

## Reconnect deliberately

After a dropped connection, inspect the saved file, remote commit and site state. An interrupted response does not prove the server made no change. Do not repeat a promotion or restore until its outcome is known.

## Test before live use

A staging copy reduces some risk but does not guarantee isolation from every external API, email sender or payment integration. Use test credentials and inspect affected integrations before running a workflow.

## Current procedure

[Open and verify a workspace]({{< relref "products/code-server/get-started/index.md" >}}) covers the launch grant, actual path, extensions and completion checks. For command examples, see [workspace navigation]({{< relref "guides/quick-answers/sitebay/how-to-use-basic-commands-for-wordpress-linux/index.md" >}}) and [WP-CLI checks]({{< relref "guides/quick-answers/sitebay/wordpress-command-line-tips/index.md" >}}).
