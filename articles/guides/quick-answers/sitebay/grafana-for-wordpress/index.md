---
slug: grafana-for-wordpress
description: Use the monitoring entry provided for your account. SiteBay includes a Grafana authorization integration,
  but access and available dashboards depend on the deployed configuration.
keywords:
- grafana
- monitoring
- analytics
tags:
- grafana
- wordpress
- sitebay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases:
- /quick-answers/sitebay/grafana-for-wordpress/
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Read monitoring dashboards
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- grafana
- site-ui
- analytics-ui
---

Use the monitoring entry provided for your account. SiteBay includes a Grafana authorization integration, but access and available dashboards depend on the deployed configuration.

## Set the scope

Confirm the organization, site, time range, and dashboard variables. Inspect the panel's query and units before interpreting a spike or an empty chart.

## Investigate a symptom

Compare the observation with site history and the failing request. A resource graph does not establish whether a visitor completed a business action; use analytics for captured application events.

## Report the finding

Share the relevant time range, metric, and site with support. Do not publish private dashboard links or embedded credentials.

See [site status]({{< relref "products/platform/get-started/guides/status-page/index.md" >}}) and [analytics]({{< relref "products/posthog/get-started/index.md" >}}).
