---
title: SiteBay API
linkTitle: SiteBay API
toc: true
outputs:
- HTML
- JSON
authors:
- SiteBay
contributors:
- SiteBay
description: Start with an authenticated read and verify the team and site context before enabling mutations.
keywords:
- sitebay api documentation
- sitebay documentation
published: 2025-03-18
slug: api
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- api-contract
- api-auth
modified: 2026-10-07
---

Start with an authenticated read and verify the team and site context before enabling mutations. The service base is `https://my.sitebay.org/f/api/v1`. The source-derived references below replace imported upstream tags and stale operation tables.

## Reference sections

- [Account and API keys]({{< relref "api/account.md" >}})
- [WordPress application credentials]({{< relref "api/application_password.md" >}})
- [Domains and DNS]({{< relref "api/domains.md" >}})
- [Account events]({{< relref "api/event.md" >}})
- [Site image status]({{< relref "api/images.md" >}})
- [Team invitation acceptance]({{< relref "api/invite.md" >}})
- [Plan and pricing API]({{< relref "api/plan.md" >}})
- [Region API]({{< relref "api/region.md" >}})
- [Live-site API]({{< relref "api/site_live.md" >}})
- [Staging API]({{< relref "api/site_stage.md" >}})
- [Team API]({{< relref "api/team.md" >}})
- [Ready-made site catalog]({{< relref "api/template.md" >}})
- [Support ticket API]({{< relref "api/ticket.md" >}})
- [Site inspection utilities]({{< relref "api/utils.md" >}})

## Read-only first request

```sh
: "${SITEBAY_TOKEN:?Set a scoped credential securely}"
curl --fail-with-body --silent --show-error \
  --header "Authorization: Bearer ${SITEBAY_TOKEN}" \
  https://my.sitebay.org/f/api/v1/team
```

The credential is an environment value, not literal sample data. Use the correct collection response shape and identifiers. The documented public pricing and region catalogs do not require a bearer token; protected account and site operations do.

## Scope and provenance

The checked-in catalog is a selected reference extracted from the current client OpenAPI contract and checked against router mounts. It is not an export of administrator, test, or internal operations, and it is not a claim that every deployment supports every optional integration. The browser and API must agree on the applied result after any background operation.

See [API integration and error handling]({{< relref "products/platform/api-reference/index.md" >}}) before writing a client.
