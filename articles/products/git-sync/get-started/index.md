---
slug: get-started-git-sync
description: Git Sync connects a site's tracked WordPress files with a configured repository.
keywords:
- git sync
- github
- gitlab
- bitbucket
- version control
- ci/cd
- deployments
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-08
modified_by:
  name: SiteBay
title: Connect and verify Git Sync
bible: true
tags:
- sitebay
- git
- deployments
- ci-cd
aliases:
- /quick-answers/sitebay-essentials/introduction-to-git-sync/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- git-sync
- wp-config
- lifecycle
---

Git Sync connects a site's tracked WordPress files with a configured repository. Repository history, current working files, the WordPress database and deployment health are separate evidence. A successful push does not prove that the site applied the change.

## Prepare the repository

The validation contract expects `wp-content/` at the repository root:

```text
project/
├── wp-content/
│   ├── themes/
│   ├── plugins/
│   └── mu-plugins/
├── wp-config-overrides.php
└── .gitignore
```

The override file and `mu-plugins` are optional. Do not commit WordPress core directories, `wp-config.php`, database credentials, keys, salts or private database exports. Review uploads, cache and generated artifacts individually: excluding a directory from Git does not create a backup of it elsewhere.

## Authorize and attach

Use the current provider connection offered by SiteBay and authorize only the repositories needed. A GitHub App installation, another provider's credential and an internal repository use different authentication paths. Confirm that the connection supports your provider before setup.

Select the intended site, repository and branch. Validate the repository layout before allowing the initial sync to change the site. Review the direction of the initial operation and preserve existing uncommitted files; never assume an empty repository or an existing live directory will be handled identically.

## Make a small test change

On a test copy or approved branch, change a harmless file, inspect the diff and stage only the intended files. Record the commit, then inspect SiteBay's Git state and the running site. The provider-agnostic status route uses a typed site reference such as `wp:example.com`; a partial result includes a reason that should be shown rather than treated as success.

A conflict, suspended sync, missing provider permission or incomplete request must be resolved explicitly. A network timeout can leave an operation's outcome unknown. Inspect health before retrying or restarting sync; do not use force-push or reset-hard as a generic repair.

## Work with staging

Confirm which branch and environment the staging site uses. A pull request merge changes repository history; promotion of staging file/database state is a separate guarded operation. The live canvas preview is not a staging copy. See [site lifecycle]({{< relref "products/platform/site-lifecycle/index.md" >}}) before promoting or restoring.

## Managed configuration

A root `wp-config-overrides.php` can contain supported simple literal `define()` values. For example:

```php
<?php
define('WP_POST_REVISIONS', 10);
define('DISALLOW_FILE_EDIT', true);
```

The parser returns accepted constants and structured rejections. Database constants, secrets, WordPress origin/path overrides and table-prefix changes are not accepted. Expressions using variables, concatenation or function calls are not supported. Review rejections; values are not merely “silently dropped.” A memory constant does not increase the team's resource entitlement.

## Recovery

Git can restore tracked files, but it cannot independently restore WordPress database content or ignored uploads. Inspect the actual available restore point, preserve a pre-change recovery reference and verify both files and database after restoration. No fixed sync interval, conflict-free collaboration or unlimited historical recovery is promised by this workflow.
