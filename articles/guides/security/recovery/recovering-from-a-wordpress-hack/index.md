---
slug: recovering-from-a-wordpress-hack
author:
  name: SiteBay
  email: support@sitebay.org
description: Treat a suspected compromise as an investigation, not only a broken page to restore.
keywords:
- root compromise
- troubleshooting
- recovery
- security
tags:
- security
- resolving
- My SiteBay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases:
- /security/recovery/recovering-from-a-system-compromise/
- /troubleshooting/compromise-recovery/
- /security/recovering-from-a-system-compromise/
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-26
title: Recover from a suspected compromise
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- wp-security
- lifecycle
---

Treat a suspected compromise as an investigation, not only a broken page to restore.

## Preserve evidence

Record the affected site, symptoms, timestamps, and recent changes. Preserve relevant logs and a copy of the current state before cleanup where possible. Keep that material private.

## Contain and repair

Coordinate with the hosting operator when access or shared infrastructure may be affected. Review accounts, credentials, plugins, themes, and modified files. Replace compromised software from trusted sources and address the entry point.

## Restore deliberately

Choose a recovery point that predates the compromise, while accounting for newer orders, uploads, and content. A restore can discard legitimate changes and can reintroduce the same vulnerability if its cause remains.

## Verify

Check the public site, administration, integrations, and access. Rotate affected credentials from a trusted device and continue monitoring. A vulnerability scan is one input, not complete malware clearance.

Use the [WordPress incident guide](https://wordpress.org/documentation/article/faq-my-site-was-hacked/) and [SiteBay support]({{< relref "products/platform/get-started/guides/support/index.md" >}}) when the scope is uncertain.
