---
slug: what-is-high-availability
author:
  name: SiteBay
  email: support@sitebay.org
description: High availability reduces service interruption by avoiding single points of failure. It is different
  from backup and disaster recovery.
keywords:
- high availability
- hosting
- website
tags:
- wordpress
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Understand high availability
image: HighAvailability.png
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- platform-architecture
- lifecycle
---

High availability reduces service interruption by avoiding single points of failure. It is different from backup and disaster recovery.

For a WordPress site, availability depends on the web application, database, storage, DNS, network, and external integrations. More than one application instance does not by itself protect all of these dependencies.

## Check your requirements

Define acceptable downtime and data loss separately. Ask which failures the hosting arrangement handles, how recovery works, and how it is tested. Verify recovery points before relying on them.

On SiteBay, inspect the site's current state through [the lifecycle tools]({{< relref "products/platform/site-lifecycle/index.md" >}}). A healthy status describes the current observation; it is not an uptime guarantee.
