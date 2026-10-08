---
slug: getting-started-with-site-bay
description: Create a site in the correct team, verify that it is ready, and then connect the tools needed for your
  workflow.
keywords:
- getting started
- tutorial
- first steps
- setup sitebay
- beginner guide
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Get started with SiteBay
bible: true
tags:
- sitebay
- getting started
- tutorial
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- site-ui
- lifecycle
- regions
- pricing
- api-auth
- mcp-platform
---

Create a site in the correct team, verify that it is ready, and then connect the tools needed for your workflow. Keep the new site's test setup separate from an existing production migration.

## Create Your Account

Open the SiteBay sign-in/sign-up flow at `https://my.sitebay.org` and use the authentication method presented for the account. Keep verification links private. Read [accounts, passwords and MFA]({{< relref "platform/get-started/accounts-and-passwords/index.md" >}}) when configuring access.

## Deploy Your First Site

Select the owning team and review its current plan and site allowance. Choose an available region from the live catalog rather than a city copied from an old example. Select a blank WordPress starting point or an available ready-made site, enter the domain details requested by the current creation form, and review the proposed target.

Submit creation once and preserve the returned site/operation identifier. Provisioning and DNS/HTTPS readiness can complete at different times. Wait for the site's ready state and inspect an error before retrying; there is no blanket sub-minute completion guarantee.

## Open the site and WP Admin

Check the resulting URL in a browser. The current site view's **WP Admin** action requests a one-use, expiring SSO URL and opens it in a new tab. Use a fresh action if a grant expires or has already been consumed. Do not share the URL or paste its token into support logs.

Verify the site's title, content and administrator context. Creating a SiteBay team membership is not the same as adding a WordPress user in every site.

## Choose development tools

Open [code-server]({{< relref "products/code-server/get-started/index.md" >}}) for the authorized workspace or connect [Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}) for repository-based development. For assistants, use [the current first-party MCP connection]({{< relref "products/mcp/get-started/index.md" >}}) and discover the advertised tools. Do not install a package merely because an old tutorial guessed its name.

Create and validate a recovery point before a risky change. A staging environment can help test changes but is distinct from the live canvas preview and can still call external services.

## Connect a custom domain

Use the site's current domain/nameserver setup instructions and preserve the existing DNS zone, including email records. Verify authoritative DNS, the requested hostname, HTTPS and redirects before considering the cutover complete. A saved DNS record does not mean every resolver or certificate endpoint has updated.

## Check analytics and access

Verify the correct analytics project, event capture and privacy configuration with a test visit. Do not assume that a new site records every visitor or that recordings are complete. Test important forms and any checkout in the appropriate test mode before launch, then record the accepted state and recovery handle.
