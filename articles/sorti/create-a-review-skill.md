---
title: Create a reusable site-review skill
description: Save a complete review procedure in the team library, test when it applies, and keep shared edits
  under control.
slug: create-a-review-skill
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- create team skill
- SKILL.md example
- staging review procedure
- shared skills
- Sorti
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- practical-team-skills
task:
  goal: Save and test one reusable staging-review procedure in the shared team library.
  prerequisites: Connect SiteBay, select the intended team, confirm library write access, and check for an
    existing equivalent skill.
  effects: Saving changes a shared skill. Enabling it neither runs the procedure nor grants missing tools or
    site access.
  verification: Reopen the stored instructions and run a read-only review task. Reconcile concurrent edits
    without discarding the draft.
---

Turn a repeated review into a skill when the steps stay the same across tasks. This example creates a staging-page review that inspects a change and reports evidence without publishing it.

## Open the right team library

Connect SiteBay, select the intended team, and open **Team skill library** in Sorti's assistant settings. Check whether editing is available before writing a shared procedure. A read-only library is not an empty library; an older server or missing write permission can prevent changes.

Search for an existing review skill first. Update the appropriate shared procedure rather than adding a second skill with nearly the same purpose.

## Write the complete skill document

Choose **New skill** and paste a complete document into **Skill document**. This example is ready to use as a starting point:

````markdown
---
name: review-staging-page
description: Review a saved staging-page change and report evidence before publication.
---

Use this skill when a user asks to review a saved page change on staging.
Do not use it as permission to edit, promote, restore, or send a real form.

## Check the target

Confirm the site, staging address, page, and connected editor workspace.
Read the current site state and available actions.
If another operation is in progress, inspect it before continuing.

## Review the change

Read the requested behavior and the actual changed source or content record.
Reopen the saved staging page, not just a pending canvas preview.
Repeat the reported failure case and check a narrow and a wide view.
Only submit a form or trigger an external effect with agreed test data.

## Report the result

State what changed, which checks passed, which failed, and which were not run.
Include the page and the relevant source or operation identifiers.
Keep publication as a separate decision. Do not promote staging.
````

The front matter identifies the skill; the body is the procedure. Collection membership and supporting-file ownership are managed by the library. Do not add `collectionId` or `supportingFiles` to the front matter.

Keep secrets and customer records out of the document. A shared procedure should describe how to obtain an authorized connection, not contain its credentials.

## Save and organize it

Select **Save skill**, then reopen the skill and check the saved instructions. Use **New collection** to create a group such as **Site reviews**, or use an existing group. Move the skill into that collection through **Move**.

Enabling the skill makes it eligible for use; it does not execute the procedure. Saving it also does not add a missing browser, site connection, or tool. Those capabilities remain separate.

## Try a read-only task

Use a staging page with a known, saved change. Ask:

> Use the review-staging-page skill on the selected staging contact page. Confirm the target, inspect the saved change, and report the checks. Do not edit or publish.

The agent should load the instructions with `read_skill` before following them. The available-skills list contains an advertisement, not the complete body. Long skill reads provide their own continuation offset.

Check the result against the procedure. Did the assistant identify staging, inspect the saved page, and distinguish a failed check from one it could not run? A useful skill should produce a review you can assess, not only a reassuring conclusion.

## Refine without creating conflicting copies

Edit the original shared skill when a step needs clarification. If another person saved a change first, the editor keeps your draft and shows the current shared instructions. Review both versions before choosing **Keep draft on current version** and saving again. That control is not an automatic merge of the two documents.

For detailed procedures, refer to [Fix a page on staging]({{< relref "sorti/fix-a-staging-page.md" >}}) and [Review a staging release]({{< relref "sorti/review-a-staging-release.md" >}}). Keep the skill focused on the checks you repeat instead of copying a growing manual into it.

The [skills and collections guide]({{< relref "sorti/skills-and-collections.md" >}}) covers moving, disabling, and deleting shared entries.
