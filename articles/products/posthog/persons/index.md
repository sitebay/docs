---
slug: persons
description: A person profile groups events and properties associated with an analytics identity. It is not automatically
  the same as a WordPress account or a billing customer.
keywords:
- PostHog
- users
- analytics
- sitebay
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-18
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Inspect people in analytics
tags:
- sitebay
- analytics
- PostHog
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- analytics-ui
---

A person profile groups events and properties associated with an analytics identity. It is not automatically the same as a WordPress account or a billing customer.

## Open a profile

Find a person through the people view or an event's identity. Review the identifiers, properties, and event history. Check whether the record belongs to the intended site and environment.

## Investigate identity problems

Compare the identifier before and after sign-in. Inconsistent identification can split one person's activity across profiles or associate activity incorrectly. Test the application's identification flow before changing or merging records.

## Handle data carefully

Profile data may contain personal information. Limit access and collect only the properties needed for the analysis. Review the consequences before using any deletion or merge action.

See [Events]({{< relref "products/posthog/events/index.md" >}}) to trace the records behind a profile.
