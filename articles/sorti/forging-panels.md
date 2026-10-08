---
title: "Forging Panels"
description: "How Sorti's panel forge turns a conversation into a working app — state, reducer tools, and juice, all as data."
tags: ["sorti", "forge", "mcp", "panels", "reducers"]
published: 2026-07-07
weight: 45
---

# Forging Panels

The forge is how Sorti builds apps *inside* a session. You describe a panel —
a habit tracker, a scoreboard, a small card game — and a forge mission
assembles it live in your workspace: a rendered UI, real tools the agent and
the panel's buttons can call, and state that persists and replays. No build
step, no deploy, no code review, because there is no code — a forged panel
is data all the way down.

This article explains the ideas. For the exact vocabulary (every op,
expression, and budget), see the [forge reference](/docs/sorti/forge-reference/),
which is generated from the same document the forge's own authoring agent
reads.

## The shape of a forged panel

Every forged panel is three declarations:

1. **State** — one JSON document. It is the only truth; the view renders
   from it and nothing else.
2. **Tools** — named actions (at most 12). Each tool that mutates state
   carries a *reducer*: a small declarative program (`{"ops":[...]}`) that
   transforms state deterministically. Buttons in the panel fire tools;
   the session agent can call the same tools; in co-op, every seat's calls
   fold into the same shared state.
3. **A scene** — a primitive tree (`view`, `text`, `list`, `pressable`,
   `image`, `svg`, and friends) whose props *bind* to state paths. When
   state changes, the scene re-renders. There is no template language and
   no script in the panel.

The discipline this buys is the same one that makes the rest of Sorti
trustworthy: because reducers are data, not code, they are **total**
(always terminate), **pure** (a function of state and arguments only), and
**deterministic** (replays and co-op seats always converge). A hostile or
buggy panel can waste its own state; it cannot escape, loop forever, or
disagree with a teammate's screen.

## Randomness without breaking replay

A deterministic reducer can't call `random()` — but games need shuffles and
rolls. The trick: the *authority* (the session, or the co-op room) stamps a
seed into every tool call's arguments before the reducer runs, and the
stamped value is logged with the call. The reducer reads the seed as an
ordinary argument, so a replay recomputes byte-identically and every co-op
seat deals the same hand. Shuffling a deck is one op in the DSL; dealing is
a shuffle plus a slice.

This has a pleasant side effect on latency. Tools that *don't* read the
seed or the clock are **client-predicted**: the tap paints instantly from a
local speculative apply, and the authoritative result confirms (or
corrects) a moment later. Tools that read the seed always round-trip —
the client can't know what the authority will stamp. Well-forged panels
keep hot-path taps seed-free and isolate randomness in the few tools that
genuinely need it.

## Juice is data too

Motion and feedback follow the same rule as everything else: declared, not
scripted.

- **Timelines** name animation sequences over scene nodes.
- **Reactions** watch state paths — "when `hero.hp` decreases, play the
  shake timeline, fire the `hit.small` sound cue." The host diffs each
  state push and plays whatever matched. Reactions can scope per entity
  ("each monster, keyed by id") and can **spawn transients** — short-lived
  nodes like damage floats, bound to the change that fired them.

Reactions are presentation-only by construction: they cannot dispatch
actions or write state, so a panel plays identically with its reactions
stripped — they add feel, never behavior. And because prediction and
reactions compose, the shake lands on the *tap*, not on the round-trip.

## How a forge mission works

Forging runs as a specialist mission with its own verification discipline:

1. Scaffold from a recipe (counter, list, questboard, game-loop) or create
   bespoke.
2. Author state, tools, and scene; validate continuously — malformed specs
   and reducers are refused at authoring time with pointed errors.
3. Verify on three tiers: **invoke every minted tool** and read the state
   change (validation green is not proof); **playtest** the state graph for
   soft-locks and dead ends; **look at screenshots** of every distinct
   screen.
4. Checkpoint before risky rework; roll back rather than ship a broken
   panel; export a durable worker artifact once the panel is coherent.

A forged panel can also be pushed to Cloudflare as a standalone MCP server —
at which point anyone (or anyone's agent) can connect to it by URL.

## Extending apps you didn't build

A forge mission can extend an existing app — say, modding STS2 — but it
never reads the target's source. The target publishes its own contract over
MCP: schema resources for moddable content, validate tools as the oracle,
and an extension skill naming which state paths and events are promised.
Anything not published is internal shape that may change without notice.
When a mission needs something the contract doesn't cover, the finding is
"the contract is missing a section" — the fix lands in the target app, not
in a workaround. This is deliberate: it keeps every extension honest against
the running version, and it works uniformly for any MCP URL, including apps
whose source you could never see.

## Where to go next

- [Forge reference](/docs/sorti/forge-reference/) — the exact op and
  expression vocabulary, generated from the canonical in-product skill.
- [Developing Sorti Panels](/docs/sorti/developing-sorti-panels/) — the
  first-party panel workflow (when you're writing code, not forging).
- [Panels and MCP](/docs/sorti/panels-and-mcp/) — how panels ride MCP
  resources and tools underneath.
