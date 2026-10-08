---
title: "SiteBay Static Template"
description: "Deploy and customize the SiteBay static template."
tags: ["sitebay", "static", "netlify", "themes"]
published: 2026-04-28
---

# SiteBay Static Template

The SiteBay static template is a lightweight starter for static hosting. It uses the same token names and section surface as the WordPress and Shopify templates.

<!-- screenshot: TODO -->

## Deploy

1. Create a site from the static template.
2. Connect the repository to your static host.
3. Set the production domain.
4. Publish the generated site.

## Customize

Edit `style.css` for colors, spacing, radii, and typography. The root CSS variables map to the SiteBay token set.

Required sections:

- Hero
- Features
- Pricing
- Blog
- Contact

## Environment Variables

Static sites usually do not require runtime environment variables. Add host-specific variables only when a form provider, analytics tool, or API integration needs them.

## Voice Setup With Sorti

Prefer to do this with voice? Open [Sorti](/docs/sorti/) and ask it to help adapt the static template for your site.
