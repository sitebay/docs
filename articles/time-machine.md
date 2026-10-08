---
title: Inspect Time Machine before restoring
date: 2026-04-28
tags:
- sitebay
- wordpress
- backups
authors:
- SiteBay
contributors:
- SiteBay
description: The calendar and file history are investigation tools. Inspecting a date does not itself restore the
  site.
keywords:
- time machine
- sitebay documentation
published: 2026-04-28
slug: time-machine
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- site-ui
- lifecycle
- git-sync
modified: 2026-10-07
---

The calendar and file history are investigation tools. Inspecting a date does not itself restore the site.

## Inspect the evidence

Review the site's date scrubber, Git commits, database activity, checkpoints and upload changes. Internal Git-backed history can exist without an external provider connection. Distinguish “no recorded changes” from “the query failed” or “no backup is available yet.”

## Prepare the recovery

Choose the supported action with the smallest appropriate scope. Preserve a current checkpoint and verify the live/staging target before approval. A manual Git file rollback does not also restore WordPress database state. A restore after a security incident requires a separately reviewed clean source.

## Verify completion

Retain the operation ID and recovery handle, wait for the result and test the real application. The higher-level restore intent supplies a protective checkpoint; a low-level restore request should not be assumed to do the same. Do not promise automatic zero-downtime or unlimited rollback.

Follow [the full Time Machine procedure]({{< relref "products/time-machine/get-started-with-pit-machine/index.md" >}}) for current UI and result checks.
