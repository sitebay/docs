---
title: Fix a page on staging with Sorti
description: Reproduce a page problem, review a small change, and verify the saved result before publishing.
slug: fix-a-staging-page
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- fix staging page
- debug WordPress page
- canvas preview
- saved CSS
- Sorti
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- practical-site-workflows
- practical-canvas
---

Use this workflow to fix one page without turning a small edit into a live release you have not reviewed. Start with a reproducible problem, work on staging, and verify the saved page rather than only its preview.

## Confirm the page and environment

Open the intended site in Sorti. Select its staging page and connect the editor when the fix needs source files. Ask:

> Confirm the selected site, staging address, page, and editor workspace. Read the current site state and available actions. Do not edit anything yet.

The site application exposes `sitebay_site_read_state` and `sitebay_site_legal_actions`. These describe the connected backend's current state and available operations. A canvas selection is useful context, but it does not prove that an editor or terminal points at the same environment.

If the site is already restoring, creating staging, or promoting changes, inspect that operation first. A second request will not make an unfinished operation finish sooner.

## Describe the failure precisely

Give the assistant the page, action, expected result, and observed result. For example:

> On the staging contact page, the submit button extends beyond the screen at a narrow width. Inspect the layout and propose the smallest CSS change. Keep the form fields and submission behavior unchanged.

This request separates a layout problem from a form-delivery problem. A screenshot can show a clipped button; it cannot prove that a submitted message reached an inbox.

Reproduce the problem before editing. Record the page address, viewport, and relevant selection or selector. Ask for the existing rule or source location that explains the failure, rather than a guess based on the page title.

## Review a small preview

For a visual HTML or CSS change, Sorti can use `canvas_verify_patch` to stage a pending preview and capture the result. **That tool does not save or publish the edit.** Ask to see the changed region before accepting it.

A patch should use the actual selector found during inspection. CSS must be a complete rule with a selector and braces, not a loose declaration such as `max-width: 100%`.

Check which view produced the screenshot. A capture of a remote page is a separate measuring frame; it is not necessarily the canvas you are looking at. If the target is outside the captured area, scroll or select it and inspect again. Do not accept an unrelated image as verification.

For a behavior change, test the interaction through an available browser or application tool. Do not use a visual-only patch as proof that the underlying behavior is repaired.

## Save through the correct source

Once the preview is acceptable, request the persistent change:

> Apply only the reviewed fix to the staging source. Show the changed file or content record, preserve unrelated edits, and do not promote staging.

Use the source appropriate to the page. A theme stylesheet, a WordPress content record, and a browser preview are different places to make a change. Ask which one was updated. A successful preview does not establish that any of them was saved.

## Test the saved page

Reopen the staging page and repeat the original failure case. For the layout example, check the narrow view, a wider view, and the button's normal interaction. Compare the saved result with the preview you approved.

Use a small review record:

| Check | Record |
| --- | --- |
| Original problem | Page, action, expected result, and failure |
| Change | File or content record and the reviewed difference |
| Verification | Saved-page behavior at the tested widths |
| Remaining work | Checks not run and whether live is unchanged |

If the edit affects a real submission, payment, or notification, agree on a test destination and test data before exercising it. Opening a page and submitting its form are separate actions.

## Decide whether to publish

A successful staging check completes the repair, not the live release. Use [Review a staging release]({{< relref "sorti/review-a-staging-release.md" >}}) to inspect live changes, promotion scope, and recovery before requesting publication.

For a missing local browser connection, follow [Test localhost through the editor]({{< relref "vscode/test-localhost-with-sorti.md" >}}). For a paused assistant task, inspect the [original mission]({{< relref "sorti/recover-an-interrupted-task.md" >}}) instead of repeating the edit.
