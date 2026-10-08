---
slug: posthog-analytics
description: Use the analytics project connected to the site you want to measure. Confirm data collection before
  building reports.
keywords:
- posthog
- analytics
- session replay
- feature flags
- sitebay integration
- data
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-12
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Set up analytics on SiteBay
bible: true
tags:
- sitebay
- posthog
- analytics
- data
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- analytics-ui
---

Use the analytics project connected to the site you want to measure. Confirm data collection before building reports.

## Verify one event

Open the site's analytics project and visit a public page in a separate browser session. Inspect recent events for the expected page, time, and environment. If no event appears, check the tracking configuration, browser blocking, and consent behavior before installing a second tracker.

## Choose a question

Use web analytics for traffic and page performance. Use events and insights for actions such as signups or checkout. Use session replay to investigate a recorded interaction, not as a substitute for event counts.

## Protect visitor data

Review collection settings before enabling additional capture. Exclude secrets and sensitive form content. Check a test session to confirm the intended masking and access settings.

Start with [Events]({{< relref "products/posthog/events/index.md" >}}), then save a useful [Insight]({{< relref "products/posthog/insights/index.md" >}}).
