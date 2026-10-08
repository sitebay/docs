---
title: Kubernetes cluster administration
slug: sitebay-kubernetes-engine-lke
authors:
- SiteBay
contributors:
- SiteBay
description: SiteBay uses infrastructure behind the hosting service, but this does not grant customers a Linode
  Kubernetes Engine cluster or its administration API.
keywords:
- sitebay kubernetes engine (lke)
- sitebay documentation
published: 2026-10-08
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
modified: 2026-10-07
deprecated: true
---

SiteBay uses infrastructure behind the hosting service, but this does not grant customers a Linode Kubernetes Engine cluster or its administration API. Do not run provider cluster commands against the SiteBay API.

## Current documentation

Continue with [the relevant SiteBay guide]({{< relref "products/platform/architecture/index.md" >}}). This page is retained to explain an obsolete imported API label rather than advertising unsupported operations.

Before adapting an old code sample, check its API host, path prefix, authentication scheme, resource identifier, and expected response. A provider-specific example cannot be made into a SiteBay request by changing the hostname alone. Escalate an absent capability rather than retrying unrelated destructive operations.
