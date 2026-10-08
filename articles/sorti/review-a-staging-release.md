---
title: Review a staging release before publishing
description: Check live changes, understand promotion warnings, and verify the original release operation and
  recovery checkpoint.
slug: review-a-staging-release
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- staging release
- promote staging
- live drift
- orders data loss
- release checkpoint
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- practical-site-workflows
task:
  goal: Review the release target, live-data drift, and recovery checkpoint before promotion.
  prerequisites: Identify live and staging, inspect the saved change, and read the current available actions
    and drift report.
  effects: The review does not publish. Promotion can overwrite live changes; approval of a design is not approval
    of protected-data loss.
  verification: Follow the original operation IDs to an outcome, then check the live page. An initial committing_stage
    response is not completion.
---

A staging page can pass every visual check and still be unsafe to promote. Live may have changed since the staging copy was created. Review those changes before replacing live state.

## Identify the release

Record the live site, staging address, intended changes, and checks already completed. Keep the request specific:

> Review this staging release without publishing it. Show the changed behavior, the live-versus-staging drift, and anything that promotion could overwrite.

Read the current site state and available actions. The SiteBay application offers `sitebay_stage_promote` when the site's current conditions allow it. An available action is not approval to run it, and its own checks still apply.

## Check live changes, not just staging changes

Inspect the current staging information and its drift report. A stale staging copy can omit orders, users, posts, or comments created on live after the copy was made. A theme-only intention does not make a whole-site promotion files-only.

The promotion request distinguishes three decisions:

| Field | Meaning |
| --- | --- |
| `confirm` | The user approved the promotion itself |
| `confirm_drift` | The user reviewed and accepted overwriting reported live changes |
| `allow_data_loss` | The user explicitly accepted loss of reported protected data |

These flags are false by default. Do not enable them together merely to clear an error. In particular, approving a design does not mean approving the removal of newer customer data.

When the report identifies live changes that must survive, stop the release review and decide how to preserve them. Do not promise that this promotion will merge only the desired rows or files; that is not what the confirmation flags mean.

## Review the evidence

Ask for the saved staging page, the actual changed source, and the result of the relevant interaction. Identify tests that were not run. A screenshot is useful for layout; a transaction or form needs its own outcome check.

A useful approval request is:

> The reviewed change is ready on staging. Before asking me to publish, name the live target, show any drift warning, and explain the recovery checkpoint. Do not accept data loss on my behalf.

The backend requires a usable pre-promotion checkpoint. A failed or empty checkpoint is a reason to fix the prerequisite, not to route around the release procedure.

## Follow the original promotion

After explicit approval, submit the currently advertised promotion action once. Preserve the returned `operation_id`, `event_id`, and `checkpoint_id`.

The initial response can report `committing_stage` and include a field named `promoted_at`. In this response, the work has been dispatched; those fields alone do not prove it completed. Follow the returned read instruction and the original operation's progress until its outcome is known.

If the connection drops, inspect that same operation. Do not issue a second promotion just to obtain another response. A site leaving a busy state also needs its result checked; failure is an outcome too.

## Verify live

Open the intended live address and repeat the release checks. Confirm the changed behavior and any affected data. Keep the operation identifiers with the result so another person can inspect the same release.

If recovery is needed, use the original checkpoint and the [Time Machine procedure]({{< relref "products/time-machine/get-started-with-pit-machine/index.md" >}}). The available-actions service can offer undo for the latest successful promotion while its checkpoint still exists. It is not a promise that every historical release remains reversible.

Record the release as verified only for the checks actually completed. Keep a missing delivery test, unavailable device, or unresolved operation visible rather than calling the whole release done.
