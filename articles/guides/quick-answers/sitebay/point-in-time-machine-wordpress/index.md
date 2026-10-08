---
slug: point-in-time-machine-wordpress
description: Identify the last known acceptable state and the content created since it. A restore can replace newer
  data as well as undo the fault.
keywords:
- SiteBay WordPress recovery
- point-in-time recovery
- WordPress backup
- data restoration
tags:
- sitebay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Recover WordPress to an available point
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- lifecycle
- git-sync
---

Identify the last known acceptable state and the content created since it. A restore can replace newer data as well as undo the fault.

## Inspect the evidence

Review the site's date scrubber, Git commits, database activity, checkpoints and upload changes. Internal Git-backed history can exist without an external provider connection. Distinguish “no recorded changes” from “the query failed” or “no backup is available yet.”

## Prepare the recovery

Choose the supported action with the smallest appropriate scope. Preserve a current checkpoint and verify the live/staging target before approval. A manual Git file rollback does not also restore WordPress database state. A restore after a security incident requires a separately reviewed clean source.

## Verify completion

Retain the operation ID and recovery handle, wait for the result and test the real application. The higher-level restore intent supplies a protective checkpoint; a low-level restore request should not be assumed to do the same. Do not promise automatic zero-downtime or unlimited rollback.

Follow [the full Time Machine procedure]({{< relref "products/time-machine/get-started-with-pit-machine/index.md" >}}) for current UI and result checks.
