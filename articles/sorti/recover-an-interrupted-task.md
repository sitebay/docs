---
title: Recover an interrupted Sorti task
description: Inspect the original mission, distinguish waiting from failure, and continue preserved work without
  repeating uncertain writes.
slug: recover-an-interrupted-task
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- interrupted task
- resume Sorti mission
- pending approval
- stop request
- reconciliation
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- practical-mission-controls
task:
  goal: Inspect the original mission and continue preserved work without repeating uncertain operations.
  prerequisites: Find the original session, mission ID, available controls, pending decisions, and outstanding
    operation receipts.
  effects: Reading status does not resend a request. Pause, Stop, and Interrupt do not undo source changes
    or already-issued external effects.
  verification: Resolve outstanding outcomes, retain completed edits, and verify only the remaining work through
    the supported continuation path.
---

When a task stops making progress, inspect the original mission before starting another one. A paused executor, a pending approval, and a disconnected client need different responses.

## Open the original mission

Return to the task's session and open its mission details. Keep the mission ID. Opening a saved report does not start or resume the work, and its live controls may be unavailable until you reconnect to that session.

Ask:

> Inspect the original mission and its recent activity. Tell me what completed, what is still running, and what is waiting. Do not repeat a tool call or start a replacement mission.

The assistant can use `mission_activity` to inspect progress and pending decisions. Source-backed work may also provide admitted source, changes, and recorded checks. Treat those as evidence of the specified work, not as proof that a deployment happened.

## Identify what stopped progress

| Observation | Next step |
| --- | --- |
| `running` with recent activity | Inspect the current step before assuming the task is stuck |
| Pending tool approval | Review the original request and its target |
| Pending plan amendment | Decide on the proposed change to the mission's plan |
| `paused` or `needs_continuation` | Read the reason and preserved work before requesting continuation |
| `blocked` | Resolve the reported prerequisite |
| `completed_with_gaps` | Read the unmet items instead of treating the task as fully complete |
| Controls unavailable | Reconnect to the original session or inspect its saved evidence |

A pending approval does not mean the operation already ran. A plan amendment can also wait while previously approved work continues. Read the reported state rather than interpreting every waiting card the same way.

## Handle an unconfirmed control request

In **Execution controls**, select **Check controls**. The interface may offer **Pause**, **Stop attempt**, or **Interrupt now**, depending on that attempt's capabilities.

After sending a control request, inspect its receipt. `applied` reports that the attempt's local work settled. `reconciliation_required` means outstanding work still needs to be resolved. The interface can also report owned calls still settling or a ledger write whose durability is unconfirmed.

Checking status does not resend the request. When **Retry same request** is offered, it preserves the original logical request identity; it is not a way to retry an unrelated site deployment or payment.

Use a precise follow-up:

> Read the receipt for the original stop request. Identify any calls still settling and any external operation whose outcome is unknown. Do not issue another stop or repeat the external operation.

## Inspect external effects separately

A stopped mission can leave valid saved files, a running provider operation, or a partially verified result. Pause, Stop, and Interrupt do not undo already-issued external effects.

For a site promotion, inspect the original operation and recovery checkpoint. For a source change, review the saved diff and tests. Do not assume that a missing final chat message means the operation failed.

If the original outcome cannot be established, report that uncertainty with the operation ID. Repeating a write is not a substitute for knowing what the first write did.

## Request a reviewed continuation

Once the outstanding state is understood, describe what should remain and what should resume:

> Continue the original task from its preserved work. Keep the completed edits. First review the existing diff and results, then finish only the remaining checks. Do not repeat publication or other external writes without resolving their original outcomes.

Use the continuation path supported by that mission and connected worker. An unavailable continuation needs its actual prerequisite fixed; this guide does not imply that every stopped task can resume automatically.

If a new task is necessary, carry over the mission ID, saved source, accepted scope, and unresolved operations. Make that handoff explicit so the new task does not recreate work that already exists.

## Verify the remaining result

Separate completed implementation, passed checks, and unresolved work. A task can have saved source with failing tests, or passing local tests without a deployment. Name the remaining gap and its next check.

For approval semantics, see [Missions and approvals]({{< relref "sorti/missions-and-approvals.md" >}}). For a site release, use [Review a staging release]({{< relref "sorti/review-a-staging-release.md" >}}) before continuing publication.
