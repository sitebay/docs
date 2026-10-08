---
title: Play Slay the Spire 2 with Sorti
---

# Play Slay the Spire 2 with Sorti

Sorti talks to Slay the Spire 2 through the STS2 MCP bridge. The bridge proxies
the local STS2_MCP mod, enriches state with card and relic art, and renders
`ui://sts2/*` panels for combat, map, rewards, shop, events, rest sites, deck,
co-op lobby, and run summaries.

## Setup

1. Install the STS2_MCP mod in Slay the Spire 2.
2. Run the `sts2-mcp-relay` binary. First run opens Sorti pairing and writes
   `~/.sts2-mcp-bridge/session.json`.
3. Open Sorti and enable the STS2 bridge endpoint.
4. Use `/sts2` or select one of the STS2 specialists.

## What Sorti adds

- `sts2-pilot` for combat
- `sts2-navigator` for map, rewards, shops, events, and rest sites
- `sts2-deck-builder` for deck composition
- `sts2-coop` for shared runs
- `sts2-coop-narrator` for state-change narration

Fixture mode is available for development and CI when the game is not running.
