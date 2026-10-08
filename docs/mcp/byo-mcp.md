---
title: Build your own MCP for Sorti
---

# Build your own MCP for Sorti

Sorti can load an external MCP when it exposes the BYO capability contract.

## Required endpoints

- `GET /.well-known/byo-mcp/capabilities.json`
- `GET /.well-known/mcp/server-card.json`
- `POST /mcp`

Capabilities must include `kind: "byo-mcp"` and `kind_version: "1"`.

## Specialists

Declare one or more specialists. Each specialist maps to a Sorti agent and may
use at most 12 tools.

## Panels

Tool results can include a stable panel envelope:

```json
{ "panel": { "uri": "ui://example/main", "name": "Example", "description": "Current view", "html": "<section>...</section>" } }
```

Panel HTML must be static, script-free, and under 64KB.

## Multiplayer

If your MCP supports multiplayer, expose the `coop_*` tools and keep transport
separate from semantics. Sorti owns LiveKit; your MCP owns the room state or the
proxy polish layer.

## Conformance

Run the public conformance bundle before wiring the MCP into Sorti:

```bash
node /home/bitnami/sorti/packages/sorti-contract/byo/conformance/run-all.mjs --target=http://localhost:8787
```

The STS2 bridge is the reference implementation.
