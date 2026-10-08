---
slug: session-replay
description: Session replay reconstructs a recorded visitor interaction. It helps explain an observed problem, but
  it does not record every session automatically.
keywords:
- posthog
- session replay
- recordings
- sitebay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Review a session recording
bible: true
tags:
- sitebay
- posthog
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- analytics-ui
---

Session replay reconstructs a recorded visitor interaction. It helps explain an observed problem, but it does not record every session automatically.

## Check collection settings

Select the correct analytics project. Confirm that recordings are enabled where intended and review masking, sampling, and capture settings. Test with non-sensitive data before relying on the configuration.

## Find a recording

Filter recordings by time and the available event or page criteria. Open a matching session, inspect the timeline, and reproduce the relevant steps in a test environment. A missing recording may reflect collection settings rather than an absence of visitors.

## Share the evidence

Share only with people who should see the recorded data. Include the relevant time in the recording and the expected behavior. Keep secrets and sensitive content out of screenshots and issue reports.

Use [Events]({{< relref "products/posthog/events/index.md" >}}) to compare the replay with the recorded action.
