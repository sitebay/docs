---
title: Customize the SiteBay WordPress theme safely
description: The source repository is named sitebaywp-theme, while the deployed parent theme's folder is **sitebay**.
tags:
- sitebay
- wordpress
- themes
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- sitebay wordpress theme and agent plugin
- sitebay documentation
slug: wordpress
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- wp-theme
- wp-agent-plugin
- git-sync
modified: 2026-10-08
---

The source repository is named `sitebaywp-theme`, while the deployed parent theme's folder is **`sitebay`**. Site-specific work belongs in an active child theme; editing the managed parent can be overwritten by a parent update.

## Check the installed components

In the authorized WordPress environment, inspect the active theme, parent version and installed agent plugin. The current plugin source is named **Sorti Agent Plugin**; older articles called it `sitebay-agent-plugin`. A documentation label does not prove that a particular customer site has the latest component.

## Create a child theme

Place site-specific files under a child theme directory. Its `style.css` header must identify the real parent folder:

```css
/*
Theme Name: My SiteBay Child
Template: sitebay
Version: 1.0.0
*/
```

Enqueue the child's stylesheet after the parent using WordPress's enqueue hooks. Copy only the parent templates you actually need to override; leave the reusable parent scaffold intact. Validate PHP and preview the child before activating it on live.

## Tokens and editable content

The inspected theme includes `theme.json`, `style.css` and generated `assets/css/sitebay-tokens.css`. Actual tokens include `--primary`, `--bg-page`, `--fg-1` and `--accent-warm`. Use the variables defined by the installed CSS. Keep custom overrides in the child rather than hand-editing a generated token file.

Preserve `data-sitebay-zone` and `data-sitebay-field` markers where assisted editing depends on them. The plugin distinguishes editable, suggestion-only and read-only zones. A selected region is context, not blanket write permission. Variant previews should remain authenticated; ordinary visitors should see published content.

## Verify a change

Preview at mobile and desktop sizes, inspect text contrast and keyboard behavior, and test navigation and forms. Confirm the persisted content after reloading outside preview. A screenshot alone does not verify saved state or authorize publication.

See [Canvas]({{< relref "canvas/index.md" >}}) and [Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}) for the editing and recovery boundaries.
