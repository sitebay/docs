---
title: Give a developer access
description: Give each collaborator the access required for the task, without sharing the owner's credentials.
keywords:
- accounts
- security
tags:
- sitebay platform
- security
published: 2024-04-26
modified: 2026-10-07
modified_by:
  name: SiteBay
aliases:
- /platform/create-limited-developer-account/
- /guides/create-limited-developer-account/
authors:
- SiteBay
contributors:
- SiteBay
slug: developer-access
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- teams
- editor-bridge
- git-sync
---

Give each collaborator the access required for the task, without sharing the owner's credentials.

## Choose the access boundary

A SiteBay team role, a WordPress user, a repository permission, and an editor session are separate grants. Identify which resources the work actually requires.

## Grant and verify

Invite the developer through the supported team workflow and review their role. Check repository permissions separately for Git Sync. Connect the editor to the intended site and environment before requesting changes.

## Finish the handoff

Review the change and its tests, rotate any temporary credentials, and remove access that is no longer needed.

Use [Team permissions]({{< relref "products/platform/accounts/guides/user-permissions/index.md" >}}) and [the Agent Bridge]({{< relref "vscode/setup.md" >}}).
