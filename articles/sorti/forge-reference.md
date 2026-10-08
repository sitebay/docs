---
title: "Forge Reference"
description: "The exact forge vocabulary — primitives, reducer ops, expressions, juice, budgets. Generated from the canonical in-product authoring skill."
tags: ["sorti", "forge", "mcp", "reference", "reducers"]
published: 2026-07-07
lastmod: 2026-07-07
weight: 46
---

# Forge Reference

<!-- GENERATED FILE — do not edit. Source of truth:
     sorti/apps/sorti-agent/skills/forge-authoring/SKILL.md
     Regenerate with: node ci/scripts/sync-forge-reference.mjs -->

This is the exact vocabulary the forge's own authoring specialist works
from — the same document, republished. Concepts and background live in
[Forging Panels](/docs/sorti/forging-panels/). Sections addressed to
the authoring agent (mission tools, checkpoints, verification) describe
in-product behavior you'll see forge missions follow.

## The primitive scene language

Legal primitive `type` values (there are exactly eight):
`view`, `text`, `list`, `pressable`, `image`, `svg`, `webSurface`, `model`.

The spec wrapper: `{ "version": "0.0.5", "root": { <primitive tree> } }` —
`version` at top level, one `root` node wrapping the tree. Optional spec-level
fields: `timelines`, `reactions`, `values` (all 0.0.5 — see Juice below).

- `view` — container (flex layout via style props). There is no
  vstack/hstack/row/column type; direction is a style on `view`.
- `text` — all copy. `list` — collections. `pressable` — anything clickable
  (bind to a tool call). `image`/`svg` — art. `webSurface` — the frozen HTML
  escape hatch: for an embed or a doc, NEVER the whole panel.
- Bindings pull from panel state; the scene renders from state and nothing
  else (doctrine law 1).

`forge.create` specifics: slug is lowercase/digits/hyphens. State binding is
the OBJECT form `{"$bind":"path","fallback":...}` — never a mustache string.
`list` binds `props.items = {"$bind":"arrPath"}` with row scope
`{"$bind":"$item.field"}` and `{"$bind":"$index"}`. `pressable` fires a
tool via `props.intent = {"type":"<tool.name>","payload":{...}}`. Tool
names are `<base>.<verb>` (model tool) or `<base>_panel.<verb>` (panel
tool); max 12 tools per forged panel. `forge.create` refuses a duplicate
slug — rework with `forge.set_spec`/`forge.add_tool`, or `forge.delete`
first.

## reducerSource — the ops-JSON language

`reducerSource` is a JSON **string**: `JSON.stringify({"ops": [...]})`.
Never JS code, never a bare ops array, never an unstringified object.
A panel can pass `forge.validate` AND `forge.playtest` with broken
reducerSources — the only true oracle is INVOKING the minted tool.

Ops (exact shapes): `{"set":"path","value":V}`, `{"inc"|"dec":"path","by":N}`,
`{"toggle":"path"}`, `{"push":"arr","value":V}`, `{"removeAt":"arr","index":N}`,
`{"removeWhere":"arr","where":COND}`,
`{"updateWhere":"arr","where":COND,"field":"f","value":V}` (omit `field` to
replace the whole element), `{"merge":"objPath","value":{...}}`,
`{"shuffle":"arr","seed":{"arg":"_seed"}}` (see Seeded randomness).
Ops run unconditionally in sequence against the EVOLVING state (op 2 sees
op 1's writes) — there is no branching between ops; put conditionality in
`if` expressions inside values.

Expressions (exact key names — earlier guesses with "key"/"start"/"end"
are WRONG): `{"arg":"name"}`, `{"get":"statePath"}`, `{"item":"field"}`
(inside where/to), `{"coalesce":[x,fallback]}`, `{"eq":[a,b]}`,
`{"obj":{k:expr}}`, `+ - * / %` (`%` is real modulo — no hand-rolled
`floor(a/m)` recipe needed), `if`, `and`, `or`, `not`, `lt/gt/lte/gte`,
`min`, `max`, `clamp`, `concat`, `len`, `{"map":arr,"to":expr}`,
`{"filter":arr,"where":cond}`, `{"sortBy":arr,"by":keyExpr,"desc":bool}`,
`{"slice":arr,"from":N,"to":N}`, `{"sum":arr,"of":expr}`,
`{"avg":arr,"of":expr}`, `{"count":arr,"where":cond}`, `{"join":arr,"with":s}`,
`{"floor":e}`, `{"round":e,"to":places}`, `{"ceil":e}`, `{"abs":e}`,
`{"range":[from,to]}` builds the integer array `[from..to)` (so
`{"map":{"range":[0,52]},"to":...}` generates a deck). The derived-values
vocabulary and the reducer vocabulary are the same language.

No loops and no functions: rich literal collections (per-item names/suits
beyond what a `range`+`map` can construct) must be hand-authored JSON,
written once and reused. No adjacent-pair comparison either — sequence-based
rules (straights) are impractical; scope game rules to count/filter shapes.
No string hashing (no xor) → numeric seeds only.

## Seeded randomness

The DSL has no ambient RNG — but the **authority stamps `_seed` (float in
[0,1)) and `_now` (epoch ms) into every tool call's args** before the reducer
runs, and the stamped values are logged, so replays recompute
byte-identically. Read them: `{"arg": "_seed"}`, `{"arg": "_now"}`.

Shuffle is a first-class op: `{"shuffle":"deck","seed":{"arg":"_seed"}}`
runs a Fisher–Yates over a splitmix64 stream expanded from the seed —
uniform, replay-exact, coop-convergent. Deal = `shuffle` then `slice`.

Prediction consequence: reducer-backed tools that do NOT read `_seed`/`_now`
are **client-predicted** (the tap paints instantly; the authority confirms).
A tool that reads either always round-trips. So keep hot-path taps
(check-off, play-card, increment) seed-free, and isolate randomness into the
few tools that genuinely need it (deal, roll).

## Juice — timelines, reactions, transient spawns (0.0.5)

Motion and feedback are DATA on the spec, evaluated host-side. This is what
separates a forged panel from a scaffold; use it.

- `timelines`: named animation sequences targeting node `id`s —
  `{"shake-hero": {"steps": [{"node":"hero","property":"translateX",
  "from":0,"to":6,"durationMs":80}]}}`. Properties: opacity/scale/
  translateX/translateY/rotate.
- `reactions`: "when this state path changes this way, play juice" —
  `{"hero-hurt": {"when":{"path":"hero.hp","on":"decrease"},
  "play":["shake-hero"], "cue":"hit.small", "throttleMs":100}}`.
  `on` ∈ decrease/increase/change/truthy/falsy/grow/shrink (grow/shrink =
  array length). Mount never fires. Playing an undeclared timeline id is
  refused at parse. Per-entity scoping:
  `"when":{"each":"monsters","key":"id","path":"hp","on":"decrease"}` with
  `{key}` substituted into play ids (`"shake-{key}"`).
- `cue`: a sound name from the registry (`hit.small`, `hit.big`, `gain`, …)
  fired with the plays. Unknown names no-op.
- `spawn` (transient nodes — damage floats, "+1" pops, fly-outs):
  `{"spawn": {"node":{"type":"text","props":{"value":{"$bind":"$delta"}}},
  "at":"hero","ttlMs":900}}` on a reaction. The node is a normal primitive
  template; `$bind` may name `$delta`/`$prev`/`$next` (resolved from the
  diff). It anchors to the live node id `at` (`{key}` works when scoped) and
  despawns at `ttlMs` (max 10000). Presentation-only is enforced: no
  intent/dropIntent/input anywhere in a spawned template. Give the template
  an `animation` prop for a rise-and-fade — it plays on mount for free.
  A spawn-only reaction needs no `play`.

Reactions are presentation-only by construction — they can never dispatch or
mutate, so use them freely; `playtest` output is identical with reactions
stripped.

## Derived values & legal actions (two different tools)

- `forge.set_derived` — named pure expressions materialized into
  `state.derived.<name>` on every state write; the view binds them like raw
  state (`{"$bind":"derived.progress"}`). Use for every projection (sums,
  percents, top-N, labels) instead of reducer bookkeeping.
- `forge.set_legal_actions` — one expression producing the CURRENT legal
  moves as `{tool,label,args}` descriptors. Every non-terminal state must
  admit ≥1 action — playtest flags soft-locks.

## Apps vs games — same language, different lean

The kernel is identical (state + reducer tools + bound scene). What differs
is which parts carry the weight:

- **Apps** (trackers, boards, planners): derived values are the senses;
  `x-input` for text entry (declare `"experimentalApis":["x-input"]` at the
  spec top level or the prop is refused); keep every tool seed-free so
  prediction makes
  taps instant; reactions stay subtle (a check-off pop via `spawn`, a badge
  `increase` pulse). Compose with first-party surfaces instead of rebuilding
  them — panels drag onto / accept drops from the canvas and notebooks via
  `dragData`/`dropIntent` with `sorti://` payloads. Golden reference:
  the questboard recipe.
- **Games**: `range`+`shuffle`+`slice` for decks; `set_legal_actions` as the
  move list; reactions + spawns + cues are the hit feedback — a game panel
  without a `decrease` reaction on hp is unfinished. Golden reference: the
  game-loop recipe.

## Extending an existing app (mods, extension panels)

The target's MCP surface is the ONLY source of truth — you can never read
its source, and a field you observed in one state dump is not a promise.

1. Read its resources first: look for an extension/authoring skill resource
   (e.g. `sts2://extension-skill`) and schema resources (e.g.
   `sts2://mod-pack-schema`) in `resources/list`, and read the manifest's
   `modules[].tools` for the capability surface.
2. Use the target's validate tools as the oracle (dry-run before apply) —
   never infer contract from `get_state`-style dumps; those show incidental
   shape, not stable paths.
3. Bind only to paths/events the extension skill lists as contract. If the
   published contract is missing what you need, report the gap — do not
   build on unpromised shape. Vehicle: `propose_plan_amendment`
   (kind=capability) when the mission cannot proceed without it;
   `report_to_officer` (kind=blocker) when you can conservatively proceed
   on the parts the contract does cover. The gap itself IS a valid mission
   finding — the fix belongs in the target app's published contract, not in
   a workaround.

## Tool surface & invocation

- Minted tools surface as `forged_<slug>__<tool_dots_to_underscores>`
  (e.g. `forged_balatro-mini__table_play_hand`); unlock via tool_search
  `select:` if deferred.
- Deep authoring tools (`forge.add_tool`, `forge.set_spec`,
  `forge.set_derived`, `forge.set_legal_actions`) live on the
  forge-specialist seat; the officer keeps only `forge.scaffold` /
  `forge.list` / `forge.read_skill`.
- `forge.checkpoint` after every meaningful step — worker restarts revert
  uncheckpointed forge state. `forge.rollback` is the in-session revert;
  `forge.export_worker` is the durable off-Sorti backstop.

## Verification tiers (do all three)

1. **Reducer truth**: invoke every minted tool at least once and read the
   state change. validate/playtest green ≠ working reducers.
2. **Structural taste**: `forge.playtest` — require `statesExplored > 0`;
   a "clean — 0 states, 0 moves" report explored nothing and proves nothing.
   Heed taste findings (branching, dead ends, fizzles) even though they
   don't gate. An `unbound-path` finding means a `$bind` or reaction path
   resolves in NO reachable state — reducers pass, screen is blank; it is
   almost always a typo'd path. Fix these before the visual tier.
3. **Visual taste**: play to each distinct screen with seeded actions,
   `workspace_show_panel` + `workspace_screenshot` at each, and LOOK at
   every capture: state rendered, readable, no overflow, not ugly. A panel
   others will live in must look forged, not scaffolded.

## DSL semantics that will burn you

- **`concat` is STRING join, not array concatenation.** There is no array
  concat; compose arrays with `push` ops or regenerate in place.
- **No per-tool update or delete**: `forge.add_tool` refuses a duplicate
  name and no update verb exists. To fix one tool, mint the corrected
  reducer under a NEW name and repoint the spec's intents at it (12-tool
  budget permitting); full `forge.delete` + recreate is the last resort,
  not the first move. Test each op shape in a throwaway probe tool before
  wiring real ones.
- **Op budget: 64 ops per reducer.** A 52-item literal built with `push`
  ops nearly consumes it — bundle sibling scalar writes into ONE `merge`
  (or generate with `range`+`map` in a single `set`).
- **Deep hand-chained if/eq trees have passed add-time validation and then
  thrown at INVOKE.** Never hand-chain index translation; use an eq-based
  `where` match (`{"updateWhere":"arr","where":{"eq":[{"item":"id"},
  {"arg":"id"}]}}`) whenever the match is expressible.
- **Forge state does NOT survive worker restarts — checkpoints included.**
  Call `forge.export_worker` as soon as the panel is coherent and treat the
  exported artifact as the source of truth; rebuild from it, not from
  memory of the live panel.
- Dotted paths work for `get`/`set`/`inc`/`merge` (e.g. `"run.score"`),
  but merge-to-root fails — merge into a named object path.
- **Author large reducer programs with a generator script** (node -e /
  .mjs emitting the ops-JSON), never by hand — then paste the output into
  `forge.add_tool`. Hand-written 60-op JSON is where typos live.

## Known traps

- `forge.scaffold` recipes: counter, list, game-loop, game-loop-packs,
  game-loop-coop, questboard. No card-game recipe — bespoke path for those.
- FileRead/FileWrite param is `path`. Shell heredoc writes are refused —
  use FileWrite.
- If a tool errors `reducerSource must be valid JSON` you stored code —
  rewrite as ops-JSON; do not retry the call.
