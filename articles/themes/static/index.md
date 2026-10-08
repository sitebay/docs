---
title: Prepare a static-site template
description: A static site publishes generated or hand-authored files. It does not run WordPress PHP or provide
  a WordPress database merely because its visual style resembles the SiteBay theme.
tags:
- sitebay
- static
- netlify
- themes
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- sitebay static template
- sitebay documentation
slug: static
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- templates
- shopify-theme
- wp-theme
modified: 2026-10-07
---

A static site publishes generated or hand-authored files. It does not run WordPress PHP or provide a WordPress database merely because its visual style resembles the SiteBay theme.

## Inspect the selected starter

Choose a starter that the current host/catalog actually offers. Read its file tree and build configuration to identify the entry page, stylesheets, scripts, output directory and required runtime. The historical `sitebay-static-template` name and a fixed five-section list do not establish the current repository layout or deployment contract.

## Customize without leaking secrets

Edit the starter's documented content and design settings, preserving its navigation and any selection markers required by Canvas. Use its actual token names rather than assuming WordPress and Shopify expose identical defaults. Check mobile layouts, text contrast, link destinations and image loading.

A variable substituted at build time can become visible in the published HTML or JavaScript. Never embed an administrator API key, private bearer credential or server secret in a static bundle. Private integrations require an appropriately authenticated backend or provider function.

## Build and inspect

Run the repository's documented build in a clean checkout and inspect the output directory. Verify the base URL, nested routes, redirects and 404 behavior. A development server succeeding does not prove that the exported directory works on the chosen host.

## Publish deliberately

Connect the intended repository and branch through the host's supported workflow. Verify its deploy result and production domain/HTTPS before accepting it. Keep the previous deploy or version for rollback. A Git push or theme preview alone is not proof of a published website.

See [choosing a site type]({{< relref "getting-started/choose-a-template.md" >}}) before migrating a dynamic WordPress workflow into a static project.
