---
slug: troubleshooting-wordpress-on-kubernetes
description: Start with the selected site's status and the failing user action. A WordPress error is not always
  a Kubernetes problem.
keywords:
- kubernetes
- wordpress
- troubleshooting
- nginx
- SiteBay
tags:
- wordpress
- kubernetes
- nginx
- SiteBay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified_by:
  name: SiteBay
modified: 2026-10-07
published: 2024-04-27
image: DeployNGINX_SiteBay.png
title: Troubleshoot a hosted WordPress site
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- platform-architecture
- lifecycle
- site-ui
---

Start with the selected site's status and the failing user action. A WordPress error is not always a Kubernetes problem.

## Collect a small reproduction

Record the domain, environment, time, URL, and visible error. Test whether the public site and WordPress administration fail in the same way. Inspect the site history for a recent deployment or restore.

## Use site-level tools

Read the available logs and check the affected plugin, theme, or integration. Review changes in staging before disabling components on the live site. Keep credentials and customer data out of shared logs.

## Escalate an infrastructure problem

Send support the site identifier, operation ID, time, and reproduction. Cluster operations belong to the hosting operator; site access does not authorize changes to shared Kubernetes resources.

Use [Support]({{< relref "products/platform/get-started/guides/support/index.md" >}}) for the escalation path.
