---
description: Reset the credential for the system you are signing into. Your SiteBay account, a WordPress administrator,
  and an external Git provider do not share one password-reset operation.
keywords:
- password
- change password
- update password
- My SiteBay
tags:
- sitebay platform
- My SiteBay
- security
published: 2024-04-21
modified: 2026-10-08
image: L_ChangeYourPassword.png
title: Reset a SiteBay password
title_meta: Reset a SiteBay password
aliases:
- /quick-answers/platform/how-to-change-your-password/
- /guides/how-to-change-your-password/
authors:
- SiteBay
contributors:
- SiteBay
modified_by:
  name: SiteBay
slug: reset-user-password
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- account-ui
- teams
- api-auth
- pricing
---

Reset the credential for the system you are signing into. Your SiteBay account, a WordPress administrator, and an external Git provider do not share one password-reset operation.

## Change a password while signed in

Use the account password form. The current client submits the new password to the authenticated account update endpoint and surfaces validation errors. Follow the password requirements shown by the server. A returned error means the change was not accepted.

## Recover access

Start from the sign-in page's recovery flow for the account email. Follow the most recent message sent by the service. Magic-link sign-in is a separate passwordless flow; receiving or opening a link is not proof that a new password was set. Treat recovery links and verification codes as secrets.

If MFA is enabled, follow its challenge rather than attempting to bypass it through a different API key. TOTP setup is not active until the first code is confirmed. Store the authenticator secret in an appropriate secure authenticator and do not paste it into chat or logs.

## Confirm the change

Check the success response and sign in using the intended method. Review sessions and separately issued keys after a suspected compromise; changing a password alone does not demonstrate that every integration token was revoked. For a WordPress-only reset, use that site's administrator recovery path with authorization. For help, [contact support]({{< relref "products/platform/get-started/guides/support/index.md" >}}).
