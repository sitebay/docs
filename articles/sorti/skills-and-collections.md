---
title: Use skills and shared collections
description: Create reusable team instructions, handle concurrent edits, and distinguish skills from executable
  tools.
slug: skills-and-collections
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- use skills and shared collections
- sorti
- sitebay documentation
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-current-skills
- docs-knowledge
weight: 45
---

A skill is a reusable instruction document. A collection organizes shared team skills. Neither a skill nor a collection installs a tool, grants access to a site, or starts a mission.

## Open the team library

Use the **Team skill library** in Sorti's assistant settings. Connect SiteBay and select the intended team first. Search matches skill names, descriptions, and collection titles. Open a skill to read its instructions before deciding to change it.

The current library can create and rename collections, move skills, and enable or disable them. On an older server, Sorti can display the existing skill list without offering unsafe edits. The interface explains when a server update or team-owner write access is required.

## Write one focused procedure

Choose **New skill** and provide a complete skill document. Use a name made from letters, numbers, and hyphens, such as `review-staging-change`. Include a short description and nonempty instructions.

```yaml
---
name: review-staging-change
description: Inspect a staging change before proposing publication.
---
```

Add a body below that front matter:

```text
Use this skill when reviewing a change on a selected staging site.

1. Confirm the site and environment.
2. Read the requested change and current state.
3. Inspect the changed behavior and record the result.
4. Report what passed, what failed, and what remains unverified.
5. Ask for publication only when the staging result is ready.
```

This example describes review work; it does not contain a publish command. Keep credentials and customer secrets outside the skill. Reference maintained documentation for detailed procedures instead of embedding a second copy that will become stale.

Save the document and reopen it to check the stored result. Metadata and supporting-file ownership belong to the library contract. Do not insert `collectionId` or `supportingFiles` into the instruction front matter; use the library's collection controls.

## Organize without losing instructions

Use **Move** to select a collection or **Unassigned**. Disabling a skill is different from deleting it. A collection deletion moves its skills to Unassigned and keeps their instructions and supporting files. Deleting a skill affects the shared team library and requires confirmation.

Save or cancel an edited draft before reloading the library or changing another skill. The editor keeps drafts separate from the shared saved revision.

## Handle another person's edit

A save includes the library revision it was based on. If another person changed the library, the interface reports a conflict and preserves the draft instead of claiming the save succeeded.

Review the current library and reconcile the intended changes before saving again. When the original skill was removed, choose a new skill name or cancel the draft; do not assume that a reload restores a deleted shared entry.

## Use a skill during a task

The agent's available-skills list advertises names and descriptions. The `read_skill` tool loads the instructions for an applicable skill. Long instructions provide a continuation offset; use the returned offset rather than calculating one.

That is different from `search_docs` and `read_doc`, which search the documentation corpus and return cited source lines. A skill tells the assistant which procedure to follow; a tool performs an allowed operation; a mission records multi-step work. The [documentation reader]({{< relref "knowledge/read-with-mcp.md" >}}) is useful for keeping those procedures connected to current references.
