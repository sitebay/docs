---
slug: sitebay-dashboard-history
description: The **History** tab reads the activity log scoped to the site's ID.
keywords:
- sitebay
- sitebay dashboard
- site history
- site restoration
aliases:
- /quick-answers/sitebay/site-history-and-restoration/
- /quick-answers/sitebay/using-pit-machine-for-site-restoration/
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-08
modified_by:
  name: SiteBay
published: 2024-04-17
title: Read site history and recovery evidence
tags:
- sitebay
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- lifecycle
---

The **History** tab reads the activity log scoped to the site's ID. Use it to relate a reported incident to recorded actions, not as proof that every file or database edit is recoverable.

## Inspect an incident

Confirm the site and time zone, narrow the period around the problem, and identify the action, actor and available event reference. Compare that entry with the current site state and logs. A request being recorded can precede completion or failure.

## Investigate the data change

Open **Time Machine** for the separate file history, database activity and checkpoint view. Current internal Git-backed browsing does not require an external Git connection. Identify the smallest affected scope rather than restoring the whole site simply because an activity occurred nearby.

## Restore only after review

Use an actually available recovery point, retain a current protective checkpoint and account for incoming live content. After the supported operation settles, test the site and preserve the recovery handle until accepted.

See [the Time Machine workflow]({{< relref "products/time-machine/get-started-with-pit-machine/index.md" >}}). Choose a recovery point that is available for the site.
