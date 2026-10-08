---
slug: pros-and-cons-of-site-bay
description: Choose a development environment based on the access, deployment, and recovery workflow your project
  needs.
og_description: Choose a development environment based on the access, deployment, and recovery workflow your project
  needs.
keywords:
- pros and cons of SiteBay
- advantages of SiteBay
- benefits of SiteBay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified_by:
  name: SiteBay
title_meta: Evaluate SiteBay for WordPress development
title: Evaluate SiteBay for WordPress development
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- platform-architecture
- code-server
- git-sync
- lifecycle
modified: 2026-10-07
---

Choose a development environment based on the access, deployment, and recovery workflow your project needs.

## What SiteBay provides

SiteBay provides a managed WordPress environment with code-server, Git Sync, staging, and site recovery tools. These tools let you edit code, review a change away from the live site, and inspect deployment or recovery status.

## What to check first

A hosted WordPress account is not a general-purpose virtual machine. Check the required PHP extensions, background work, database access, external services, and plan limits before migrating an application. Confirm that a staging copy is suitable for your tests and cannot send real customer messages or payments.

## Try a representative change

Create a test site, deploy a small theme change, and verify both the public page and WordPress administration. Test the recovery path as well as the successful deployment path.

Compare the result with your local workflow rather than relying on a claimed speed improvement. Start with [the platform architecture]({{< relref "products/platform/architecture/index.md" >}}).
