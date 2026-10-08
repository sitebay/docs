---
title: Domains and DNS
slug: domains
authors:
- SiteBay
contributors:
- SiteBay
description: Inspect domain and site DNS state before changing it.
keywords:
- domains
- sitebay documentation
published: 2026-10-08
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Inspect domain and site DNS state before changing it. A DNS record, domain registration, nameserver delegation, and HTTPS provisioning are different operations. Use a site you are authorized to manage and retain the previous values for a deliberate cutover.

## Contract and authentication

The operations below are extracted from the checked-in SiteBay client contract. They describe source-supported routes, not a live availability test. Use the deployed service at `https://my.sitebay.org`, the exact method, and the full path shown. A bearer credential does not override team membership or action-specific authorization.

### List custom hostnames

`GET /f/api/v1/site/{fqdn}/custom_hostname`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Add custom hostname

`POST /f/api/v1/site/{fqdn}/custom_hostname`

Parameters: `fqdn` (path, required).

Request schema: `CustomHostnameCreate`. Required body fields: `hostname`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Remove custom hostname

`DELETE /f/api/v1/site/{fqdn}/custom_hostname/{hostname_id}`

Parameters: `hostname_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Get DNS records

`GET /f/api/v1/site/{fqdn}/dns`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

### Create DNS record

`POST /f/api/v1/site/{fqdn}/dns`

Parameters: `fqdn` (path, required).

Request schema: `DNSRecordCreateRequest`. Required body fields: `name`, `type`, `content`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Delete DNS record

`DELETE /f/api/v1/site/{fqdn}/dns/{dns_id}`

Parameters: `dns_id` (path, required), `fqdn` (path, required).

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Update DNS record

`PATCH /f/api/v1/site/{fqdn}/dns/{dns_id}`

Parameters: `dns_id` (path, required), `fqdn` (path, required).

Request schema: `DNSRecordUpdateRequest`. Consult the schema for optional body fields.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Toggle DNS record proxy

`PATCH /f/api/v1/site/{fqdn}/dns/{dns_id}/proxy`

Parameters: `dns_id` (path, required), `fqdn` (path, required).

Request schema: `ProxyToggleRequest`. Required body fields: `proxied`.

Documented responses: `200`, `422`. This operation changes state; review its target and effect before sending it.

### Check nameserver propagation

`GET /f/api/v1/site/{fqdn}/ns_status`

Parameters: `fqdn` (path, required).

Documented responses: `200`, `422`. Read the returned record rather than inferring state from the request URL.

## Integration checks

Handle authorization and validation errors without silently retrying a mutation. Preserve returned IDs and inspect the result after an accepted background operation. Keep bearer tokens out of URLs, browser bundles, logs, screenshots, and commits.

[API integration guide]({{< relref "products/platform/api-reference/index.md" >}}) explains authentication, pagination, and error handling.
