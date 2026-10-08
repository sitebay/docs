---
title: Manage team members
description: The team roster shows who can access the team’s sites. Select the team that
  owns the relevant sites before inviting or removing someone.
published: 2024-04-21
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
modified_by:
  name: SiteBay
aliases:
- /platform/accounts-and-passwords/
- /accounts-and-passwords/
- /guides/accounts-and-passwords/
keywords:
- manage users
- sitebay documentation
slug: manage-users
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- account-ui
- teams
- api-auth
- pricing
---

The team roster shows who can access the team’s sites. Select the team that owns the relevant sites before inviting or removing someone.

## View Your Team

An authorized owner or member can read the roster. Keep the user's ID separate from the membership-row ID. The API's team reference can be a declared PostHog team ID or team UUID; reuse returned identifiers rather than guessing.

## Add a New User

The owner creates an invitation for the recipient's email and first name, with an optional message. The recipient accepts their own join link. Pending invitations are owner-only because the link grants an opportunity to join. Do not publish join links in tickets, screenshots, or a shared repository.

Refresh the roster after acceptance. A sent invitation does not mean that membership is active, and it does not create a WordPress administrator in every site.

## Remove a User

The owner can remove another member. A member can leave their own membership; neither action removes the owner. The removal endpoint takes the member's user ID. Verify the resulting roster and review any separately issued integration credentials. Removing team access is not a subscription cancellation.

## Change Email

Account identity belongs to the user. Have the person use their own account settings or [contact support]({{< relref "products/platform/get-started/guides/support/index.md" >}}) when access is lost. Do not attempt to solve an invitation mismatch by sharing another member's credentials. See [team access and billing]({{< relref "products/platform/teams-and-billing/index.md" >}}) for the authorization boundaries.
