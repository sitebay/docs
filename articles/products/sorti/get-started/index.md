---
slug: get-started-sorti
description: Select a workspace, inspect the target, and request a verified change with Sorti.
keywords:
- sorti
- mobile assistant
- ios
- android
- voice ai
- 3d avatar
- chatgpt
- openai
- ai agent
- wordpress management
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-12
modified: 2026-10-08
modified_by:
  name: SiteBay
title: Get started with Sorti
bible: true
tags:
- sitebay
- sorti
- mobile
- ai
- voice
- chatgpt
aliases:
- /quick-answers/sitebay-essentials/siteclaw/
- /products/siteclaw/get-started/
- /products/siteclaw/get-started-siteclaw/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- sorti-current-core
- sorti-current-app
- sorti-canvas
- docs-knowledge
---

Sorti is the current name for SiteClaw. It combines conversation with a workspace where you can inspect sites, panels, files, and task progress. Start with a read-only inspection before requesting your first change.

## Select the workspace

Connect the service you need and select the intended team and site. Check whether you are looking at live or staging. A page selection, editor connection, and mission can each carry context; make sure they refer to the target you intend to change.

Ask:

> What site and environment are selected? Read the current state and available actions. Do not change files yet.

An unavailable integration needs its own connection or permissions. A panel appearing in the workspace does not mean its server is ready to accept every operation.

## Describe one result

Name the behavior you need and how to verify it. A useful first task is to inspect an existing page, explain a problem, or propose a small staging change.

> On staging, inspect the contact page. Find why the submit button fails and show the proposed change before editing.

For an actual change, state the allowed scope. Keep publication separate from editing: a saved file or a working staging page is not yet a successful live release.

## Follow the work

Read the tool result for a direct action. For a larger task, open the mission details and inspect its progress, decisions, and verification. Resolve the original approval when one is pending; repeating the operation can create a second request rather than unblock the first.

Use [Missions and approvals]({{< relref "sorti/missions-and-approvals.md" >}}) for states and execution controls. A stopped attempt can still have files or external effects that need review.

## Read the right procedure

Use [Skills and collections]({{< relref "sorti/skills-and-collections.md" >}}) for reusable team instructions. Use the [documentation reader]({{< relref "knowledge/read-with-mcp.md" >}}) to search maintained procedures and read their source citations. Neither feature grants new tool permissions.

For site operations, follow [Work with your site]({{< relref "sorti/work-with-your-site.md" >}}). For an old tutorial or screenshot, read [SiteClaw is now Sorti]({{< relref "sorti/siteclaw-to-sorti.md" >}}) before translating any configuration names.

## Verify before publishing

Inspect the actual changed page or file and repeat the relevant user interaction. Ask for failed checks and unverified items as well as passing results. Review the target and operation again before publication or recovery.

## Try a focused workflow

Start with [a staging-page repair]({{< relref "sorti/fix-a-staging-page.md" >}}), [a reusable review skill]({{< relref "sorti/create-a-review-skill.md" >}}), or [a small counter panel]({{< relref "sorti/build-a-counter-panel.md" >}}). Each tutorial separates the requested result from its verification and any later publication.
