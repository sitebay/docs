---
slug: all-sitebays-kvm-shortguide
description: SiteBay runs WordPress workloads in Kubernetes. A site account manages its site through the dashboard
  and documented API, not through cluster-administration commands.
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Site isolation
headless: true
show_on_rss_feed: false
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- all sitebay environments use kubernetes
- sitebay documentation
doc_sources:
- platform-architecture
- lifecycle
---

SiteBay runs WordPress workloads in Kubernetes. A site account manages its site through the dashboard and documented API, not through cluster-administration commands.

Container isolation does not imply dedicated physical hardware. Check your plan's resources and inspect the site's status when diagnosing performance.
