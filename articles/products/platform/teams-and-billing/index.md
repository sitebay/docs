---
slug: teams-and-billing
description: "How SiteBay's team and billing model works: teams own sites, plans set resource quotas, and Stripe handles payments."
keywords: ['teams', 'billing', 'plans', 'pricing', 'stripe', 'quotas', 'resources']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-15
modified: 2026-03-15
modified_by:
  name: SiteBay
title: "Teams and Billing"
bible: true
tags: ["sitebay", "teams", "billing", "plans"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Teams and Billing

SiteBay uses a team-based ownership model. Sites belong to teams, teams have plans, and plans define resource quotas.

## Teams

Every user automatically gets a **personal team** when they sign up. The personal team's ID equals the user's ID — it cannot be deleted.

### Team Hierarchy

```
User
├── Personal Team (default, team_id == user_id)
│   ├── Site A (example.com)
│   └── Site B (blog.example.com)
└── Agency Team (shared with other members)
    ├── Site C (client1.com)
    └── Site D (client2.com)
```

### Team Members

Teams can have multiple members with different permission levels:

- **Owner** (level 8) — full control, billing access, can delete the team
- **Member** (level 1) — can manage sites but cannot modify billing or team settings

Members are invited via email and must accept the invitation to join.

## Plans and Pricing

Each team has exactly one plan. The plan determines resource quotas for all sites owned by that team.

### Plan Tiers

| Plan | Monthly (USD) | Monthly (CAD) | Monthly (EUR) | Visits | Storage | Bandwidth | Sites |
|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Free** | $0 | $0 | $0 | 3,000 | 1 GB | 10 GB | 1 free site |
| **Micro** | $19 | $25 | $19 | 12,000 | 8 GB | 30 GB | 1 |
| **Starter** | $29 | $35 | $29 | 30,000 | 20 GB | 60 GB | 1 |
| **Business** | $129 | $159 | $129 | 150,000 | 40 GB | 250 GB | 5 |
| **Enterprise** | $300 | $380 | $300 | 500,000 | 50 GB | 500 GB | 15 |
| **Agency** | Custom | Custom | Custom | Per-site | Per-site | Per-site | 99 |

Annual billing is available at a discount (roughly 2 months free).

### Additional Sites

Paid plans can add extra sites beyond their plan's included count:

- **$12/month** (USD/EUR) or **$15/month** (CAD) per additional site

### Free Tier Details

- Every user gets **one free site** on the `sitebay.ca` test domain (e.g., `yourname.sitebay.ca`).
- Free sites have limited resources (1 GB storage, 3,000 visits/month).
- Free sites may be put to sleep after periods of inactivity.
- Only one free site per account (enforced by phone number and card last-4 to prevent abuse).

## Resource Quotas

Plan quotas are enforced at the **team level**, not per-site:

- **Visits** — total monthly page views across all sites in the team
- **Storage** — total disk usage across all sites (measured in MB)
- **Bandwidth** — total monthly data transfer across all sites

When a team exceeds its quotas:

1. A warning email is sent to the team owner.
2. Sites continue to function (no immediate cutoff).
3. Persistent overages may result in sites being put to sleep.

### Storage Per Site (Kubernetes PVC)

The physical Kubernetes PVC size per site is based on the plan:

| Plan | PVC Size |
|------|---------|
| Free | 1 GiB |
| Micro | 8 GiB |
| Starter+ | 20 GiB |

This is a physical cap, not a billing limit. Billing enforcement uses the team-level storage quota.

## Billing Cycles

- Plans renew every 30 days from the activation date.
- Visit and bandwidth counters reset at the start of each cycle.
- Storage is measured continuously (it doesn't reset).

## Stripe Integration

All billing is handled through Stripe:

- Each user has a Stripe customer ID (`stripe_id`).
- Each team's plan maps to a Stripe subscription (`sub_id`).
- Supported currencies: **USD**, **CAD**, **EUR** (auto-detected from payment method country).
- Payment methods: credit/debit cards via Stripe.
- Taxes are calculated based on the card's billing country (Canadian provinces get HST/GST, UK gets 20% VAT).

## Domain Options

Sites can use three DNS configurations:

| Option | Description |
|--------|-------------|
| `testing` | Uses a `*.sitebay.ca` subdomain (free sites, no custom domain) |
| `ns` | Full nameserver delegation to SiteBay (`ns1.sitebay.org` / `ns2.sitebay.org`). Enables automatic DNS management, Cloudflare CDN, and dev mode. |
| `pointed` | User's DNS points to SiteBay via CNAME record. Limited DNS control. |

When nameservers are delegated to SiteBay (`ns` mode), the platform can:
- Automatically create/update DNS records
- Enable Cloudflare dev mode for bypassing cache
- Manage SSL certificates
- Create DNS records for subdomains via the API

## Coupons and Referrals

- Users have a unique referral code (`ref_code`) and join link (`https://join.sitebay.org/{ref_code}`).
- Coupons can be applied to teams to discount plan costs.
- Shopify Link users get a special Shopify starter coupon.
