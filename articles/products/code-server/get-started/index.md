---
slug: get-started-code-server
description: SiteBay's code-server integration provides a browser-based development workspace for an authorized
  site.
keywords:
- code server
- vs code
- ide
- development
- browser ide
- sitebay features
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Open and verify a code-server workspace
bible: true
tags:
- sitebay
- development
- ide
- tools
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- code-server
- wp-config
- lifecycle
---

SiteBay's code-server integration provides a browser-based development workspace for an authorized site. It is not a general Kubernetes console or a promise that every plan includes an always-running editor.

## Open the intended site

Sign in, select the owning team and site, and open the code-server action offered by that site. The launch flow uses an authenticated grant. Reuse its returned link instead of constructing a hostname from a UUID or sharing a saved grant URL with another person.

Check the site's readiness, current permission and editor availability. A loading page does not mean the deployment succeeded; the server distinguishes a deployed release from an unverified outcome. For a timeout, inspect status before opening more sessions or restarting infrastructure.

## Locate the workspace

The managed deployment source configures `/home/coder/wordpress/wp-content`. In the opened terminal, check:

```bash
pwd
ls -la
```

Confirm the actual files and whether the session targets live or staging. Do not create an assumed `/bitnami/stagewordpress` path to make an old command work. Changes in a live workspace can affect the site; test risky changes in an explicitly provisioned test environment.

## Use the editor and terminal

Open a file through the explorer or quick-open command, inspect the diff, save the intended edit, then verify the actual site. Browser/OS keyboard shortcuts vary; the command palette and menus are alternatives when a shortcut is intercepted.

Read-only WP-CLI commands such as `wp core version` and `wp plugin list` require the intended WordPress path and installed tools. Check `wp --info` and command-specific help. A shell being available does not authorize a database import, a plugin update or a host package upgrade.

## Extensions and configuration

Code-server uses a compatible extension environment, not an assurance that the complete Microsoft marketplace or every desktop extension is available. Inspect the installed extension list and the configured gallery. Install only a trusted, compatible extension or VSIX that you are entitled to use, then verify its required language server/debugger.

Do not edit or commit platform-managed secrets in `wp-config.php`. For supported repository settings, use the allowlisted `wp-config-overrides.php` mechanism described in [Git Sync setup]({{< relref "products/git-sync/get-started/index.md" >}}).

## Close and verify

Record the changed files and operation result. A saved editor buffer, Git commit and deployed application are different states. Check the target page, logs and any database behavior affected. Editor leases and deployment policy determine session lifetime; do not treat closing the browser as a verified server shutdown or subscription cancellation.
