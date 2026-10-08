---
slug: sitebay-theme
description: 'Choose the theme implementation that matches the target: WordPress, Shopify and static hosting have
  different editing and publishing contracts.'
keywords:
- sitebay theme
- ai-friendly
- wordpress theme
- css tokens
- utility classes
- design system
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-12
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Build on the SiteBay theme
bible: true
tags:
- sitebay
- theme
- wordpress
- ai
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- wp-theme
- shopify-theme
- wp-agent-plugin
---

Choose the theme implementation that matches the target: WordPress, Shopify and static hosting have different editing and publishing contracts. A shared brand does not make their token names, field storage or deployment operations identical.

## WordPress

Inspect the installed parent and use a child theme for site-specific changes. The parent folder is `sitebay`, not the repository name `sitebaywp-theme`. Preserve zone/field markers used by the permissioned editing plugin, and keep generated token files under their source workflow.

Follow [WordPress customization]({{< relref "themes/wordpress/index.md" >}}) for the child header, actual token vocabulary and validation steps.

## Shopify

Use an unpublished theme copy, inspect saved merchant settings, and edit its sections and JSON templates. A schema default is not guaranteed to overwrite a saved setting. Preview and publication require separate checks. See [Shopify customization]({{< relref "themes/shopify/index.md" >}}).

## Assisted design

Give the assistant a specific target and permitted scope, such as changing one hero section on a preview copy. Review the diff and the rendered result at multiple widths before approval. An image can guide visual work but does not establish exact source values or authorize copying assets you cannot use.

This workflow does not promise instant deployment, zero framework cost, perfect reconstruction or that an AI change can never break layout. Preserve a recovery point, test interactions as well as appearance, and verify the saved published result.
