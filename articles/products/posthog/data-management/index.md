---
slug: data-management
description: Use data management to keep event names, properties, and actions understandable across the project.
keywords:
- sitebay
- data management
- posthog
- analytics
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases:
- /quick-answers/sitebay/how-to-use-posthog/
- /quick-answers/how-to-use-posthog/
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Manage analytics definitions
tags:
- sitebay
- posthog
- data management
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- analytics-ui
---

Use data management to keep event names, properties, and actions understandable across the project.

## Document the data

Review event and property definitions. Add a useful description, identify the owner, and clarify what triggers an event. Keep property types consistent across the code that sends them.

## Group related events

Use actions when several events should represent one meaningful behavior. Verify the matching conditions against actual records before using the action in reports.

## Change definitions carefully

Renaming a label, changing an action, and deleting stored data have different effects. Inspect the reports that depend on a definition before changing it. Do not assume that editing a definition rewrites historical events.

See [Events]({{< relref "products/posthog/events/index.md" >}}) for validation and [Insights]({{< relref "products/posthog/insights/index.md" >}}) for reporting.
