---
slug: introduction-to-sitebay-regions
description: Understand SiteBay's global infrastructure regions and how to choose the right location for your WordPress
  site.
keywords:
- regions
- data centers
- locations
- us west
- eu central
- latency
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-08
modified_by:
  name: SiteBay
title: Choose an available SiteBay region
bible: true
tags:
- sitebay
- infrastructure
- regions
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- regions
- api-contract
---

Choose from the region catalog returned by SiteBay rather than an old list of global locations. A provider having a data center in a city does not establish that your SiteBay plan can deploy there.

## Read the catalog

```sh
curl --fail-with-body --silent --show-error \
  https://my.sitebay.org/f/api/v1/region
```

The response is an array of region records. Use the returned ID or configured region name where the operation requires it; `GET /f/api/v1/region/{region_id}` reads one region and returns not found for an unknown ID. Omission of a region name during site creation uses the account's default region, not a guessed nearest city.

## Match the region to the workload

Check deployment availability in the create-site flow. Consider your audience, required data location, and the latency of databases or services the site calls. An edge cache and an origin region serve different roles: a nearby cache does not move a dynamic WordPress database.

## Confirm after creation

Inspect the returned site record and readiness. Changing an existing site's region is not equivalent to changing a browser preference or a DNS record; plan a supported migration and verify the destination before cutover. Review the supported migration method and any expected downtime.
