---
title: Choose the right site template
description: Choose the content and publishing model before picking a visual starter.
tags:
- sitebay
- getting-started
- templates
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- choose a template
- sitebay documentation
slug: choose-a-template
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- templates
- wp-theme
- shopify-theme
modified: 2026-10-07
---

Choose the content and publishing model before picking a visual starter. Inspect the current catalog and the installed source rather than assuming a named theme is available on every plan.

## WordPress

Choose WordPress when posts, pages, plugins and administrator editing are central to the project. Plan for PHP/database compatibility, updates and backups. A theme controls presentation; content and plugin settings can also live in the database. [The WordPress guide]({{< relref "themes/wordpress/index.md" >}}) explains the parent/child and assisted-zone model.

## Shopify

Choose a Shopify storefront when the existing Shopify product, cart and checkout workflows are the intended commerce system. Use the supported store connection and preview theme; WordPress Git or database restoration does not back up Shopify orders. Follow [the Shopify theme guide]({{< relref "themes/shopify/index.md" >}}).

## Static hosting

Choose a static starter when generated files meet the site's needs. Verify routing, build output, forms and any backend dependency. A static bundle cannot keep an embedded API secret private. See [the static template checklist]({{< relref "themes/static/index.md" >}}).

## Compare before applying

Preview the starter, confirm the license and required plugins/services, and record the target environment. Applying a template can replace existing site content, so preserve a suitable checkpoint first. Ask an assistant to explain the proposed change and wait for approval rather than applying whichever starter looks closest in a screenshot.
