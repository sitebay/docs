---
title: Developer Access
description: Create limited access for developers.
keywords: ["accounts", "security"]
tags: ["sitebay platform","security"]
published: 2024-04-26
modified: 2025-12-04
modified_by:
  name: SiteBay
aliases: ['/platform/create-limited-developer-account/','/guides/create-limited-developer-account/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Need a contractor or a teammate to work on your WordPress sites, check PostHog analytics, or connect via the SiteBay MCP Server? Don't hand over your main password. Create a restricted user instead.

## How to Add a Developer User

1. Head to [my.sitebay.org](https://my.sitebay.org), click **Account**, then **Users & Grants**.
2. Hit **Add a User**.
3. Drop in their email address.
4. Under Account Access, make sure you pick **Limited** (not Full!).
5. Tweak their specific permissions and hit save.

## Common Permission Setups

| What to give them | What it does |
|-------------------|--------------|
| **Full access** | *Don't use this for devs!* Lets them do whatever they want, including spending your money. |
| **Specific sites** | Restricts them to managing only the WordPress pods you select. |
| **Billing** | Lets them view or edit billing info (usually keep this off for devs). |
| **Read-only** | Great if they just need to look at configs or stats without breaking anything. |

## How to Kick Them Out

Contract over? Revoke their access immediately:
1. Go to **Account** → **Users & Grants**.
2. Find the developer's user profile and hit **Delete**.

## Quick Security Reminders

- Never DM someone your admin password.
- Always use the restricted roles feature.
- Remind your devs they can use the SiteClaw mobile app to check server status on the go if you give them the right permissions.