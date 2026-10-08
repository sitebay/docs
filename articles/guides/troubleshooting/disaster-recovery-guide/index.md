---
slug: disaster-recovery-tutorial
author:
  name: SiteBay
  email: support@sitebay.org
description: Identify the update and its effect before choosing a recovery operation.
keywords:
- upgrade
- wordpress
- update
tags:
- wordpress
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
deprecated: true
deprecated_link: troubleshooting/troubleshooting-basic-connection-issues/
published: 2024-04-27
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Recover after a failed update
aliases:
- /troubleshooting/disaster-recovery-tutorial/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- lifecycle
- site-ui
---

Identify the update and its effect before choosing a recovery operation.

## Check the failure

Record the site, time, component, and visible error. Check whether both the public site and WordPress administration are affected. Inspect site history and relevant logs.

## Choose the smallest repair

Review the changed plugin, theme, or code in staging. A targeted repair may preserve newer content better than restoring the entire site. Do not repeatedly apply updates or restores while the current operation's status is unknown.

## Restore when necessary

Verify the target site and recovery time, and account for content or orders created afterward. Wait for the recovery operation to finish, then test the affected pages and integrations.

Use [Time Machine]({{< relref "products/time-machine/get-started-with-pit-machine/index.md" >}}) and [Support]({{< relref "products/platform/get-started/guides/support/index.md" >}}).
