---
slug: accounts-and-passwords
author:
  name: SiteBay
  email: support@sitebay.org
contributors:
- SiteBay
description: Use a distinct account identity for SiteBay and each WordPress site.
keywords:
- accounts
- passwords
- My SiteBay
tags:
- sitebay platform
- security
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases:
- /platform/accounts-and-passwords/
- /accounts-and-passwords/
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-03
title: Accounts, passwords, and MFA
authors:
- SiteBay
doc_sources:
- account-ui
- teams
- api-auth
- pricing
---

Use a distinct account identity for SiteBay and each WordPress site. A team invitation grants membership in SiteBay; it does not automatically create the same user in a site's WordPress database.

## Sign-in methods

The service supports authenticated sessions and a passwordless magic-link flow. Opening a requested magic link can create an account for an address that does not already have one. Treat the link as a credential and do not forward it to another person.

## Password management

Use the current sign-in or account password form. Follow server-side validation rather than a copied minimum-length rule. Use a unique password stored in a password manager and change it when it is compromised. Avoid putting the password in command-line history, an example configuration, or a request URL.

## Multi-factor authentication

TOTP setup returns a secret and an authenticator URI/QR image, but setup alone does not enable the factor. The first valid code confirms it. A pending setup expires, and replacing an existing factor requires the supported disable/recovery process. API-key authentication cannot administer the user's factor.

## Keep boundaries separate

The account profile, billing contact, WordPress user email, and provider OAuth grants are separate records. Verify each one deliberately when changing ownership or recovering access. For teammate management, see [team access and billing]({{< relref "products/platform/teams-and-billing/index.md" >}}). For account recovery, use [password recovery]({{< relref "products/platform/accounts/guides/reset-user-password/index.md" >}}).
