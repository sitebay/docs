---
slug: sitebay-dump-and-restore-commands
title: Back up and restore the intended site
description: A recovery procedure needs a known target, a verified backup and a way back from the restore itself.
  File archives, Git commits and database dumps cover different kinds of state.
keywords:
- SiteBay backup
- WordPress restore
- data backup
- data recovery
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
authors:
- SiteBay
contributors:
- SiteBay
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
doc_sources:
- shell-reference
- wp-cli
- lifecycle
- git-sync
---

A recovery procedure needs a known target, a verified backup and a way back from the restore itself. File archives, Git commits and database dumps cover different kinds of state.

## Create a recovery point

Read the selected site's current state and available checkpoint/backup actions. Confirm whether the requested operation captures files, database state or both. Record the returned recovery identifier and wait for creation to complete; a button click is not proof that a usable copy exists.

## Prepare a restore

Inspect the available restore window and the specific timestamp or commit. Review whether incoming content, uploads, orders or form submissions would be replaced. Keep a current recovery point before changing live data.

The higher-level `site_restore_to_point` workflow creates a pre-restore checkpoint and returns a rollback handle. The low-level PIT request does not independently provide that same protection. Use the supported operation exposed for the site rather than assuming a copied endpoint or generic shell import is equivalent.

## Verify completion

Wait for the restore operation to settle, then test pages, media, login and critical forms or commerce paths. Confirm both filesystem and database expectations. Keep the earlier recovery reference until the restored state has been accepted.

## Keep an independent copy

Retain an authorized export outside the account or site being deleted. Check that it can be read and restored in a test environment. A retention period or an arbitrary point in the past is available only when the actual backup system reports it; this guide does not promise unlimited history.
