---
title: WordPress vulnerability scanning
date: 2026-04-28
tags:
- sitebay
- wordpress
- security
authors:
- SiteBay
contributors:
- SiteBay
description: SiteBay's WPBastion integration checks an authorized site for vulnerability findings. Starting a scan
  requires a paid team plan and authenticated site access.
keywords:
- wordpress security scanning
- sitebay documentation
published: 2026-04-28
slug: wordpress-security-scanning
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- vulnerability-scan
modified: 2026-10-07
---

SiteBay's WPBastion integration checks an authorized site for vulnerability findings. Starting a scan requires a paid team plan and authenticated site access.

## Read a completed result

Starting a scan returns an identifier before results are ready. Read that scan's status until it completes or fails. Empty findings while the status is `queued` or `scanning` mean results are unavailable, not that the site is clean.

## Verify remediation

Review the affected component and proposed version before approving an update. Run a new scan after remediation and inspect its completed result. An in-flight fixing indicator is not proof that the update succeeded.

This is not a file-by-file malware investigation. Use the [scan procedure]({{< relref "guides/security/vulnerabilities/scanning-your-wordpress-site-for-malware/index.md" >}}) for API steps and [incident recovery]({{< relref "guides/security/recovery/recovering-from-a-wordpress-hack/index.md" >}}) for a suspected compromise.
