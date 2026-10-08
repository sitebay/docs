---
slug: kubernetes-fast-as-possible
description: Kubernetes runs the workloads behind SiteBay hosting. The SiteBay dashboard and API expose the site
  actions available to your account.
keywords:
- kubernetes
- wordpress
- deployment
- nginx
- SiteBay
tags:
- wordpress
- kubernetes
- nginx
- deployment
- SiteBay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified_by:
  name: SiteBay
modified: 2026-10-07
published: 2024-04-27
title: Kubernetes in SiteBay
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- platform-architecture
- lifecycle
---

Kubernetes runs the workloads behind SiteBay hosting. The SiteBay dashboard and API expose the site actions available to your account.

## What this means for a site owner

Your site has a lifecycle and status separate from the underlying cluster. Use the site's status and logs to identify whether a problem concerns provisioning, application behavior, or an unavailable dependency.

A site workspace does not grant cluster-administration access. Do not use a generic Kubernetes tutorial as permission to restart infrastructure or change shared resources.

For the supported operational view, read [Site lifecycle]({{< relref "products/platform/site-lifecycle/index.md" >}}).
