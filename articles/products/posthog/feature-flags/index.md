---
slug: feature-flags
description: Use a feature flag to control a code path for a selected audience. Creating a flag does not change
  an application unless the application evaluates that flag.
keywords:
- feature flags
- A/B testing
- sitebay
- posthog
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-27
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Create a feature flag
tags:
- sitebay
- feature flags
- A/B testing
aliases:
- /quick-answers/sitebay/how-to-use-feature-flags/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- analytics-ui
---

Use a feature flag to control a code path for a selected audience. Creating a flag does not change an application unless the application evaluates that flag.

## Define the flag

Choose a stable key and explain what it controls. Configure the release conditions and, when needed, variants and their rollout percentages. Review the intended audience before saving.

## Connect the application

Evaluate the same key in the application using its configured analytics integration. Define the behavior when the flag is unavailable. Keep authorization and payment checks on the server; a client-side flag is not an access-control boundary.

## Test the rollout

Use test identities to verify both enabled and disabled behavior. Check variant allocation and relevant events before widening the audience. Keep a clear path to disable the feature.

See [Events]({{< relref "products/posthog/events/index.md" >}}) to verify the behavior a flag is meant to change.
