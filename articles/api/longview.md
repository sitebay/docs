---
title: Monitoring API scope
slug: longview
authors:
- SiteBay
contributors:
- SiteBay
description: The upstream Longview tag is not a current SiteBay monitoring contract.
keywords:
- longview
- sitebay documentation
published: 2026-10-08
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
modified: 2026-10-07
deprecated: true
---

The upstream Longview tag is not a current SiteBay monitoring contract. Use the site monitoring, logs, and analytics interfaces available to the authenticated team. No Longview agent installation is required by this reference.

## Current documentation

Continue with [the relevant SiteBay guide]({{< relref "platform/monitoring/_index.md" >}}). This page is retained to explain an obsolete imported API label rather than advertising unsupported operations.

Before adapting an old code sample, check its API host, path prefix, authentication scheme, resource identifier, and expected response. A provider-specific example cannot be made into a SiteBay request by changing the hostname alone. Escalate an absent capability rather than retrying unrelated destructive operations.
