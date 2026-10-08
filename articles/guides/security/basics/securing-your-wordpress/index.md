---
slug: securing-your-wordpress
description: Reduce risk through updates, limited access, trustworthy software, and a tested recovery path.
keywords:
- security
- firewall
- waf
- malware
- ssl
- kubernetes security
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Secure a WordPress site
bible: true
tags:
- sitebay
- security
- infrastructure
aliases:
- /guides/security/basics/securing-your-wordpress/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- wp-security
- vulnerability-scan
- api-auth
- lifecycle
---

Reduce risk through updates, limited access, trustworthy software, and a tested recovery path.

## Review access

Give each person their own account and the permissions their work requires. Use unique passwords and enable the available additional authentication controls. Remove unused users and integration credentials.

## Maintain the application

Keep WordPress, themes, and plugins supported and updated. Remove components you no longer use. Obtain software from trusted publishers; do not install a modified premium plugin from an unknown download site.

## Prepare recovery

Protect both site files and the database. Check the available recovery points and test a restoration process before an incident. A Git repository is not a full backup of uploaded media or database content.

## Inspect changes

Use logs and vulnerability findings to investigate specific problems. Neither a successful login nor a scan with no reported findings proves the site cannot be compromised.

Follow [WordPress hardening guidance](https://developer.wordpress.org/advanced-administration/security/hardening/) and the [SiteBay vulnerability workflow]({{< relref "guides/security/vulnerabilities/scanning-your-wordpress-site-for-malware/index.md" >}}).
