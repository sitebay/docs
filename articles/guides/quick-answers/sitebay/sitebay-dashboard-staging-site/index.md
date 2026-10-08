---
slug: sitebay-staging-sites
description: Staging provides a separate environment for testing changes.
keywords:
- staging
- testing
- development environment
- clone
- wordpress staging
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Create and review a staging site
bible: true
tags:
- sitebay
- staging
- development
aliases:
- /quick-answers/sitebay/sitebay-dashboard-staging-site/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- lifecycle
---

Staging provides a separate environment for testing changes. It reduces some live-site risk but does not guarantee that copied plugins stop sending email, charging payments or calling external APIs.

## How to Create a Staging Site

Select the live site and inspect the staging action currently available. The UI exposes the staging tab conditionally, including when a staging copy already exists or the site is a testing site. Use the supported create action and wait for completion; do not assume a fixed URL pattern or password-protection policy without checking the resulting environment.

Record the branch, source point and staging domain. Confirm that test credentials and external integrations are configured appropriately. A canvas preview is the live site's preview mode, not this staging clone.

## Common Staging Workflows

Test one plugin/theme change at a time and exercise the affected page, form or checkout. “The home page loads” and “no captured console errors” are not complete compatibility tests. When creating from a recovery point, choose a point the site actually reports as available.

For Git-driven work, confirm the configured branch for each environment. A merge in Git and promotion of staging database/file state are distinct operations.

## Pushing Staging to Production

Review the actual promotion options and the differences they affect. In particular, replacing database state can overwrite newer orders, registrations or content from live. Retain a suitable pre-promotion checkpoint and use the confirmation contract offered by the operation.

Wait for promotion to finish, inspect live state, and test critical behavior. Do not automatically delete staging or claim an instant rollback until the result and recovery plan are accepted. See [site lifecycle]({{< relref "products/platform/site-lifecycle/index.md" >}}) and [editing staging]({{< relref "guides/code-server/managing-your-staging-site-on-code-server/index.md" >}}).
