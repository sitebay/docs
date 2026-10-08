---
slug: fix-dns-probe-finished-nxdomain
author:
  name: SiteBay
  email: support@sitebay.org
description: DNSPROBEFINISHEDNXDOMAIN means the browser's DNS lookup did not find the requested name. Check the
  name and DNS configuration before changing the web application.
keywords:
- server
- error
tags:
- server error
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
image: FixDnsProbe.png
title: Troubleshoot a domain that does not resolve
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- cloudflare-dns
---

`DNS_PROBE_FINISHED_NXDOMAIN` means the browser's DNS lookup did not find the requested name. Check the name and DNS configuration before changing the web application.

## Check the domain

Verify spelling, registration, nameservers, and the specific hostname such as `www`. Confirm the required record exists at the authoritative DNS provider.

## Compare lookups

Use a DNS lookup tool to compare the expected record with the response. A recent change can interact with cached answers; record the lookup time and resolver when comparing results.

## Check the site after DNS works

Once the name resolves, test HTTPS and the application separately. Correct DNS does not prove the TLS certificate or hosted site is ready.

Use [Cloudflare's DNS troubleshooting guide](https://developers.cloudflare.com/dns/troubleshooting/dns-probe-finished-nxdomain/) and avoid repeatedly replacing records without identifying which layer failed.
