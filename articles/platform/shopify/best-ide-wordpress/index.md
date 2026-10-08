---
title: Choose an editor for a supported workflow
authors:
- SiteBay
contributors:
- SiteBay
description: Choose the development workflow first, then an editor that supports it.
keywords:
- best ide wordpress
- sitebay documentation
published: 2025-03-18
slug: best-ide-wordpress
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- code-server
- git-sync
modified: 2026-10-08
---

Choose the development workflow first, then an editor that supports it. A local editor, SiteBay's browser code-server and a provider-hosted theme editor operate on different copies of the project.

## Requirements to check

Use an actively maintained editor with the language support, formatter, debugger and Git tools needed by the project. Verify extensions and runtime compatibility rather than assuming every desktop extension works in a browser build. Choose an editor with active maintenance and support for your environment.

## Local checkout

Use an authorized repository connection, inspect the branch and make scoped commits. A pushed commit is not proof of a completed deployment. Keep secret configuration and database exports outside the tracked project.

## Browser workspace

For code-server, open the site's authenticated workspace and verify its target. Read [the workspace procedure]({{< relref "products/code-server/get-started/index.md" >}}) for paths and extension restrictions. A browser editor does not eliminate PHP/runtime compatibility differences or automatically make an unsafe edit reversible.

## Shopify and WordPress

A Shopify theme checkout is not a WordPress `wp-content` repository and does not include store orders or billing state. Select the environment and preview the relevant application before publishing. Use [Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}) only for the source and target it actually supports.
