---
title: WordPress database access
slug: databases
authors:
- SiteBay
contributors:
- SiteBay
description: This historical managed-database tag must not be read as a standalone database provisioning service.
keywords:
- managed databases
- sitebay documentation
published: 2026-10-08
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
modified: 2026-10-07
deprecated: true
---

This historical managed-database tag must not be read as a standalone database provisioning service. SiteBay site management and an authorized WordPress database session have different interfaces. Use the database tools for the selected site and verify changes on a test copy.

## Current documentation

Continue with [the relevant SiteBay guide]({{< relref "guides/databases/mysql/_index.md" >}}). This page is retained to explain an obsolete imported API label rather than advertising unsupported operations.

Before adapting an old code sample, check its API host, path prefix, authentication scheme, resource identifier, and expected response. A provider-specific example cannot be made into a SiteBay request by changing the hostname alone. Escalate an absent capability rather than retrying unrelated destructive operations.
