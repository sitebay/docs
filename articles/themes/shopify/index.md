---
title: "SiteBay Shopify Theme"
description: "Install and customize the SiteBay Shopify theme."
tags: ["sitebay", "shopify", "themes"]
published: 2026-04-28
---

# SiteBay Shopify Theme

The SiteBay Shopify theme gives stores a SiteBay-matched storefront with shared colors, typography, spacing, and editable sections.

<!-- screenshot: TODO -->

## What Is Included

- Header and footer sections
- Hero and promo grid sections
- Product, cart, and collection templates
- Theme settings for primary color, accent color, text, background, and borders
- SiteBay sensor hooks for Canvas-assisted section selection

## Customize The Theme

Open your Shopify theme customizer and start with these settings:

- Primary color: `#4F5BD5`
- Accent color: `#E85C48`
- Text color: `#13151C`
- Background: `#FFFFFF`
- Alternate background: `#F4F5F9`

Section defaults use the same SiteBay token set as the WordPress and static templates.

## Sections

Use the same top-level surface across templates:

- Hero
- Features
- Pricing
- Blog
- Contact

## Voice Setup With Sorti

Prefer to do this with voice? Open [Sorti](/docs/sorti/) and ask it to help pick or customize the Shopify theme.

## FAQs

### Can I change colors?

Yes. Use the theme settings first. Custom CSS should still reference the SiteBay token colors so the storefront stays consistent.

### Does Canvas support Shopify?

Yes. Canvas exposes a Shopify provider contract, and Sorti uses that contract to route theme preview actions.
