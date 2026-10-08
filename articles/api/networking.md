---
title: Site networking scope
slug: networking
authors:
- SiteBay
contributors:
- SiteBay
description: The hosting API exposes site DNS, hostname and related settings; it is not an upstream account-level
  networking fabric API.
keywords:
- networking
- sitebay documentation
published: 2026-10-08
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
modified: 2026-10-07
deprecated: true
---

The hosting API exposes site DNS, hostname and related settings; it is not an upstream account-level networking fabric API. Changing DNS alone does not authorize a platform ingress or move a running database.

## Current documentation

Continue with [the relevant SiteBay guide]({{< relref "api/domains.md" >}}). This page is retained to explain an obsolete imported API label rather than advertising unsupported operations.

Before adapting an old code sample, check its API host, path prefix, authentication scheme, resource identifier, and expected response. A provider-specific example cannot be made into a SiteBay request by changing the hostname alone. Escalate an absent capability rather than retrying unrelated destructive operations.
