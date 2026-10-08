---
title: Account questions
title_meta: Account questions
description: They are separate identities. Use the reset flow for the account you need rather than changing an unrelated
  credential.
tab_group_main:
  weight: 60
published: 2024-03-04
modified: 2026-10-07
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- faqs
- sitebay documentation
slug: faqs
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- teams
- api-auth
- support
layout: documentation-section
---

## Is my WordPress login the SiteBay login?

They are separate identities. Use the reset flow for the account you need rather than changing an unrelated credential.

## How do collaborators get access?

Use individual team memberships and the appropriate role. Review WordPress users and repository permissions separately.

## Does an API key grant every operation?

No. The key's authentication and scope do not replace resource-level authorization. Use the least access needed for the integration.

## What should I include in an access report?

Provide the account or team context, site, time, action, and redacted error. Do not send a password or token.

See [account procedures]({{< relref "products/platform/accounts/guides/_index.md" >}}) and [API setup]({{< relref "platform/api/getting-started-with-the-sitebay-api/index.md" >}}).
