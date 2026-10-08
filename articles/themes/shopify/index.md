---
title: Customize the SiteBay Shopify theme
description: The inspected SiteBay Shopify source is an Online Store 2.0 theme.
tags:
- sitebay
- shopify
- themes
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- sitebay shopify theme
- sitebay documentation
slug: shopify
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- shopify-theme
- shopify
modified: 2026-10-08
---

The inspected SiteBay Shopify source is an Online Store 2.0 theme. Its Liquid sections, JSON templates and theme settings are different from WordPress PHP templates and child themes.

## Work on a preview copy

Identify the currently published theme and create or select an unpublished duplicate through the supported Shopify flow. Edit the preview copy and keep the previous published version available. Theme publication is an explicit change, not a side effect to assume from connecting the store.

## Read the actual settings

The inspected `settings_schema.json` defines `color_primary`, `color_accent`, `color_text`, `color_bg`, `color_bg_alt` and `color_border`. Its primary default is `#1a1a2e` and accent default is `#e94560`; those differ from the WordPress generated token palette. Existing merchant settings can override defaults. Read the installed theme and saved values rather than copying a supposedly universal palette.

## Sections and zones

Use the theme editor for the current section settings and blocks. Source changes live in `sections/`, template JSON and theme assets. Zone markers connect a section's identity with assisted selection; retain them when changing markup. Changing a schema default does not necessarily replace an already saved merchant setting.

## Provider operations

Use current authorized Shopify theme operations and the advertised client/tool contract. Use an API version supported by the connected application. A theme write, preview and publication are separate steps. WordPress CLI commands do not manage a Shopify store.

## Verify before publishing

Test product, collection, cart, navigation and responsive views with the intended preview theme. A successful file upload or screenshot is not a checkout qualification. Obtain approval before publishing, then inspect the public storefront and retain the prior theme for recovery.

For store connection scope, see [Shopify Link]({{< relref "products/shopify-link/get-started/index.md" >}}).
