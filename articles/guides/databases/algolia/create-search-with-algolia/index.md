---
slug: create-search-with-algolia
description: Algolia stores a search index separately from your source content. Keep indexing credentials on the
  server and expose only the intended search access to the browser.
external_resources:
- '[Algolia Documentation](https://www.algolia.com/doc/)'
- '[InstantSearch.js Documentation](https://www.algolia.com/doc/api-reference/widgets/js/)'
- '[Algolia WordPress Plugin](https://wordpress.org/plugins/search-by-algolia-instant-relevant-results/)'
- '[Algolia Dashboard](https://dashboard.algolia.com/)'
keywords:
- algolia
- search
- instant search
- site search
- search api
- algolia implementation
- search integration
- wordpress search
- algolia tutorial
- search configuration
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-05-13
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Add Algolia search
title_meta: Add Algolia search
dedicated_cpu_link: true
tags:
- algolia
- search
- api
- javascript
- wordpress
- sitebay
aliases:
- /search/algolia/create-search-with-algolia/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- algolia
---

Algolia stores a search index separately from your source content. Keep indexing credentials on the server and expose only the intended search access to the browser.

## Define the records

Choose the public content to index and give each record a stable identifier. Include the title, URL, and fields needed for search and filtering. Exclude drafts, private posts, credentials, and customer data unless you have designed an authenticated search boundary.

## Build the index

Create the application and index, then send a small test dataset through a trusted indexing process. Wait for indexing tasks to finish before verifying the results.

## Add the interface

Use a supported client or UI library with a restricted search key. Test a query, empty results, filters, and pagination. Check that result URLs reach the intended public page.

## Keep it current

Handle updates and deletions as well as initial imports. A published page can remain stale in search until the indexing workflow updates it.

Use [Algolia's quickstart](https://www.algolia.com/doc/guides/get-started/quickstart) for version-matched client code and [API-key guidance](https://www.algolia.com/doc/guides/security/api-keys) for access restrictions.
