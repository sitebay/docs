---
slug: wordpress-logging-and-monitoring
author:
  name: SiteBay
description: Use logs to investigate a specific request, error, or site operation. Analytics and session replay
  answer different questions from server logs.
keywords:
- wordpress monitoring tools
- nginx logs
tags:
- logging
- security
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-29
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Inspect logs and monitoring
aliases:
- /security/monitoring/wordpress-logging-and-monitoring/
image: wordpress-logging-and-monitoring.png
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- analytics-ui
- lifecycle
---

Use logs to investigate a specific request, error, or site operation. Analytics and session replay answer different questions from server logs.

## Narrow the problem

Record the site, environment, time, URL, and expected result. Inspect the relevant logs around that time and compare the error with recent site history.

Look for a reproducible sequence rather than treating every failed request as an attack. A successful HTTP response also does not establish that a business operation completed correctly.

## Choose the right view

Use site history for deployments and recovery operations. Use analytics for captured visitor events and recordings. Use infrastructure monitoring, when available to your account, for resource and service observations.

## Share only what is needed

Include a small redacted excerpt when asking for help. Remove tokens, passwords, private request data, and unrelated visitor information. See [Support]({{< relref "products/platform/get-started/guides/support/index.md" >}}) for the report checklist.
