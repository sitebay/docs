---
title: Inspect missions and handle approvals
description: Read mission progress, resolve the original approval, and control the correct execution attempt.
slug: missions-and-approvals
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- inspect missions and handle approvals
- sorti
- sitebay documentation
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-current-core
weight: 35
---

A mission groups a larger task into planned work, execution, and recorded results. Use its details to learn what is running, what is waiting, and what was verified. Opening a mission report does not start or resume work.

## Define the result

Name the target and the acceptance check before starting. For a repository change, state the repository, allowed files, and tests. For a site change, state the site, live or staging environment, and the behavior that must work afterward.

For example:

> Inspect the selected staging site. Find why the contact form fails, propose the smallest fix, and show a successful submission before asking to publish.

This gives the assistant a task it can inspect and verify. A broad request to fix a site does not identify which deployment or recovery operation you intend.

## Read the original mission

Ask the assistant to inspect `mission_activity` for the relevant mission. That read surface can report plan progress, recent activity, pending approvals, and the last finished mission. Source-backed missions can also provide admitted commits, their diff, and recorded gate results. Other mission types have their own observations; do not mistake a source commit for proof that a remote operation completed.

Keep the mission ID when reporting a problem. The live execution attempt has its own identity. A report from a previous attempt is not a current control target.

| Recorded state | What to inspect next |
| --- | --- |
| `running` | Current activity and any pending decision; work may already have started |
| `paused` | The pause reason and preserved work before choosing a continuation |
| `needs_continuation` | The reason execution stopped and the remaining plan |
| `blocked` | The prerequisite or unresolved condition reported by the mission |
| `done` | Results and verification for the requested scope |
| `completed_with_gaps` | The explicitly listed unmet items; this is not full completion |
| `failed`, `cancelled`, or `abandoned` | The recorded outcome and any effects or saved work that remain |

## Resolve the pending approval

An approval waiting on a tool call is not evidence that the call executed. Review the original card's target, arguments, and scope. Approve or reject that request rather than issuing the same operation in another conversation.

A plan amendment is also a decision for the owner. A running mission can be waiting for that answer, or continue already approved work while the amendment waits. Read the reported state instead of treating every pending card as a mission that has not started.

## Pause or stop the right attempt

In **Execution controls**, use **Check controls** to obtain the current view. The interface offers only actions the connected execution attempt reports as available: **Pause**, **Stop attempt**, or **Interrupt now**.

A recorded request and an applied request are different. The details can show owned calls still settling, an unconfirmed write, or reconciliation that remains necessary. Inspect that receipt before deciding whether to retry. **Retry same request** preserves the logical request identity; checking status does not resend it.

Stopping local execution is not a rollback of files, deployments, or external API effects. Check the original operation and use its documented recovery procedure when a change must be undone.

## Verify completion

Read the changed files, test output, or provider operation result appropriate to the task. For a site, inspect the actual target after the change. For a documentation update, verify the published route and search result. Report remaining gaps by name rather than inferring success from a closed progress card.
