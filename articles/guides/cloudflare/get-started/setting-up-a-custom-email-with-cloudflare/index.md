---
slug: setting-up-a-custom-email-with-cloudflare
description: Domain email and WordPress's outgoing application mail require separate configuration.
keywords:
- email
- custom
- imail
- gmail
tags:
- email
- custom
- imail
- gmail
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-13
title: Set up email for a custom domain
aliases:
- /guides/cloudflare/get-started/setting-up-wordpress-with-cloudflare/
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- cloudflare-dns
---

Domain email and WordPress's outgoing application mail require separate configuration.

## Choose the mail service

Decide whether you need inbound forwarding, hosted mailboxes, or transactional sending. Follow the current service's setup for the domain you control. Cloudflare's available email features and requirements are documented in its [Email Service guide](https://developers.cloudflare.com/email-service/).

## Configure and verify DNS

Use the MX and authentication records supplied by the selected service. Do not combine incompatible MX setups from two providers or copy another domain's verification value. Preserve a record of the previous configuration.

## Test both directions

Send an inbound test message and confirm delivery to the intended recipient. Test WordPress form and password-reset delivery separately with the configured outgoing service. Forwarding an address does not automatically authenticate WordPress's mail sender.

Protect mail credentials and check spam or rejection details when a test fails.
