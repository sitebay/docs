---
slug: sitebay-architecture
description: SiteBay separates account and team management from the WordPress environments it operates.
keywords:
- architecture
- kubernetes
- infrastructure
- cephfs
- mariadb
- celery
- helm
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-15
modified: 2026-10-08
modified_by:
  name: SiteBay
title: How SiteBay hosting fits together
bible: true
tags:
- sitebay
- architecture
- kubernetes
- infrastructure
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- platform-architecture
- git-sync
- code-server
- regions
- lifecycle
---

SiteBay separates account and team management from the WordPress environments it operates. This guide explains the customer-facing boundaries; it is not a promise that internal pod names, filesystem mounts or a provider topology will never change.

## Control plane and site runtime

The service API validates identity, team membership, plan constraints and available operations. A site has its own state and WordPress data. Infrastructure automation provisions and maintains the underlying runtime, but customer API access does not grant Kubernetes cluster administration.

The control-plane database and a site's WordPress database have different purposes. Git tracks the configured repository files; it does not, by itself, capture all WordPress content stored in the database.

## Changes are operations

Creating, updating, staging, restoring and deleting pass through explicit states. An operation may be accepted before it completes. Read [site lifecycle and legal actions]({{< relref "products/platform/site-lifecycle/index.md" >}}) and verify the final resource state rather than relying on a request timeout or a process-start message.

A staging copy is distinct from the live site's canvas preview. Confirm which environment a file editor, database tool or agent is targeting before authorizing changes.

## Workspace access

The managed code-server deployment exposes a scoped WordPress workspace. Its source-configured workspace path is `/home/coder/wordpress/wp-content`; use the actual opened workspace and `pwd` to orient yourself. Open it through the site's authenticated link rather than constructing a hostname from a UUID. Its availability and lease are not a guarantee that every plan includes an always-running editor.

## Git, checkpoints and restore

Git Sync validates a repository containing `wp-content/` at its root. Optional root files include `.gitignore` and `wp-config-overrides.php`; WordPress core and secret-bearing `wp-config.php` do not belong in that repository. Treat provider access and current sync health as independent from the existence of a remote commit.

Checkpoints and restore operations provide recovery references for the supported file/database state. Inspect the available window and preview the impact before restoring. Do not assume an arbitrary historical timestamp is recoverable merely because a Git log contains a nearby commit.

## Regions and capacity

Read the current region and pricing catalogs for available locations and capacity. The desired configuration, accepted deployment and observed application health are three distinct facts. For a deployment issue, provide a redacted site/operation reference to support instead of editing internal infrastructure resources.
