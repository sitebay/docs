---
slug: site-lifecycle
description: Understanding SiteBay site statuses, the state machine that governs site operations, and what each
  status means.
keywords:
- site status
- lifecycle
- state machine
- busy
- idle
- sleeping
- creating
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-15
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Site lifecycle and available actions
bible: true
tags:
- sitebay
- sites
- lifecycle
- status
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- lifecycle
- api-contract
---

A site's status records what it is doing, while its current permissions and constraints determine what can happen next. Do not interpret `idle` as “all actions are authorized.”

## Inspect before acting

Read the site's state and `GET /f/api/v1/site/{fqdn}/legal_actions`. The latter returns a current situation and the moves available from that state, including their tool names and arguments. A missing move is not available yet. Refresh after an operation; a previous state or action list may no longer apply.

## Status vocabulary

The source model includes `idle`, `sleeping`, `creating`, `updating`, `deleting`, `creating_stage`, `committing_stage`, `merging_stage`, `deleting_stage`, `previewing_restore`, `restoring`, `entering_sleep`, and `applying_template`. Busy transitions have explicit guards. A timeout is an investigation signal, not permission to force an operation or edit its database row.

`creating` means provisioning is in progress. Record the returned site identifier and check readiness rather than submitting another create request because the first response was not immediate. `deleting` means destructive removal is underway; deleting the live site also affects its staging environment.

## Staging and canvas are different

Staging is a separate copy for testing changes. Creating, merging, committing, and deleting staging are explicit operations. A canvas preview uses the live site with its preview mode and does not require staging. Recreating staging is not a repair for a canvas or API error.

Before promoting changes, review both the file and database effects and the available rollback/checkpoint path. Verify the actual live site after completion, not only the staging preview.

## Sleep has a reason

A sleeping site's last sleep reason is separate from its current status. The source distinguishes inactivity, a user request, disk pressure, node pressure, overage, storage grace, and other cases. Visitor-triggered waking is allowed for the inactivity reason; it must not bypass an enforcement or unexplained sleep. An old sleep reason is an audit field and can remain after a site wakes.

## Restore with a recovery path

Review the available restore points and the affected environment. The low-level PIT restore API does not create the protective checkpoint itself. The `site_restore_to_point` intent is preferred when its automatic pre-restore checkpoint and rollback handle are needed. A selected timestamp is not a promise that every file and database change is recoverable at arbitrary precision.

Wait for the restore result, then inspect content and application behavior. Keep the pre-restore recovery reference until validation is complete. Neither a Git checkout alone nor a screenshot proves that the WordPress database was restored.
