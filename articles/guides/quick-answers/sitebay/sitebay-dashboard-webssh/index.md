---
slug: sitebay-dashboard-webssh
description: Open the terminal for the intended site's authenticated workspace. Its commands run with that environment's
  access; it is not an unrestricted shell on the hosting node.
keywords:
- sitebay
- webssh
- shell access
- WordPress
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Use the browser terminal
headless: true
tags:
- sitebay
- webssh
- WordPress
aliases:
- /quick-answers/sitebay/sitebay-dashboard-webssh/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- code-server
- shell-reference
---

Open the terminal for the intended site's authenticated workspace. Its commands run with that environment's access; it is not an unrestricted shell on the hosting node.

## Orient yourself

```bash
pwd
ls -la
```

Confirm the target and live/staging context before editing files or running WP-CLI. If a connection drops, inspect the outcome of a previously started command before submitting the same mutation again.

## Keyboard behavior

Terminal input, browser shortcuts and a program running inside the terminal are different layers. `q`, `/term`, `g`, `G` and mark commands belong to pagers such as `less`; they are not universal WebSSH navigation keys. In an ordinary shell, typing them can invoke commands instead.

Use the terminal or editor menus when browser shortcuts are intercepted. Check a program's own help before assuming its key bindings. Interrupt only work you own and understand; a long-running restore, migration or backup may need its supported control rather than a blind process kill.

## Safe examples

Use [workspace navigation]({{< relref "guides/quick-answers/sitebay/how-to-use-basic-commands-for-wordpress-linux/index.md" >}}) and [WP-CLI checks]({{< relref "guides/quick-answers/sitebay/wordpress-command-line-tips/index.md" >}}) for read-first examples. Keep credentials and private database exports out of shared terminal logs.
