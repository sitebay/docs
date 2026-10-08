---
slug: get-started-with-pit-machine
description: Time Machine combines activity, file history and recovery actions for the selected WordPress site.
keywords:
- backups
- point-in-time
- restore
- time machine
- data recovery
- sitebay backups
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-08
modified_by:
  name: SiteBay
title: Use Time Machine to inspect and restore a site
bible: true
tags:
- sitebay
- backups
- security
aliases:
- /quick-answers/sitebay-essentials/introduction-to-pit-machine/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- lifecycle
- git-sync
- mcp-platform
---

Time Machine combines activity, file history and recovery actions for the selected WordPress site. Use the actual available restore window and checkpoint references; a calendar view is not a promise of unlimited history or a complete copy at every minute.

## Inspect recent activity

Open the site's **Time Machine** tab. The current UI shows a calendar/date scrubber and separate counts for Git commits, database commits, checkpoints and uploads. It also exposes a database-changes panel. A newly created site may not have its first backup yet.

The current file browser uses Git-backed history for both internal and externally linked repositories. An external Git provider is not required simply to inspect the internal file history.

## Select the smallest recovery action

Identify the incident time, affected file/content and desired state. Inspect the relevant file history or available site restore point. A single-file restore, full-file restore and combined database restoration are different scopes. Verify the operation's target and consequences before authorizing it.

## Protect the current state

The restore-to-point intent creates a pre-restore checkpoint and returns a rollback handle. The low-level PIT API does not independently add that protection. Keep the returned checkpoint and restore ID; incoming orders, uploads and submissions may need to be preserved before rolling back a whole database.

Where a supported staging-from-point flow is available, use it to investigate before changing live state. Review its external integrations as carefully as any test clone.

## Wait for the result

A request can be accepted before restoration completes. Watch the operation and refresh the site record. Do not repeat a restore after a lost response until you know whether the first request executed. Neither an activity entry nor a local Git commit proves database recovery.

## Verify the restored site

Test the affected pages, media, login, forms and transactional paths, then inspect errors and Git Sync health. Retain the recovery handle until the result is accepted. A previous backup can also contain a security compromise; restoring it is not by itself incident remediation.

Check the available recovery window and expected impact for the selected site. See [the current lifecycle contract]({{< relref "products/platform/site-lifecycle/index.md" >}}).
