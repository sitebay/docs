---
slug: benefits-of-wordpress-on-kubernetes
description: SiteBay uses Kubernetes to run WordPress workloads and manage their lifecycle. Site storage and application
  state remain important even when a workload is replaced.
keywords:
- kubernetes
- wordpress
- container
- deployment
tags:
- wordpress
- kubernetes
- deployment
- container
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified_by:
  name: SiteBay
modified: 2026-10-07
published: 2024-04-27
image: DeployNGINX_SiteBay.png
title: WordPress hosting on Kubernetes
aliases:
- /kubernetes/wordpress/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- platform-architecture
- lifecycle
---

SiteBay uses Kubernetes to run WordPress workloads and manage their lifecycle. Site storage and application state remain important even when a workload is replaced.

## Responsibilities

SiteBay manages the hosting infrastructure. You manage WordPress content, plugins, themes, access, and the site operations permitted by your account.

Kubernetes is not itself a backup, an application test, or a guarantee of uninterrupted service. Review available recovery points and verify WordPress after deployments or restores.

See [How SiteBay hosting fits together]({{< relref "products/platform/architecture/index.md" >}}).
