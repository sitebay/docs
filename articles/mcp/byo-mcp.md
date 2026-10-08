---
title: Build an MCP app for Sorti
published: 2026-10-07
authors:
- SiteBay
contributors:
- SiteBay
description: A BYO-MCP application declares its capabilities, exposes MCP tools and resources, and runs behind its
  own authorization boundary.
keywords:
- build your own mcp for sorti
- sitebay documentation
slug: byo-mcp
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-byo
- sorti-panels
modified: 2026-10-07
---

A BYO-MCP application declares its capabilities, exposes MCP tools and resources, and runs behind its own authorization boundary.

## Required endpoints

| Endpoint | Purpose |
| --- | --- |
| `GET /.well-known/byo-mcp/capabilities.json` | Application capabilities |
| `GET /.well-known/mcp/server-card.json` | Discoverable server and tool definitions |
| `POST /mcp` | MCP requests |

The capability document requires `id`, `version`, `kind: "byo-mcp"`, `kind_version: "1"`, `modules`, `specialists`, and `multiplayer`. A module claims its tools; the conformance bundle limits each module to 20 tools. Each specialist can select at most 12 declared tools.

## Return normal tool results

Use the MCP `content` array and, when appropriate, `structuredContent`. Do not return the retired top-level `panel` object.

Panels use a `ui://` resource with MIME type `text/html;profile=mcp-app;version=1`. Declared panels must be reachable through their emitting tools or `resources/read`. A `primitive-spec` resource contains a supported primitive tree, including the applicable metadata and origin declarations.

## Test safely

Install the conformance bundle with its declared `@sitebay/panel-primitives` dependency and preserve its sibling fixtures. From the bundle directory, run:

```sh
node run-all.mjs --target=http://localhost:8787
```

Point it at your fixture-mode server, not a live customer system. Declare safe probe tools and required test data. The checks cover discovery, schemas, round trips, panel resources, and declared multiplayer behavior.

A passing bundle does not install the app, grant permissions, verify every tool's business behavior, or publish it. Check those boundaries separately.

For host-facing UI, read [Panels and MCP]({{< relref "sorti/panels-and-mcp.md" >}}).
