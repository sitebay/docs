---
slug: set-up-subdomain-or-subdirectory-wordpress
author:
  name: SiteBay
  email: support@sitebay.org
description: Choose the hosting path that matches the application before installing a web server.
keywords:
- hosting a website
- website
- s3
tags:
- web server
- nginx
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-13
title: Choose a website hosting path
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- platform-architecture
- lifecycle
---

Choose the hosting path that matches the application before installing a web server.

For managed WordPress on SiteBay, create a site through the dashboard or supported API. The platform manages the hosting service; a site workspace is not a general-purpose virtual machine for installing another web-server stack.

For a separate server you administer, plan its operating system, web server, runtime, database, TLS, updates, and recovery. Follow the documentation for the selected versions and keep public access closed until configuration is ready.

Test the application before pointing a production domain at it. See [Create a SiteBay site]({{< relref "guides/get-started/getting-started-with-site-bay/index.md" >}}) or [LAMP compatibility]({{< relref "platform/migrate-to-sitebay/migrate-a-lamp-website-to-sitebay/index.md" >}}).
