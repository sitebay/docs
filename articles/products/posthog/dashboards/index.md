---
slug: dashboards
description: Group related insights in a dashboard so a team can review the same question with the same context.
keywords:
- PostHog
- WordPress
- SiteBay
- analytics
- dashboards
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-30
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Build an analytics dashboard
tags:
- sitebay
- PostHog
- analytics
aliases:
- /quick-answers/sitebay/dashboards/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- analytics-ui
---

Group related insights in a dashboard so a team can review the same question with the same context.

## Add useful insights

Start with a small set of saved insights. Give each chart a clear name and arrange the charts in the order a reader should inspect them. Avoid mixing unrelated projects, environments, or definitions of the same metric.

## Review filters

Check the dashboard's date range and filters before interpreting a change. Open an individual insight to inspect its query and any filters that apply only to that chart.

## Share deliberately

Use the sharing controls available to your project. Verify what the recipient can access; copying a link does not necessarily grant permission. Do not expose private customer data in a public dashboard.

Use a [Notebook]({{< relref "products/posthog/notebooks/index.md" >}}) when the charts need an explanation, a decision, or a record of follow-up work.
