---
slug: api-reference
description: "SiteBay REST API reference: authentication, base URL, key endpoints for managing sites, teams, billing, and infrastructure."
keywords: ['api', 'rest', 'endpoints', 'authentication', 'bearer token', 'fastapi']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-15
modified: 2026-03-15
modified_by:
  name: SiteBay
title: "SiteBay API Reference"
bible: true
tags: ["sitebay", "api", "rest", "developers"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# SiteBay API Reference

The SiteBay API is a REST API built with FastAPI. It powers the dashboard, mobile app, MCP server, and all integrations.

## Base URL

```
https://my.sitebay.org/f/api/v1
```

## Authentication

All API requests require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your-api-token>
```

Tokens are issued at login and expire after 7 days. You can generate long-lived API tokens from the SiteBay Dashboard under **Settings > API Keys**.

## Key Endpoints

### Sites

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/site` | List all sites for the authenticated user |
| `GET` | `/site/{fqdn}` | Get details for a specific site |
| `POST` | `/site` | Create a new WordPress site |
| `PUT` | `/site/{fqdn}` | Update site configuration |
| `DELETE` | `/site/{fqdn}` | Delete a site permanently |

### Site Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/site/{fqdn}/shell_command` | Run a shell or WP-CLI command on the site |
| `POST` | `/site/{fqdn}/edit_file` | Edit a file in the site's wp-content directory |
| `GET` | `/site/{fqdn}/logs` | Get WordPress, PHP, access, error, or git-sync logs |
| `GET` | `/site/{fqdn}/container_logs` | Get raw Kubernetes pod logs |
| `POST` | `/site/{fqdn}/renew_lease_code_server` | Extend Code Server session |

### Staging

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/site/{fqdn}/stage` | Create a staging environment |
| `DELETE` | `/site/{fqdn}/stage` | Delete the staging environment |
| `POST` | `/site/{fqdn}/stage/commit` | Push staging changes to live |

### Backups & Restore

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/site/{fqdn}/backup/commits` | List available backup commits |
| `GET` | `/site/{fqdn}/backup/files` | Browse files at a point in time |
| `GET` | `/site/{fqdn}/backup/download_urls` | Get signed download URLs for backup files |
| `POST` | `/site/{fqdn}/backup/preview_restore` | Preview what a restore would change |
| `POST` | `/site/{fqdn}/backup/restore` | Execute a point-in-time restore |

### Checkpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/site/{fqdn}/checkpoints` | Create a named checkpoint with auto-screenshot |
| `GET` | `/site/{fqdn}/checkpoints` | List all checkpoints |
| `GET` | `/site/{fqdn}/checkpoints/{id}` | Get checkpoint details |
| `DELETE` | `/site/{fqdn}/checkpoints/{id}` | Delete a checkpoint |
| `POST` | `/site/{fqdn}/checkpoints/{id}/restore` | Restore to a checkpoint |

### DNS

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/site/{fqdn}/dns` | Get DNS records (nameserver-controlled sites only) |
| `POST` | `/site/{fqdn}/dns` | Create a DNS record (A or CNAME) |
| `DELETE` | `/site/{fqdn}/dns/{record_id}` | Delete a DNS record |

### External Paths

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/site/{fqdn}/external_paths` | List external path proxies |
| `POST` | `/site/{fqdn}/external_paths` | Create a reverse proxy path (e.g., `/blog` → external URL) |

### Teams

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/team` | List all teams |
| `GET` | `/team/{team_id}` | Get team details |
| `POST` | `/team/{team_id}/invite` | Invite a member to a team |

### Account

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/account` | Get current user profile |
| `PUT` | `/account` | Update user profile |
| `GET` | `/account/affiliates` | Get referral/affiliate info |

### Billing

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/plan` | Get current plan details |
| `POST` | `/plan/checkout` | Create a Stripe checkout session |

### Git Sync

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/git/repos` | List linked Git repositories |
| `GET` | `/git/linked` | Get GitHub, GitLab, and Bitbucket repos |

### Regions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/region` | List available deployment regions |

### Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/template` | List available ready-made site templates |

### Shopify

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/shopify/stores` | List connected Shopify stores |
| `GET` | `/shopify/stores/{store_id}` | Get Shopify store details |
| `PUT` | `/shopify/stores/{store_id}` | Update store configuration |

### Proxy Endpoints

SiteBay provides proxy endpoints for passing requests through to underlying services:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `*` | `/site/{fqdn}/wp-proxy/**` | Proxy to WordPress REST API |
| `*` | `/site/{fqdn}/shopify-proxy/**` | Proxy to Shopify Admin API |
| `*` | `/site/{fqdn}/posthog-proxy/**` | Proxy to PostHog API |

These proxy endpoints handle authentication automatically — the SiteBay API token is sufficient.

## Error Handling

The API returns standard HTTP status codes:

- `200` — Success
- `400` — Bad request (e.g., site is busy, invalid input)
- `401` — Unauthorized (missing or invalid token)
- `403` — Forbidden (no access to this resource)
- `404` — Not found
- `422` — Validation error (FastAPI returns detailed field errors)
- `500` — Internal server error

Error responses include a `detail` field with a human-readable message:

```json
{
  "detail": "Site is currently busy (Creating). Please wait for the current operation to complete."
}
```

## MCP Integration

The SiteBay MCP Server wraps these API endpoints into tools that AI agents can call directly. Every MCP tool maps to one or more API endpoints listed above. See the [MCP Server documentation](/products/mcp/get-started) for details.
