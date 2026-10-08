---
slug: install_elasticsearch_debian_ubuntu
description: Algolia is a hosted search service. You do not install an Algolia search server with a Debian or Ubuntu
  package command.
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
keywords:
- algolia
- elastic stack
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Use Algolia from a Linux application
published: 2024-05-04
headless: true
relations:
  platform:
    key: install-algolia
    keywords:
    - distribution: Debian/Ubuntu
tags:
- database
aliases:
- /databases/algolia/install_elasticsearch_debian_ubuntu/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- algolia
---

Algolia is a hosted search service. You do not install an Algolia search server with a Debian or Ubuntu package command.

## Prepare the application

Choose the official client for the language and version used by your application. Install it through that language's package manager, following the current client documentation. Pin dependencies in the application's lockfile.

## Configure access

Keep the application ID, index name, and server-side write credential in the intended environment or secret store. The service needs outbound HTTPS access. Do not expose the write credential through client-side build variables.

## Verify one operation

Index a small, non-sensitive test record in a test index. Wait for the indexing task to finish, query it using the permitted search access, and remove it when finished.

The [Algolia setup guide]({{< relref "guides/databases/algolia/create-search-with-algolia/index.md" >}}) covers the source-to-index workflow. Use the provider's documentation for the client version you install.
