---
slug: get-started-mcp
description: SiteBay exposes a first-party, in-process MCP service derived from its allowed API routes.
keywords:
- mcp
- claude
- anthropic
- wordpress management
- ai agent
- automation
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-12
modified: 2026-10-07
modified_by:
  name: SiteBay
title: Connect an assistant to SiteBay MCP
bible: true
tags:
- sitebay
- mcp
- ai
- claude
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- mcp-platform
- api-auth
---

SiteBay exposes a first-party, in-process MCP service derived from its allowed API routes. It uses the calling account's authorization, scope, idempotency and rate-limiting rules. Connecting an assistant does not grant unrestricted shell or infrastructure control.

## Connection endpoint

The source-configured API prefix mounts the MCP service at:

```text
https://my.sitebay.org/f/api/v1/mcp
```

Use an MCP client that supports the transport and authentication advertised by that deployment. Add the endpoint through the client's supported server-connection flow and authenticate for the intended account. Discover the tool list rather than copying a guessed tool name from an old screenshot.

The server supports stateless streamable HTTP and protocol-version-dependent request handling. Let the client's MCP implementation perform negotiation; do not invent a persistent session identifier. Exact remote-client setup screens can change independently of SiteBay.

## First verification

Ask for a read-only description of the selected site and its current state. Verify that the returned account, team and domain are correct. A connected indicator or a tool appearing in the list is not proof that it can execute a particular action.

Read tool annotations and operation descriptions before granting writes. A plugin update, DNS edit, staging promotion or restore changes a real resource. Ask for the proposed target, expected impact and recovery plan before approval.

## Installation and credential cautions

The old `npx @sitebay/sitebay-mcp` and Smithery commands on this page were not established by the current in-process implementation; they have been removed. Do not install an unverified package or use a Stripe-style `sk_live_` example as a SiteBay credential. Keep session and API-key material in the client's secure configuration, not chat messages or Git.

## Diagnosing a failed action

Record the redacted tool name, target, response and operation ID. Refresh state after a timeout before retrying a mutation. Use [guarded intent workflows]({{< relref "products/mcp/agent-intents/index.md" >}}) where advertised. Do not delete/recreate staging to resolve a canvas or unrelated connection error.
