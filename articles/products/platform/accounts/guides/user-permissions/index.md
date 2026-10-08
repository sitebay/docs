---
title: User Permissions
description: "Configure user access levels."
published: 2024-04-21
modified: 2025-12-04
authors: ["SiteBay"]
contributors: ["SiteBay"]
modified_by:
  name: SiteBay
tags: ["sitebay platform","users"]
---

Control exactly what your team can see and do. Whether you want to restrict access to PostHog analytics, prevent someone from spinning up expensive Kubernetes resources, or just let an external dev manage your WordPress sites via the SiteBay MCP Server—we've got you covered.

## How to Set Permissions

1. Go to **Account** → **Users & Grants**.
2. Click **User Permissions** next to the user you want to restrict.
3. Tweak the toggles and hit **Save**.

## What the Permissions Mean

### Full Account Access

- **ON**: They can do everything. Create clusters, delete sites, view billing. Be careful with this one.
- **OFF**: They're restricted. You'll need to manually configure what they can touch below.

### Global Permissions

These apply to your entire account:
- Create new WordPress sites
- Spin up other services (databases, object storage)
- *(Watch out: things marked with a $ mean they can spend your money!)*

### Billing Access

| Level | What They Can Do |
|-------|------------------|
| **None** | Can't see invoices or payment info. |
| **Read Only** | Can view invoices and past payments. |
| **Read-Write** | Full control over the credit card and billing settings. |

### Specific Services

You can also lock things down on a per-resource basis (like specific WordPress sites or clusters):
- **None**: The resource is completely invisible to them.
- **Read Only**: They can see it, but can't touch it.
- **Read-Write**: They have full control and will get notifications if something breaks.