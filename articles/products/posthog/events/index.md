---
slug: events
description: An event records an action with a timestamp and properties. Use events to verify tracking and define
  the actions your reports measure.
keywords:
- PostHog
- events
- tracking
- sitebay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-19
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Inspect analytics events
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- analytics-ui
---

An event records an action with a timestamp and properties. Use events to verify tracking and define the actions your reports measure.

## Inspect an event

Open the event view in the selected analytics project. Filter by event name and time, then open a record. Check the URL, distinct identifier, environment, and properties relevant to the action.

Perform the same action in a test session and compare the resulting record. A page-view event does not prove that a payment, signup, or server-side operation completed.

## Name custom events consistently

Choose a stable name such as `checkout_completed`. Send the event only when that action succeeds. Keep property names and types consistent, and avoid passwords, access tokens, or unnecessary personal information.

## Build a report

Use a verified event in an insight. Compare counts with the underlying business action before relying on the metric.

See [Data management]({{< relref "products/posthog/data-management/index.md" >}}) for event definitions and properties.
