---
title: "Canvas"
description: "How SiteBay Canvas picks and edits template surfaces."
tags: ["sitebay", "canvas", "templates"]
published: 2026-04-28
---

# Canvas

Canvas is the SiteBay editing surface used by template previews and assisted editing. It exposes provider contracts for WordPress, Shopify, and static sites so the app can use the correct routes and capabilities.

<!-- screenshot: TODO -->

## Template Surface

Every template should expose the same top-level section names:

- Hero
- Features
- Pricing
- Blog
- Contact

This consistency lets SiteBay, Sorti, and docs describe templates the same way.

## Providers

Canvas supports these provider families:

- WordPress
- Shopify
- Static sites

Each provider advertises its routes, events, and whether live DOM editing is available.

## Pick A Template

Start with [Choose a template](/docs/getting-started/choose-a-template/) if you are not sure which provider fits your site.

## Use Sorti

Sorti can help pick a template, explain a section, or start a customization flow from voice. See [Sorti](/docs/sorti/).
