---
slug: beginners-guide-to-wordpress-2
description: Choose the smallest extension that supports the content and behavior your site needs.
keywords:
- wordpress advanced
- custom post types
- custom fields
- optimization
tags:
- wordpress
- advanced
- optimization
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-29
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Extend a WordPress site
concentrations:
- WordPress
aliases:
- beginners-guide-to-wordpress-introduction-2/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- wp-basics
- wp-security
---

Choose the smallest extension that supports the content and behavior your site needs.

## Model the content

Use posts and pages when they fit. A custom post type can represent another kind of content; a taxonomy groups it, and custom fields store additional properties. Define how the content will be edited and displayed before adding fields.

## Separate behavior from appearance

Keep reusable functionality in a plugin and presentation in the theme where appropriate. Avoid editing WordPress core files. Review update compatibility and the data a plugin creates before depending on it.

## Measure performance

Reproduce a slow page and identify the work it performs. Check large images, expensive queries, external requests, and cache behavior. Plugin count alone does not measure performance.

## Verify the change

Test content editing, public rendering, permissions, and the affected integration in staging. Keep a recovery point and record the change you intend to publish.

Start with [PHP for WordPress]({{< relref "guides/development/php/beginners-guide-to-php-wordpress-developers/index.md" >}}) and [WordPress plugin documentation](https://developer.wordpress.org/plugins/).
