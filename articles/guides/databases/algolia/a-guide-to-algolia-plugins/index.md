---
slug: a-guide-to-algolia-plugins
description: A WordPress search integration should control what is indexed, how records stay current, and what a
  visitor is allowed to retrieve.
keywords:
- algolia
- plugins
- wordpress
- search
- instant search
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-05-04
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Choose a WordPress search integration
tags:
- wordpress
- plugins
- search
- algolia
aliases:
- /databases/algolia/a-guide-to-algolia-plugins/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- algolia
- wp-basics
---

A WordPress search integration should control what is indexed, how records stay current, and what a visitor is allowed to retrieve.

## Review the integration

Check its maintained WordPress and PHP compatibility, update history, supported content types, indexing behavior, and documented Algolia client version. Do not assume that a similarly named plugin is maintained by Algolia.

## Test private content

Create test drafts and restricted content in staging. Confirm that records not meant for public visitors are excluded from the public index. Hiding a search result in the UI is not access control.

## Test changes

Publish, edit, and delete a test page. Verify each change in the index and search interface. Check the failure path when indexing credentials are unavailable.

## Keep keys separate

Use server-side credentials for indexing and an appropriately restricted search key for browser queries. Follow [the search setup guide]({{< relref "guides/databases/algolia/create-search-with-algolia/index.md" >}}) for the shared workflow.
