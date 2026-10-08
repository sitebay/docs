---
slug: grafana-analytics-fast-as-possible
description: Use the monitoring entry provided for your account. SiteBay includes a Grafana authorization integration,
  but access and available dashboards depend on the deployed configuration.
keywords:
- dns
- members.sitebay.org
- reverse dns
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-13
modified_by:
  name: SiteBay
title: Use Grafana with SiteBay
title_meta: Use Grafana with SiteBay
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- grafana
- site-ui
- analytics-ui
modified: 2026-10-07
---

Use the monitoring entry provided for your account. SiteBay includes a Grafana authorization integration, but access and available dashboards depend on the deployed configuration.

## Set the scope

Confirm the organization, site, time range, and dashboard variables. Inspect the panel's query and units before interpreting a spike or an empty chart.

## Investigate a symptom

Compare the observation with site history and the failing request. A resource graph does not establish whether a visitor completed a business action; use analytics for captured application events.

## Report the finding

Share the relevant time range, metric, and site with support. Do not publish private dashboard links or embedded credentials.

See [site status]({{< relref "products/platform/get-started/guides/status-page/index.md" >}}) and [analytics]({{< relref "products/posthog/get-started/index.md" >}}).
