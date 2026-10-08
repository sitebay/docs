---
title: Run the STS2 MCP application
published: 2026-10-07
authors:
- SiteBay
contributors:
- SiteBay
description: The current STS2 engine is an independent MCP code application with a deterministic game engine and
  public-primitive scenes.
keywords:
- play slay the spire 2 with sorti
- sitebay documentation
slug: sts2
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sts2-engine
- sorti-byo
modified: 2026-10-08
---

The current STS2 engine is an independent MCP code application with a deterministic game engine and public-primitive scenes. It runs independently of the local-game relay.

## Start the local demo

From an authorized checkout of the STS2 engine repository:

```sh
npm ci
npm run build
npm run demo
```

The demo prints its local address. `npm run dev` starts the Worker. The project pins public SDK archives; a sibling Sorti checkout is not required for installation.

## Verify a change

Run the type, authoring, and generated-source checks from that checkout:

```sh
npm run typecheck
npm run test:authoring
npm run build:check
```

The game engine owns rules and durable state. Human controls and agent tools use the same authority; animation callbacks do not award damage or change inventory.

## Check assets and scope

Official presentation requires the approved artwork mirror and installed custom assets. Use the project's preflight before its official acceptance gate. Missing artwork must be reported, not replaced by an unrelated skin while claiming acceptance.

The source-only Signal Garden reference can be checked separately with `npm run reference:verify`. That is not official-game acceptance. Remote publication, storage migrations, and artwork redistribution are separate decisions.

See [the BYO contract]({{< relref "mcp/byo-mcp.md" >}}) for MCP installation and conformance boundaries.
