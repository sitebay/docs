---
title: Time Machine
linkTitle: Time Machine
title_meta: Time Machine
description: Use Time Machine to relate activity, file/database changes and the recovery action you intend to perform.
cascade:
  date: 2024-04-04
  product_description: The SiteBay Point-in-Time Machine Service is a feature included on all plans that automatically
    backs up your files and database every minute. Your site's wp-content and database can be recovered in a snap.
modified: 2026-10-07
aliases:
- /products/pit-machine/
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- point-in-time machine
- sitebay documentation
published: 2025-03-18
slug: time-machine
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- site-ui
- lifecycle
- git-sync
layout: documentation-section
---

Use Time Machine to relate activity, file/database changes and the recovery action you intend to perform.

## Inspect the evidence

Review the site's date scrubber, Git commits, database activity, checkpoints and upload changes. Internal Git-backed history can exist without an external provider connection. Distinguish “no recorded changes” from “the query failed” or “no backup is available yet.”

## Prepare the recovery

Choose the supported action with the smallest appropriate scope. Preserve a current checkpoint and verify the live/staging target before approval. A manual Git file rollback does not also restore WordPress database state. A restore after a security incident requires a separately reviewed clean source.

## Verify completion

Retain the operation ID and recovery handle, wait for the result and test the real application. The higher-level restore intent supplies a protective checkpoint; a low-level restore request should not be assumed to do the same. Do not promise automatic zero-downtime or unlimited rollback.

Follow [the full Time Machine procedure]({{< relref "products/time-machine/get-started-with-pit-machine/index.md" >}}) for current UI and result checks.

{{< section-links >}}
