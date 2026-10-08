---
slug: insights
description: An insight answers a specific question about your event data. Define the question before choosing a
  chart.
keywords:
- posthog
- insights
- analytics
- sitebay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Create an analytics insight
tags:
- sitebay
aliases:
- /quick-answers/sitebay/insights/
- /products/posthog/product-analytics/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- analytics-ui
---

An insight answers a specific question about your event data. Define the question before choosing a chart.

## Build the query

Select the analytics project and the event or action you want to measure. Set the date range, aggregation, filters, and breakdown. For a conversion question, define the steps and conversion window rather than comparing unrelated totals.

## Check the result

Inspect a small, known set of events. Confirm that the chart counts the intended action and that filters include the correct site and environment. Empty results can mean missing data or a filter mismatch, not necessarily no activity.

## Save the context

Give the insight a descriptive name. Include the event definition, important filters, and interpretation in the description or a notebook. Add the insight to a dashboard when it is useful for repeated review.

Continue with [Dashboards]({{< relref "products/posthog/dashboards/index.md" >}}) or [Notebooks]({{< relref "products/posthog/notebooks/index.md" >}}).
