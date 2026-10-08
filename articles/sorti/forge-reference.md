---
title: Forge reference
description: Canonical Forge authoring reference for primitive scenes, source changes, reducers, and verification.
tags:
- sorti
- forge
- mcp
- reference
- reducers
published: 2026-07-07
lastmod: 2026-10-07
weight: 46
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- forge reference
- sitebay documentation
slug: forge-reference
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-forge
modified: 2026-10-07
---

This reference is generated from the canonical Forge authoring skill. Use the current session's schemas when making tool calls. Read [Create a panel with Forge](/docs/sorti/forging-panels/) for the workflow.

<!-- GENERATED: sorti/apps/sorti-agent/skills/forge-authoring/SKILL.md -->

## Start at the prepared workbench

Read the supplied `forge.guide` workbench before making an app. Select an existing
app from its inventory. A new app never starts from a blank panel, even one asked
for "from scratch": the guide's remix call (`forge.browse {want}`) ranks the closest
recipe or community app, so remix that and tailor it. Use the returned
`runtime.primitivesVersion`, exact `appTools` names, virtual file map, and step
schemas; the narrative examples below are not a replacement for the live
contract. A task must not require tool search or private host source discovery.

Follow `guidance.next.call` only when its required inputs are present. On a
failed playtest, the guide supplies the counterexample's action and arguments,
a ready `forge.read` for the implicated file, an edit template, and the exact
rerun. Read first. Repair the declaration or the offered control; never remove
an invariant just to silence a failed counterexample. `counterexample.args`
are simulated test inputs, not an instruction to replay them against live data.

The sampler resolves row-bound inputs and buttons at each reached state,
including nested `$item` / `$index` scopes and fresh derived values. Empty lists
have no row controls. Only offer a bulk operation while it has eligible targets.
The walk is bounded: inspect skipped/inactive/budget coverage and exercise host
observations separately. It does not fabricate external events or new data to
make an empty application's coverage look complete.

`forge.validate` and the guide use the same runtime verdict. `passed` is current
in-session execution evidence; `stale` means its checked inputs changed;
`recorded` denotes historical journal evidence, not a live certificate; `not-run`
means absent evidence. A passing reducer walk still hands off to the existing
live renderer and mission-closure gates. The guide cannot mark the mission done.

## Reviewed source changes

For an existing runtime-definition app, read `forge.read {slug}` before editing.
Keep its complete `sourceRequest` basis, add a unique operation `id`, and send it
with the actual source-writing tool. A matching `oldText` or file hash does not
replace the app's target, lifetime and whole-definition revision. Do not refresh
the basis when submitting a human's already reviewed draft: stale work requires
an explicit reread and reconsideration, not a silent overwrite.

Use the guide's `sourceOperations.change` for related view/reducer changes. It
routes bounded operations through the existing `forge.source_change` command,
validates the complete candidate and retains one original receipt. Domain saves,
data migrations, provider writes and publication are different owners; they are
not made atomic by including their names in a source group. Creating a new app
uses explicit create-if-absent and never replaces an existing app of that slug.

On an unknown result, retain the exact action and original arguments. The guide's
`sourceOperations.receipt` uses the read-only `forge.read` sourceReceipt route.
Read that original outcome; do not call the mutation again, substitute a state
read or assume that a missing receipt proves failure. The receipt labels actual
atomic persistence versus volatile session acceptance. Neither is a publication
or running-build acknowledgement. Unresolved work blocks another source change.

A bound source-code repository keeps its declared workspace/candidate workflow.
A code-app brief is not execution, and the runtime-definition source transaction
does not claim arbitrary multi-file or cross-repository atomicity. The narrative
examples below omit invocation envelopes for readability; live generated schemas
and review templates are the required call contract.

## The primitive scene language

Legal primitive `type` values (there are exactly eight):
`view`, `text`, `list`, `pressable`, `image`, `svg`, `webSurface`, `model`.

The spec wrapper: `{ "version": "0.0.10", "root": { <primitive tree> } }` —
`version` at top level, one `root` node wrapping the tree. **Declare the
current version (`0.0.10`), not an old one**: the version gates which fields
the parser will even admit, so writing `0.0.5` silently locks you out of
everything shipped since (`cueManifest` needs 0.0.8, `pointerFollow` 0.0.9,
sprite `frames` 0.0.10). Optional spec-level fields: `timelines`, `reactions`,
`values` (0.0.5 — see Juice below), `cueManifest` (0.0.8), `experimentalApis`.

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
tool); max 96 tools per forged app. `forge.create` refuses a duplicate
slug — rework with `forge.set_spec`/`forge.add_tool`, or `forge.delete`
first.

### Three lanes emit this vocabulary — you author ONE of them

`InstallGrantPanelKind` names three panel kinds, and the difference between
them is **where the constraint sits**, not which renderer runs. There is only
one renderer; `forge.export_gadget` literally ships it inside the emitted
`client.js`.

| lane | constrains | you get | you give up |
|---|---|---|---|
| `primitive-spec` | the INPUT — closed-vocabulary JSON | validation before anything runs, native render, Gadget export, per-panel primitive grants | computation and local state (JSON has none) |
| `primitive-ops` | the OUTPUT — real React, but it may only EMIT the eight primitives | real code, local `useState`, native render, the same validated primitive tree | **Gadget export** (no static spec to emit), and **the forge cannot author it** |
| `html` | nothing | anything JS can do, immediately | native render, pre-execution validation, Gadget export, every enforcement surface built on a closed vocabulary |

**`primitive-ops` is the answer to "can I just write React?" — and it is not
yours to write.** It is how an EXTERNAL MCP app ships a panel: it bundles its
own React, a react-reconciler host-config serializes its commits into
`create`/`update`/`appendChild` ops, and the host applies them to a retained
tree that renders through the same renderers a static spec renders through.
Events use the same `props.intent` channel an L2 spec uses (function props
become declared intents) — there is no second event system. But there is no
`forge.set_ops`: the forge's authoring surface is `set_spec` / `set_html`, one
JSON write each, and producing a React bundle mid-session is not a thing this
mission can do. Two more costs, said plainly because nobody wrote them down:
ops panels **cannot** `export_gadget`, and on NATIVE a non-first-party ops
bundle renders **nothing** until a pinned InstallGrant lands (the gate is a
synchronous read of an async grant and fails closed on first arrival).

**So `primitive-spec` is your default on the merits**, not by inertia: it is
the only exportable lane, and one JSON write beats a bundle build inside a
session. Do not ask for ops; if a panel truly needs it, that is a platform
finding to report, not a lane to reach for.

**`forge.set_html` is the frozen escape hatch.** Legacy HTML recipe scaffolds
are RETIRED — `forge.scaffold` refuses `params.legacyHtml` — and persisted HTML
panels keep rendering. **Know what the escape costs before taking it:** an
HTML-body panel does not render on native, and `forge.export_gadget` refuses it
outright ("a Gadget's client renders the primitive spec with the same renderer
Sorti uses"), so the choice forecloses mobile and cross-platform export for that
panel — permanently, for anyone who forks it. So the escape is not free-form:
`forge.set_html` REQUIRES `reason`, from a closed enum — `custom-drawing`,
`animation-timeline`, `third-party-renderer`, `per-frame-interaction`, or
`other` (which also requires `reasonNote` naming the missing capability
mechanically: what it draws, animates, or listens to per frame). If none of
the four fits, that is the signal the eight primitives CAN express the panel
— go back to `forge.set_spec`. The reason persists with the scene, lands in
the design journal as an `escape` entry, and is reported by
`forge_panel.read_state` under `escapes`; that census is what new primitives
get ranked against, so a recurring `other` is a finding, not a shrug.

### Many scenes, one authority

A forged app may mount several primitive scenes over one state and reducer
belt. The primary scene is the app the remix made (`forge.scaffold`, `forge.import`
or `forge.fork`); add views with
`forge.add_scene {appSlug, slug, title, role, primitiveSpec}`. The primary URI
is `ui://sorti.forged/<appSlug>`; additional scenes are
`ui://sorti.forged/<appSlug>/<sceneSlug>`. Target a secondary scene in
`forge.set_spec`, `forge.set_html`, `forge.set_role`, or `forge.open` with
`sceneSlug`.

Scenes own only presentation: title, role, and primitive spec. State, tools,
packs, hooks, derived values, legal actions, invariants, fixtures, journal,
and the coop room belong to the app. Never copy state between scenes or emit
events to keep them synchronized. A reducer commit is authoritative once and
the forge reprojects every mounted scene from it. Golden reference: scaffold
`questboard`, whose board and focus inspector complete the same quests.

### Scene fragments - author one visual law

Repeated visual structures belong in spec-level fragments, not pasted trees.
Declare `fragments: {name: {params:[...], node:{...}}}`, place exact
`{"$param":"name"}` placeholders inside the template, then render it with
`{"$fragment":"name","args":{"name":VALUE}}` anywhere a node belongs.
A card shown in hand, shop, and deck view should be one fragment referenced
three times, so spacing, token use, accessibility, and juice cannot drift.

Fragments may compose other fragments when the graph is acyclic. Every param
is required, undeclared args are refused, names are bounded, recursion is
refused, and the expanded tree re-spends the ordinary node/depth budgets.
Parsing erases `fragments`, `$fragment`, and `$param`; persisted definitions,
hosts, and exports receive only ordinary primitive nodes with zero runtime
cost. Caps: 32 fragments and 16 params each.

## reducerSource — the ops-JSON language

`reducerSource` is a JSON **string**: `JSON.stringify({"ops": [...]})`.
Never JS code, never a bare ops array, never an unstringified object.
A panel can pass `forge.validate` AND `forge.playtest` with broken
reducerSources — the only true oracle is INVOKING the minted tool.

Ops (exact shapes): `{"set":"path","value":V}`, `{"unset":"path"}`,
`{"inc"|"dec":"path","by":N}`,
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
(inside where/to), `{"pack":"cards"}` (active immutable content rows),
`{"rand":{"stream":"shop"}}` (authority-seeded named RNG stream),
`{"coalesce":[x,fallback]}`, `{"eq":[a,b]}`,
`{"obj":{k:expr}}`, `+ - * / %` (`%` is real modulo — no hand-rolled
`floor(a/m)` recipe needed), `if`, `and`, `or`, `not`, `lt/gt/lte/gte`,
`min`, `max`, `clamp`, `concat`, `len`, `{"trim":e}` (strip surrounding
whitespace — the empty-input guard is `{"eq":[{"trim":<text>},""]}`),
`{"map":arr,"to":expr}`,
`{"filter":arr,"where":cond}`, `{"sortBy":arr,"by":keyExpr,"desc":bool}`,
`{"slice":arr,"from":N,"to":N}`, `{"sum":arr,"of":expr}`,
`{"avg":arr,"of":expr}`, `{"count":arr,"where":cond}`, `{"join":arr,"with":s}`,
`{"floor":e}`, `{"round":e,"to":places}`, `{"ceil":e}`, `{"abs":e}`,
`{"range":[from,to]}` builds the integer array `[from..to)` (so
`{"map":{"range":[0,52]},"to":...}` generates a deck — and the bounds are
EXPRESSIONS, not literals, so `{"range":[0,{"get":"hero.energy"}]}` is legal;
see "Two idioms" below for why that matters),
`{"concatArrs":[a,b,...]}` — ARRAY concatenation (`concat` is string join).
Each part is an expression returning an array; a LITERAL JSON array part is
taken verbatim, so a static entry merges into a derived list without
ceremony: `{"concatArrs":[<derived actions>, [{"tool":"grid.reset"}]]}`.
The derived-values vocabulary and the reducer vocabulary are the same
language. Any single expression (legalActions, derived) may also be wrapped
`{"defs":{"name":EXPR},"in":EXPR}` and reference `{"use":"name"}` — name a
repeated sub-expression once instead of pasting it.

## The two tiers — default small, declare ambition

DEFAULT TO THE BASE TIER: plain `{"ops":[...]}`, 64 ops. Most panels —
trackers, boards, planners, counters — never need more, and smaller programs
are easier to validate, predict, and keep instant. A program that declares
**`"v": 2`** opts into the AMBITIOUS tier:

- `{"forEach":"arrPath","ops":[...]}` — run the inner ops once per element
  (bound as `item`). This is the BULK-OPERATION op: tally/accumulate across
  rows into other state, write per-row log entries, build an id→value index
  via keyed paths (`{"set":["byId",{"item":"id"}],"value":...}`). It iterates
  a SNAPSHOT (self-appends can't extend the loop), refuses nesting, and is
  metered (10k total iterations/run). NOT for per-row field updates — plain
  `updateWhere` already does those, and `item` inside a nested
  updateWhere/removeWhere REBINDS to the inner element (innermost wins).
- `"defs"` on the program — named sub-expressions used as `{"use":"name"}`;
  a guard or business rule written once and referenced everywhere (recursion
  refused; expanded before evaluation, so zero runtime cost).
- a 256-op flattened budget (forEach inner ops count toward it).

Still true in BOTH tiers: rich literal collections must be hand-authored
JSON; sequence rules (straights, adjacency) stay impractical — scope rules
to count/filter shapes; no string hashing → numeric seeds only.

## Two idioms nothing else will teach you

Both hinge on one fact: **`range` bounds are evaluated expressions**, so an
array's LENGTH can come from run-time state.

**1. The fold over a run-time count** — "do this X times, where X is a state
value". Do NOT collapse the repetition into a multiply: rounding does not
distribute over a run-time scale (`floor(n·x) ≠ n·floor(x)`). Map over a
range of length X and put the rounding INSIDE the per-unit expression:

```json
{"sum":{"map":{"range":[0,{"get":"hero.energy"}]},
        "to":{"floor":{"/":[{"*":[{"+":[{"get":"hero.str"},{"get":"card.base"}]},3]},2]}}}}
```

On `{hero:{str:0,energy:6},card:{base:5}}` this deals **42** — six per-hit
`floor(5 × 1.5) = 7`s, the faithful answer. The collapsed
`floor((base+str) × energy × 1.5)` deals **45**: silently ~7% off whenever a
multiplier is active, invisible in casual play, and exactly what
`forge.playtest` flags as `repetition-collapse`. Works in a plain v1 program;
in the function dialect spell it `dsl.sum(dsl.range(0, state.n), i => …)`.

**2. The conditional-op gate** — run an op 0-or-1 times on a condition. Ops
without an identity form (`shuffle` above all) cannot be guarded by `if`, but
`forEach` over an EMPTY array runs zero times. Stage a 0-or-1-length range
into a scratch path, loop it, drop it (v2):

```json
{"v":2,"ops":[
  {"set":"_g","value":{"range":[0,{"if":[{"lte":[{"count":{"get":"draw"}},0]},1,0]}]}},
  {"forEach":"_g","ops":[
    {"set":"draw","value":{"concatArrs":[{"get":"draw"},{"get":"discard"}]}},
    {"set":"discard","value":{"range":[0,0]}},
    {"shuffle":"draw","seed":{"arg":"_seed"}}]},
  {"unset":"_g"}]}
```

Empty draw pile → the discard is folded in and shuffled once; non-empty →
`draw` and `discard` are byte-identical, order preserved. Never "shuffle
unconditionally and branch on the result" — that re-randomizes the draw
order every single turn.

## Seeded randomness

The DSL has no ambient RNG — but the **authority stamps `_seed` (float in
[0,1)), `_now` (epoch ms), and `_packVersions` into every tool call's args**
before the reducer runs, and the stamped values are logged, so replays
recompute byte-identically. Read time/randomness with `{"arg": "_seed"}` and
`{"arg": "_now"}`; pack resolution consumes `_packVersions` structurally.

Shuffle is a first-class op: `{"shuffle":"deck","seed":{"arg":"_seed"}}`
runs a Fisher–Yates over a splitmix64 stream expanded from the seed —
uniform, replay-exact, coop-convergent. Deal = `shuffle` then `slice`.

For independent random concerns, use a named stream expression:
`{"rand":{"stream":"shop"}}`. The value is splitmix64-derived from `_seed`
plus the validated stream name. Adding or reordering a `combat` stream cannot
perturb `shop`, so content growth does not rewrite unrelated replay outcomes.
Stream names match `[A-Za-z0-9][A-Za-z0-9._-]{0,63}`. The atom refuses without
an authority-stamped `_seed` and, like any seed read, disables client
prediction for that tool.

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

### Already shipped — do NOT hand-roll these

The flagship sample hand-built all three of these next to the shipped,
cross-platform version, because nothing pointed at them. The gap between what
the vocabulary can express and what an author BELIEVES it can express is wider
than the gap the vocabulary itself has. Before you write imperative code for
any of these, use the declared form:

- **Sound is a NAME, never a waveform.** `cue` binds a semantic name from the
  registry — `ui.confirm`, `ui.cancel`, `ui.select`, `ui.error`, `ui.open`,
  `ui.close`, `gain`, `loss`, `reward`, `hit.small`, `hit.big`, `hit.blocked`,
  `block`, `heal`, `turn.start`, `turn.end`, `victory`, `defeat`, `tick`,
  `card.draw`, `card.play`, `card.discard`, `card.exhaust`, `card.shuffle`,
  `attack.swing`, `energy.spend`, `energy.gain`, `potion.use`, `relic.trigger`,
  `orb.channel`, `orb.evoke`. The HOST owns the voicing (web via the dom
  surface's cue channel, native via its own audio path), so one name is voiced
  on both platforms and can be re-voiced by a theme pack without touching your
  panel. Unknown names are a forge-time warning and a runtime no-op, never a
  kill. Cues ride the channels motion already uses: `cue` on a reaction fires
  with its plays, `cue` on a timeline step fires at that step's offset, beside
  `haptic`. **Never synthesize audio yourself** — a panel that builds an
  `AudioContext` oscillator has re-implemented, worse and web-only, something
  one string already does.
  To re-voice or extend the vocabulary, declare a spec-level `cueManifest`
  (0.0.8, ≤128 entries, no bytes on the wire):
  `{"version":1,"cues":{"crit":{"synth":"hit.big","gainDb":3,"haptic":"impact-heavy"}}}`
  — an entry may carry a host-library `sample`, a registry `synth` fallback, a
  `haptic` fired with the audio, `gainDb`, and `intensity`. Resolution is
  sample → synth → registry voice → silence, so a manifest never breaks a cue.
- **`pointerFollow` (0.0.9) is declarative drag-tracking.** On a `view` or
  `image`: `"pointerFollow": {"source":"<node id with a pan gesture>", "t":0.5,
  "bulge":0.3, "orient":true}` — the node rides the curve from the drag
  source's anchor to the live pointer (`t` = 0 at the anchor, 1 at the
  pointer), `bulge` arcs it, `orient` rotates it along the tangent. That is a
  targeting arrow, a trailing comet, a drag ribbon — laid out by the host every
  frame on both platforms. Do not build one out of per-frame state pushes;
  ≤32 followers per panel.
- **`x-input` is the form field.** Declare `"experimentalApis":["x-input"]` at
  the spec top level or the prop is refused, then put it on the node:
  `"x-input": {"kind":"text", "value":{"$bind":"draft"},
  "changeIntent":{"type":"notes_panel.save"}, "placeholder":"…",
  "maxLength":512}`. `kind` ∈ `text`/`number`/`select`/`toggle`
  (`select` takes `options: [{label, value}]`). It commits through the SAME
  intent channel every press uses, with the new value merged into the payload
  as `value`. **Keystrokes are host-side and ephemeral**: text/number dispatch
  ONCE on commit (blur/Enter/teardown), never per keystroke, so state stays the
  only truth and coop never broadcasts half-typed words; `toggle`/`select` are
  discrete and dispatch per choice. Do not model a keyboard, and do not reach
  for `set_html` because "the primitives have no input" — they do.

## QoL laws — telegraph, always-on text, eased layout

Three divine-QoL laws from the flagship combat rework (study:
`the-telegraph.md`). A game panel that violates them is unfinished:

- **Rules text is never gated.** Whatever an action does is readable on its
  face at all times; selection may ADD a larger readout (description +
  keyword tips as a pointer-transparent overlay with a mount rise/fade), but
  hover/hold must never be the only way to learn a rule.
- **Deterministic futures are shown, not hidden.** If opponent behavior is
  reducer-driven, the next N moves are computable — peek by pure simulation
  (chain pass-turns on a scratch state, read the selected moves; the reducer
  IS the oracle, exact by construction) and surface the result on the VM for
  a long-press forecast. Never re-implement opponent logic panel-side.
- **Probe before committing.** `forge.simulate {slug,tool,args}` runs the exact
  reducer, pinned packs, hook cascade, derived values, and invariants against a
  scratch state. It returns stamped replay args, changed paths, the candidate,
  and `wouldCommit`, while state and stateRev remain untouched. It accepts only
  reducer-backed tools; an agent/intent outcome cannot be simulated honestly.
- **Things that rearrange, ease.** Put `transitionMs` (number, style hint)
  on nodes whose left/top/size changes between commits — a hand re-fanning,
  a list making room — so they tween instead of snapping. Hosts without a
  mapping strip it; never depend on it semantically. For play beats: pop →
  dwell (~240ms, long enough to register) → fly, with distinct exits per
  outcome so rules are legible from motion.
- **Things that leave, exit.** Pair mount `animation` with `exitAnimation`
  (0.0.7, same spec shape + a node `id`): the host retains the removed node
  pointer-inert while the exit tween plays, so dismissals never snap away.
  Presentation-only — state moved on the removing commit.
- **Settle, never bounce.** Entrance/exit easings never overshoot (no bezier
  y > 1) — use ease-out curves like `[0.22, 1, 0.36, 1]`. Overshoot is
  reserved for hit-impact recovery physics. Press feedback (0.97 scale dip +
  selection haptic) is a platform default on every enabled pressable — do
  not re-implement it.

These laws are also machine-checked: `playtest` emits taste advisories
(`feel-silent`, `feel-snap`, `feel-bounce`, `feel-no-exit`) when a spec
violates them. Taste warns, correctness fails — but a finding means the
panel is not yet up to standard.

## Theme tokens — never hardcode a color

Colors bind THEME TOKENS, not hex literals:
`{"$bind":"theme.<token>","fallback":"<dark-variant value>"}`. The host
resolves the token name against its live registry at render time, so the
panel re-themes on light/dark/high-contrast flips for free — the fallback is
only the first-paint value. A literal hex on a themable prop is flagged by
the binding lint; a panel that ships hardcoded colors is dark-frozen and
looks broken the moment the user flips theme.

<!-- forge-color-tokens:start -->
Registered token names: `accent`, `accentBorder`, `accentHover`, `accentSurface`, `altBackground`, `attentionForeground`, `background`, `border`, `descriptionForeground`, `dimForeground`, `elevatedBackground`, `errorForeground`, `focusBorder`, `foreground`, `forge.amber`, `forge.amberBorder`, `forge.amberSurface`, `forge.chip`, `forge.focusRing`, `forge.ground`, `forge.hairline`, `forge.hairlineSoft`, `forge.hoverSurface`, `forge.ink`, `forge.inkEyebrow`, `forge.inkOnAccent`, `forge.inkRing`, `forge.inkSecondary`, `forge.live`, `forge.mint`, `forge.mintBorder`, `forge.mintSoft`, `forge.mintSurface`, `forge.panel`, `forge.panelDeep`, `forge.scrim`, `forge.veil`, `forge.wire`, `forge.wireFaint`, `forge.wireStrong`, `forgeChip`, `forgeGround`, `forgeHairline`, `forgeHairlineSoft`, `forgeInk`, `forgeInkQuiet`, `forgeInkSecondary`, `forgeMint`, `forgeMintSoft`, `forgePanel`, `forgePanelDeep`, `list.hoverBackground`, `overlayScrim`, `panel.background`, `panel.border`, `panelBackground`, `pill.background`, `pill.border`, `pill.foreground`, `pill.mutedForeground`, `secondaryForeground`, `subtleBorder`, `successForeground`, `warningForeground`.
<!-- forge-color-tokens:end -->

The list is generated from the same host registry as export colors. Prefer the base semantic tokens unless your view needs a declared component token.

## Metrics — the scales, the floor, and the leading rule

Colour is bound; metrics are stamped as plain numbers. They must sit on the
registered scales, and two of them are not taste — they are legibility:

- **spacing** (padding/margin/gap): 2, 4, 6, 8, 12, 16, 24, 32, 48
- **fontSize**: 11, 12, 14, 16, 18, 24, 32, 48
- **borderRadius**: 4, 6, 8, 12, 16, 24, or 999 for a pill
- **elevation**: 0, 2, 6, 12 (the four presets; vertical shadow offset only)
- width/height/positions are layout, not rhythm — exempt

**THE FLOOR: nothing renders below 11px.** Not a badge, not a legend, not a
superscript. If it does not fit at 11, change the composition — drop a field,
wrap it, give the box more room — never the type size. Sub-floor type comes
back as a `look-typefloor` finding in the correctness band, not the taste band.

**THE LEADING RULE: `lineHeight` is a RATIO, never a px line box.** Write
`1.3`; never `22`. The hosts read `lineHeight <= 2` as a ratio of the node's
own `fontSize` and `> 2` as an absolute length. An absolute leading is
inherited verbatim by every descendant that overrides only `fontSize`, so a
scaling font inside a fixed line box overflows by construction — that is a real
shipped defect, not a hypothetical. Set `fontSize` and `lineHeight` together or
set neither. Defaults per size: 11→1.45, 12→1.33, 14→1.43, 16→1.5, 18→1.33,
24→1.33, 32→1.25, 48→1.08. Named overrides: tight 1.15, snug 1.3, relaxed 1.5.
Absolute leadings come back as `look-leading`.

Use these values on the FIRST `forge.set_spec` call — a round-trip to fix
warnings is a wasted turn. The full rule set is the **`frontend-design`**
skill (preloaded into forge missions); canonical values live in
`docs/design/DESIGN-SYSTEM-SPEC.md`.

`theme.` is a RESERVED state namespace (the host's voice): never write panel
state under it — a reducer setting `theme.*` or an initial state with a
top-level `theme` key draws a `theme-reserved` conformance issue and is
shadowed by the registry for any real token name. A panel wanting its own
palette binds its own state paths.

## Composition — a forged panel plugs into everything

A panel is not an island; the platform's whole surface is reachable, and a
bespoke panel that ignores it is underbuilt.

- **Intent tools have NO TOOLS. Do not use one to fetch anything.** A model
  tool's `intent` is fulfilled by a ONE-SHOT completion with no tool access
  at all (`createAgentFulfil` → `askOnce`, which passes `tools: noTools,
  maxTurns: 1`). It receives the intent text, the current state and the args,
  and returns the next state. It cannot call an API, read a file, or reach any
  server — including a community MCP server attached to the same session.
  An intent that says "read X and update" produces an INVENTED X, because a
  plausible next state is the only shape it can return. Measured live
  2026-08-31: a panel whose intent said *"if the call fails, set engine.status
  to 'engine: unreachable'"* answered "refreshed from engine … synced" while
  its server was disconnected, and displayed precise, entirely fabricated
  numbers. It can now REFUSE (returning `{"error": …}` throws), but refusing
  is the best it can do — design so it never has to.
  Use an intent for what it is good at: transforming state the caller already
  supplied (summarise this, re-rank that, draft a title from these fields).
- **To bring the OUTSIDE WORLD in, the agent is the courier.** The panel
  declares a REDUCER-BACKED tool taking the values as arguments; the agent —
  which does hold the session's tools — reads the source and calls that tool
  with real values. This is the canvas-companion recipe's own pattern
  ("the courier is the agent … then call `companion.observe` with the facts"),
  and it is deterministic: one writer, nothing invented, and a value that was
  never read is visibly absent instead of quietly fabricated.
  For a panel that must run STANDALONE (published to the registry, where the
  listing bar refuses tools with no local authority), the courier is not
  available — give the tool a data feed (`forge.set_feeds`) or a bundled
  authority instead.
- **What a panel can still reach through the agent**, via that courier
  pattern rather than an intent's own powers: the live coop avatar
  (wardrobe/mood/gesture), specialists/subagents (`execute_agent`), workflows,
  hooks (toasts, open-panel), the site canvas, site memory, and other forged
  panels.
- **Per-panel specialists** — `forge.add_agent` attaches a subagent to the
  panel's manifest (id, whenToUse, instructions, tools restricted to the
  panel's own tools + `sitebay_*`, optional bundled skills). It registers
  while the panel is mounted, unregisters on delete.
- **Per-panel skills** — `forge.add_skill` bundles reference knowledge with
  the panel; `forge.skillify` distills a finished panel into one.
- **Signals & routines** — `forge.declare_signal` declares the panel's named
  signals; panel-visible tools fire them via the injected
  `sorti.signal({name, payload})` (prefer the `custom:` namespace);
  `forge.add_routine` attaches a workflow triggered by them (inert until
  the user approves installing it). An undeclared listener is a conformance
  issue — wiring is explicit.
- **Coop** — `forge.set_coop` makes the panel a shared room; only
  reducer-backed tools may mutate (doctrine law 3), and the seat trial runs
  in playtest. Design the second seat from the start.
- **Drag/drop composition** — `dragData`/`dropIntent` with `sorti://`
  payloads let the panel exchange with the canvas, notebooks, and other
  panels instead of rebuilding first-party surfaces.
- **Distribution** — `forge.export_app` is the native iOS/Android project lane.
  The web/registry verbs ride the COMMAND LANE, invoked through
  `forge.run_command {command, arguments}` (call with only `{command}` first to
  read that command's contract): `forge.export_worker` is the self-hosted web
  artifact; `forge.register_panel`/`forge.publish_panel` create a dark candidate,
  then `forge.promote_candidate` compare-and-swaps the returned
  `{slug, defHash, expectedActivationId}` live (`pointerState=current` is the
  present-state proof); `forge.submit_listing_screenshot` adds its shelf witness;
  `forge.submit_recipe` shares a community recipe (`forge.browse` reuses them)
  — pass `{slug}` to publish an app you already built (the RecipeBuild is
  derived from its own definition and its lineage is the source def's hash),
  or `{recipe}` for a hand-built one. Exactly one; the `This teaches:` line in
  `summary` is yours to write either way.
- **Make it a PLUGIN** — when the thing you built changes how you WORK, not only
  what you show. An app is a surface. A plugin is a surface plus a way of
  working: skills you follow, commands the person can type, routines that run,
  and nudges to yourself at the right moment. The built-in Design Studio is
  exactly this and nothing more: one forged board, three skills, three slash
  commands, one hook. Anyone may have one; build it the same way.
  1. **Forge the board** as any app. Its reducer tools are the plugin's ops
     (`studio.add_iteration`, `studio.judge_iteration`, …). Keep state small
     and revisioned; the board is where the way of working is visible.
  2. **Write one skill per way of working** with `forge.add_skill` — not one
     skill about the app. Design Studio has *set direction*, *iterate against
     it*, *critique against it*. Each says when to use it, what to read from
     the board first, and which op records the result.
  3. **Attach routines** with `forge.add_routine` only for work that should
     happen without being asked. Most plugins need none.
  4. **Bundle it**: `forge.run_command {command:"forge.bundle_plugin",
     arguments:{slug, version, label, oneLine, bindings, slashCommands,
     hooks}}`. The recipe, skills and routines are DERIVED from the app. You
     write only the words about the unit:
     - `label` and `oneLine` — what a person reads in their plugin list.
     - `bindings` — one row per op a person should know about:
       `{op, tier:"act", oneLine}`. A binding REFERENCES a tool the app
       already declares; it never creates one, and an unknown op is refused.
     - `slashCommands` — `{name, description, skillName}`. Each must name a
       skill the bundle ships, or it is refused.
     - `hooks` — see below.
     **Omit `outDir`.** It is written into this team's plugin folder.
  5. **Tell the person the truth about what happens next.** The plugin appears
     in their plugin list UNTRUSTED. Its skills load at once. Its commands,
     its board and its hooks do nothing until they tap **Trust**. Never say
     the plugin "is on". Say what it contains, quote every hook's text, and
     ask them to read it and tap Trust.

  ⛔ **Two different things are both called "hooks".** `forge.set_hooks` is the
  APP's own trigger graph: reducer-side, fires when the panel's state changes.
  A PLUGIN hook is a nudge to YOU at a moment in your own work:
  `{id, displayName, event, matcher, action}`. `PreToolUse` and `PostToolUse`
  REQUIRE a `matcher` (the tool's name). `action.kind` is one of `toast`,
  `open_panel`, `inject_context`, `run_workflow` — never `http`, `deny` or
  `ask` — and carries its own params, e.g.
  `{kind:"inject_context", inject_context_params:{text:"…"}}`. Design Studio's only hook is
  `PreToolUse` on `designstudio.add_iteration` with `inject_context`: "look at
  what actually painted before you card it." That is the pattern: a plugin
  hook protects the way of working from your own shortcuts. Write the text as
  an instruction to yourself, one short paragraph, and remember the person
  will read it before trusting the plugin.

  A plugin cannot ship native code, an off-system pixel, or anything the app
  could not already do. It is your app plus your habits, in one unit.
- **What the app DECLARES about itself** — `forge.set_manifest` takes
  `requires` (what the app still needs from somebody else: rows of
  `{id, kind, impact, supply, because}`) and `inputs` (what the INSTALLER must
  supply: rows of `{name, kind, label, consoleUrl?, setupSteps?,
  redirectUriTemplate?, suggestedValue?}`). Your `requires` rows are ADDITIVE to
  the ones the forge infers from the definition and win on a shared `id` —
  inference sees shape, you see the world. `inputs` are never inferred and never
  carry a VALUE: a served manifest is public, so a `secret` may not have a
  `suggestedValue` at all, and on the others it is a suggestion the installer
  may replace. `[]` clears either list. Both travel into a recipe, survive an
  import, and appear in `sorti-app://manifest`; `forge.scaffold` and
  `forge.import` name the unresolved inputs in their result for you to read out.
- **Bringing an app IN** — `forge.run_command forge.import` takes exactly one of
  `{content}` (the text of an exported artifact) or `{endpoint}` (the http(s)
  JSON-RPC url of any conformant server that publishes its definition —
  including a forged app already on the multi-tenant Worker, so "bring me that
  app" needs no file). Either way the passport's hash is re-verified, the
  surrounding file is never executed, and the import is a FORK: lineage is
  computed here and can never be supplied.

## Content packs — scale by rows, not reducers

`forge.add_pack {slug,name,schemaVersion,schema,rows}` appends an immutable,
schema-validated content version. Reducers, derived values, and legal actions
read the active rows with `{"pack":"name"}`. Use packs for cards, relics,
encounters, templates, catalog entries, and every other content family whose
growth should be rows rather than new tools or reducer branches.

Pack rows do NOT belong in state: state is the user's changing run; packs are
the app's versioned content. An identical submission is idempotent. Changed
rows append the next pack version; a schema change must also advance
`schemaVersion`. Every reducer call is authority-stamped with the exact
`_packVersions`, so fixtures, coop logs, and replay continue to see the content
that action originally used. Caps per panel: 16 names, 32 total versions, 2,000
rows and 256 KiB per version, 1 MiB overall. The 2,000-row bound matches the DSL
array bound. Read/grep pack files for inspection; append with `forge.add_pack`,
never edit a projected pack file.

## Reducer hooks - effects as data

`forge.set_hooks {slug,hooks}` installs the ordered reducer-side trigger graph.
Use it for cross-cutting state effects such as relics reacting to damage,
achievements reacting to progress, or task policies reacting to status changes.
Hooks use the presentation-reaction `when` vocabulary (`change`, `increase`,
`decrease`, `truthy`, `falsy`, `grow`, `shrink`), but they are authoritative
reducer logic, not UI motion. Declaration order is execution order; scoped
`each`/`key` triggers bind the changed entity as `item`.

Keep content-specific values in packs and class-wide behavior in hooks. A hook
may read `{"pack":"relics"}`, so adding a relic is a row change rather than a
new conditional woven through every reducer. Hook ops are the bounded reducer
base tier. Forge statically refuses trigger cycles, dynamic write paths,
unprovable cascade depth, excessive fanout, and any tool plus reachable hooks
that exceeds the flattened operation budget. The runtime also refuses overflow
as a typed error with state untouched; cascades are never silently truncated.

Install hooks only after reducers and packs are stable enough to name their
paths. Then play one representative cascade and `forge.record_fixture` it. The
fixture wall makes declaration-order or effect regressions visible on every
later behavior change. Presentation reactions still own animation and sound;
reducer hooks own durable state transitions.

## Invariants — the panel's oaths (declare them early)

`forge.set_invariants {slug, invariants}` — named BOOLEAN expressions (same
DSL) that must be exactly `true` on every committed state. This is the
app-specific oracle: generic lints can't know that hp may never go negative
or that deck+hand+discard must conserve — you do, so declare it:

```json
{
  "hpBounded": {
    "and": [{ "gte": [{ "get": "hero.hp" }, 0] }, { "lte": [{ "get": "hero.hp" }, { "get": "hero.maxHp" }] }]
  },
  "deckConserved": {
    "eq": [
      { "+": [{ "len": { "get": "deck" } }, { "len": { "get": "hand" } }, { "len": { "get": "discard" } }] },
      { "get": "deckSize" }
    ]
  }
}
```

Enforcement is structural, not advisory: `forge.playtest` checks every
reachable state (violations are ERRORS — they gate `ok`, unlike taste), and
a tool call whose outcome breaks a law is REFUSED with a typed error — state
untouched — on the solo path, the coop room, AND the exported worker (same
compiled evaluator everywhere). Expressions may read `derived.*` (checked
after materialization). Set time is strict twice over: malformed sources are
rejected, and so is declaring a law the CURRENT state already violates — fix
the state or the law first. Cap 16; the `invariants` panel file is
readable/greppable/editable like `derived`. Declare invariants right after
seeding state, BEFORE building out tools: every later rework is then judged
against them for free, and a refusal message names exactly which law broke.

## Worked examples — state the number BEFORE you write the reducer

An invariant says what must never happen and a fixture says what already
happened. Neither can say the reducer computed the WRONG number: `×1.05` where
`×1.5` was meant, `strength` where `dexterity` was meant, a fold that runs five
times instead of six. All three are well-formed, total, invariant-clean
programs, so nothing structural can see them. An **example** can, because it is
the one artifact in a forged app that can disagree with its reducer:

```jsonc
forge.add_tool {
  slug, name: "combat.play_card", description, reducerSource,
  examples: [
    { "args": {"hits": 6, "base": 5, "vulnerable": true},
      "expect": {"combat.damage": 42},
      "state": {} }
  ]
}
```

`expect` is a sparse state-path → value map, checked against what the reducer
commits (`derived` is stripped, so claim the path the projection is computed
FROM). `state` is the base the call runs from — `{}` when omitted, and never
the panel's live state, so playing the app can never turn a claim red.
`forge.playtest` runs each example through the real boundary; a mismatch is an
ERROR that gates, and the finding prints your claim beside the number the
reducer actually committed.

**Where the numbers come from — this is the whole discipline.** If the user
stated any, HARVEST THEM VERBATIM: "six hits at five base should hit for 42",
an acceptance table, a quoted rule, a screenshot of the real game. That is the
strongest oracle the app will ever have and it is usually already sitting in
the conversation. If the user stated none, write down the result you INTEND —
in the example, before the reducer exists — and then make the reducer satisfy
it. Never obtain an `expect` by running the reducer and copying what it said:
that is a fixture with extra ceremony, and it is worse than no example at all,
because it looks like verification while certifying nothing.

**The rule is mechanical, not advisory.** Examples may only be declared in the
`forge.add_tool` call that CREATES the tool — the moment you cannot yet have
run *that tool*. Every later path refuses with a teaching error (the tool file,
the `examples/<tool>` file, every `set_*`). It is a ratchet rather than a
fence: a throwaway probe tool carrying the same reducer would still hand you the
number, and nothing can stop that — which is exactly why the instruction above
matters. Do not route around it; an expect you harvested from your own run is a
lie told to the next author, and it is the one lie this whole mechanism exists
to make expensive. You may always
withdraw one (`forge.run_command forge.remove_example {slug, tool, index}`,
journaled) so a typo cannot brick a tool; only ADDING is gated. And editing the
reducer until it satisfies its examples is not a workaround — it is the entire
point. The examples are the spec. Read them back any time with the
`examples/<tool>` panel file; the `tools` listing shows which tools have any.

## Fixtures — record the wall as you play

`forge.record_fixture {slug, name}` snapshots the moves you JUST played —
the state before them, every stamped reducer call since (the `_seed`/`_now`
stamps ride along, so shuffles replay byte-identically), and the state they
produced. From then on every behavior-changing edit (`forge.edit
tools/<name>`, `set_derived`, `set_invariants`) replays ALL fixtures and is
REFUSED on divergence, naming the fixture and the FIRST diverging action;
`forge.playtest` replays them too (failures gate `ok`). This is the panel's
self-recorded parity wall — the sts2 pattern, one recorded session at a
time.

Mechanics: the recordable window is solo reducer play only — it resets on an
agent-handled tool call, a state restore, or coop mode (the room op-log owns
coop history). Fixtures compare REDUCER truth: `derived` is stripped, so
benign projection changes never break the wall, but invariants are checked
mid-replay — recording a play that dips below a later-declared law will
refuse that law with the exact action named. Intended behavior change =
`forge.remove_fixture` → make the change → re-play → re-record. Caps: 24
fixtures, 128 actions each. Read them like files: `fixtures` (listing),
`fixtures/<name>` (read-only record). **Record a fixture after every
milestone you'd be sad to break** — the wall is how a later rework proves it
broke nothing.

## State migrations — evolve saves without erasing them

Persisted app state is an envelope: `{"schemaVersion":N,"state":{...}}`.
Legacy raw objects are schema v1. When state shape changes, append exactly one
contiguous pure hop with `forge.migrate {appSlug, from, to, ops}`; `to` must be
`from + 1` and `from` must be the app's current state schema. Use ordinary
reducer ops, including `{"unset":"old.path"}` for a real rename. Forge applies
the chain before restored state enters the authoritative store; a missing hop
or a future-version save refuses the app loudly instead of guessing.

Fixtures are version-aware: their base, trace, and expected states cross the
same chain before replay. A migration that changes reducer paths may therefore
open a **repair window**. While `repairPending` is true, reducer execution,
playtest success, publish, and export are blocked, but authoring edits remain
available. Read and repair the affected `tools/<name>` sources with
`forge.edit`; the gate closes automatically when every migrated fixture
replays green. Never remove or rewrite an old migration after users may have
that save. The read-only projection exposes each hop as
`migrations/<from>-<to>` and cubby writes it as
`tree/migrations/<from>-<to>.json`.

## Derived values & legal actions (two different tools)

- `forge.set_derived` — call shape `{slug, derived}` where `derived` is a
  map of name → expression (JSON object or JSON-encoded string). Named pure
  expressions materialized into `state.derived.<name>` on every state
  write; the view binds them like raw state (`{"$bind":"derived.progress"}`).
  Use for every projection (sums, percents, top-N, labels) instead of
  reducer bookkeeping.
- `forge.set_legal_actions` — call shape `{slug, source}`: the expression
  rides the **`source`** param (NOT `expression` — a wrong key clears
  legalActions silently: `hasLegalActions:false`, empty issues, no error).
  One expression producing the CURRENT legal moves as `{tool,label,args}`
  descriptors. Every non-terminal state must admit ≥1 action — playtest
  flags soft-locks.

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
  `dragData`/`dropIntent` with `sorti://` payloads. Mechanics reference:
  the questboard recipe; visual structure follows the SiteBayWP design stage.
- **Games**: `range`+`shuffle`+`slice` for decks (and the two `range` idioms
  above — per-hit damage folds over a run-time count, reshuffle-when-empty is
  the conditional-op gate); `set_legal_actions` as the
  move list; reactions + spawns + cues provide action feedback, including health
  changes when the game has health. Mechanics reference: the game-loop recipe.
  Reuse STS2's lobby, relevant play/result L3 scenes and navigation structure for
  the visual design. Non-card games keep their own board/arena and rules.

## Extending a HOST SURFACE (canvas companions, lenses)

Extension-ness is a DECLARED CAPABILITY SET, not a mode: a forged panel that
"hooks into the canvas" is an ordinary panel plus `forge.bind_surface`
requests. Golden reference: the canvas-companion recipe.

- **The contract**: each host surface (today `sorti:canvas`) publishes verbs
  in three tiers — _observe_ (`canvas.get_viewport`, `canvas.screenshot`,
  `canvas.get_page_context`; auto-granted), _act_ (`canvas.click`,
  `canvas.scroll`; the user consents ONCE, revocable, revoked calls fail
  closed), _execute_ (`canvas.eval_js`; first-party only — never grantable
  to a forged app, do not request it) — plus events
  (`canvas/element-clicked`) and attachments (`overlay` needs consent;
  `lens` is non-visual and auto-granted).
- **Declare**: `forge.bind_surface {slug, surfaceId, verbs, events, attach}`
  (or the recipe's `surfaces` field — scaffold validates it the same way).
  Unknown surface/verb/event is a typed rejection at author time. Request
  the MINIMUM: every act-tier verb is a consent prompt on the user.
- **Land data in STATE**: everything the panel learns from the surface must
  enter through one deterministic reducer (a landing tool like
  `companion.observe`) — never painted from a side channel — so the trail
  persists, replays, and renders from state only (law 1).
- **Route events to the landing tool**: `eventIntents` on the binding —
  `{"canvas/element-clicked": "companion.observe"}`. The target must already
  exist on the panel and be REDUCER-BACKED (events can be high-frequency;
  an intent tool would make every click an LLM call — refused). Keys must
  be a subset of the binding's `events`. Add the tool first, then bind.
- **Delivery**: on current hosts a granted event with a declared route
  dispatches the landing tool DIRECTLY — element facts as args ({x, y,
  selector, tagName, rect, meta} for canvas clicks), through the same
  intent lane a pressable tap uses (prediction included). Write the landing
  reducer to tolerate both callers (coalesce a display field from
  title/selector/tagName — see canvas-companion). The agent remains a valid
  courier for richer facts (page context, screenshot takeaways).

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
  `forge.add_pack`, `forge.set_derived`, `forge.set_legal_actions`) live on the
  forge-specialist seat; the officer keeps only `forge.scaffold` /
  `forge.list` / `forge.read_skill`.
- `forge.checkpoint` before a risky rework — on the command lane:
  `forge.run_command {command:"forge.checkpoint", arguments:{slug}}`. It
  snapshots the DEFINITION in session memory for `forge.rollback` (same
  lane). See Durability below for what survives a restart (the panel does;
  the checkpoint does not).

## The panel is a filesystem — read / grep / edit it

A forged panel is a tiny tree of virtual "files"; treat it like a repo instead
of resending whole objects you can't see. This is the SURGICAL-REPAIR path —
reach for it before `forge.set_spec` (whole-tree replace) or delete+recreate.

- Files: `spec` (primary primitiveSpec, pretty JSON), `view` (primary inner-body HTML),
  `scenes/<slug>.json` (read-only scene definitions),
  `legalActions` (the DSL expression), `derived` (name→expression JSON),
  `state` (live runtime, READ-ONLY), `packs` + `packs/<name>.v<N>`
  (immutable content, READ-ONLY), `hooks` (ordered reducer trigger graph,
  READ-ONLY), `fixtures` + `fixtures/<name>` (recorded reducer parity wall,
  READ-ONLY), `migrations` + `migrations/<from>-<to>` (immutable state-schema
  hops, READ-ONLY), `tools` (a listing, showing which tools carry stated
  examples), `examples/<tool>` (that tool's stated claims, READ-ONLY — see
  Worked examples: they can only be declared at add_tool, so writing here is
  refused), and `tools/<name>` (a reducer tool's ops-JSON source).
- `forge.read {slug}` lists the files; `forge.read {slug, path}` returns one
  file's EXACT content — the string `forge.edit` matches against.
- `forge.grep {slug, pattern[, flags]}` searches every file with a regex and
  returns `path:line: text` hits — use it to LOCATE a mis-typed binding
  (`forge.grep {slug, pattern:"streakLabel"}`) before editing.
- `forge.edit {slug, path, oldText, newText[, replaceAll]}` does an EXACT
  string replace (FileEdit semantics: `oldText` must match exactly and be
  UNIQUE unless `replaceAll`), then re-validates through the same gates
  `set_spec`/`set_legal_actions`/`add_tool` use — a broken edit is rejected,
  never stored. Read the file first, copy the exact substring, then edit.
- **`forge.edit tools/<name>` is the reducer UPDATE verb** `add_tool` lacks:
  fix one op in place instead of minting a corrected copy under a new name.
- These four (read/grep/edit) are also on the OFFICER seat — a one-line
  binding fix after a failed visual sign-off does not need a whole specialist
  mission. Heavy authoring (create/set_spec/add_tool) still routes to the
  specialist.

## Campaign-bound missions

When the mission context includes a Forge campaign contract, it is the scope
boundary for this turn:

1. Read the injected campaign contract before authoring. Work only the named
   milestone.
2. Before reporting success or a blocker, call `forge.campaign amend` for that
   milestone: change its status to `done` or `blocked`, append concrete notes,
   pass the injected `expectedRevision` and `closureToken`, and advance `next`
   when appropriate. Put the durable lesson in `milestone.notes`; a campaign-
   level note alone does not close the contract.
3. Declare the milestone's **driveScript** before closing it — the author-owned
   walkthrough verify replays with REAL TAPS through the client lane
   (`ui_command`), and the capstone demo replays live. Each step is
   `{id: "panel.<slug>.<tool>", args?, expect?}`; `expect` is a JSON-logic
   state predicate string (the same expression language as invariants) checked
   after the tap — a false expect is a HARD verify issue. Set it via
   `forge.campaign amend` on the milestone. A worked 3-step example for a
   `crop-tycoon` panel:

   ```json
   {"milestone": {"id": "m2-core-loop", "driveScript": [
     {"id": "panel.crop-tycoon.crop.plant", "args": {"plot": 0},
      "expect": "{\"eq\":[{\"get\":\"plots.0.state\"},\"growing\"]}"},
     {"id": "panel.crop-tycoon.crop.water", "args": {"plot": 0}},
     {"id": "panel.crop-tycoon.crop.harvest", "args": {"plot": 0},
      "expect": "{\"gte\":[{\"get\":\"gold\"},10]}"}
   ]}}
   ```

4. If the contract must expand, call `propose_plan_amendment` before doing
   out-of-scope work.

The verifier requires a real status transition and a non-empty amendment note
after the mission began. A milestone whose panels carry reducer tools also
requires a non-empty driveScript to close (advisory for view/intent-only
panels). Shipping code without closing the campaign milestone is not mission
success.

Campaigns may also carry a persistent mission crew. Use
`forge.clone_specialist` to derive a bounded specialist from the stock Forge
specialist when the arc needs recurring platform capabilities such as web
research or rendered-app observation. Declare the exact extra tools and durable
instructions; Forge tools and the campaign app's own forged tools are inherited
through fixed prefixes. Observe/read/verify extras are admitted directly, while
act/write extras require explicit user consent before the campaign revision can
commit. The crew record is audited campaign data and is restored next session,
so update one crew id instead of inventing a new agent each mission. Never use a
clone to widen scope beyond the named campaign.

## Durability — what survives, and what doesn't

Preserve useful unfinished work through the selected source/candidate owner.
Do not activate or publish an unverified candidate, delete it merely because a
budget expired, or call a smaller result success. Required polish remains required.
A context checkpoint summarizes work; it is not a source backup or receipt.
Inspect the actual persistence profile and original outcome before claiming durability:

- Panel DEFINITIONS (scenes, tools, legalActions, derived, packs, hooks,
  migrations, fixtures, manifest)
  persist through the registry on every mutation and rehydrate at session
  start. You do not need to re-create or re-export a panel to keep it.
- Panel STATE writes through as a versioned envelope and is migrated before it
  enters the live store after hydrate.
- The DESIGN JOURNAL persists to the vault. Read it (`forge.list` /
  `forge_panel.read_state`) before reworking — it is last session's wisdom —
  and record decisions, remaining checks and explicitly approved scope changes.

Source checkpoints and distribution are separate:

- `forge.checkpoint` snapshots live in worker memory only — take one (via
  `forge.run_command {command:"forge.checkpoint", arguments:{slug}}`) before
  a risky rework, but never rely on one across sessions.
- `forge.export_worker` (via `forge.run_command {command:"forge.export_worker",
  arguments:{slug}}`) is the OFF-Sorti web backstop (Cloudflare) and the
  distribution artifact — export when the user wants a deployable app or
  an explicitly requested backup, not as a routine save or rework prerequisite.
  Exports are PRIMITIVE-FIRST (2026-07-09): the spec ships as the resource
  with stateTool/prediction meta, the panel's seeded state travels as the
  worker's initial state, derived values materialize after every tool run,
  and the auto legal_actions tool rides along — the exported app runs the
  SAME compiled evaluator Sorti does (bundled, drift-proof).
- `forge.export_app {appSlug}` is the native store lane. It emits a pinned,
  EAS-buildable Expo project ZIP with every scene as a native navigation tab,
  the compiled reducer runtime, packs, migrations, fixtures, campaign, and
  journal. The default `offline` tier refuses model-visible intent tools,
  HTML-only scenes, `webSurface`, and migration-repair gates: a store build has
  no hidden agent fulfiller and is never a disguised browser shell. Cubby
  sessions persist the ZIP under `forge/apps/<slug>/artifacts/`; cubby-less
  sessions receive the archive as base64.

## Native app release gate

Before `forge.export_app`, require `forge.validate` clean, playtest over at
least one state, every fixture green, every persisted schema hop present, and
all user-visible actions reducer-backed. Exporting does not turn an incomplete
panel into an app; it makes the app's existing contracts portable.

For multiplayer, first `forge.set_coop`, create a candidate via `forge.run_command
{command:"forge.register_panel", arguments:{slug}}`, promote its returned
`{slug, defHash, expectedActivationId}` with `forge.promote_candidate`, require
`pointerState=current`, then call
`forge.export_app` with `connectivity:"multiplayer"` and the public
`multiplayerUrl`. The generated client calls `/p/<slug>/mcp` with a `roomId`;
the Worker seeds a new room from the registered app state and enforces the same
pack pins, hooks, derived projections, migrations, arg coercion, and invariants
as the local authority. The app store account, signing credentials, listing
copy, screenshots, and final submit button remain human-owned.

## Verification tiers (do all three)

0. **Declared oaths, stated claims, recorded walls**: `forge.set_invariants`
   before anything else, an `examples` claim on every tool whose numbers
   matter — stated in the `add_tool` call itself, harvested from the user's own
   numbers where they gave any — and `forge.record_fixture` after every play
   session worth protecting. The walk in tier 2 and every later edit are then
   checked against YOUR laws, YOUR intended numbers, and YOUR recorded truth,
   not just generic lints. A game panel without at least a resource-bounds
   invariant and one fixture is running without an oracle; a tool that does
   arithmetic and states no example has nothing but its own output to be
   judged against.
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

- **`concat` is STRING join; array concatenation is `concatArrs`.** (Both
  tiers.) A part that is a literal JSON array is taken verbatim; every other
  part must evaluate to an array.
- **`forge.add_tool` refuses a duplicate name** — but you no longer mint a
  renamed copy to fix a reducer: `forge.edit tools/<name>` replaces an
  existing reducer's ops-JSON IN PLACE (validated before store). `forge.read
tools/<name>` first to see the current source. Minting under a new name +
  repointing intents is now only for CHANGING a tool's name/schema, not its
  logic. Test a novel op shape in a throwaway probe tool before wiring it.
- **Op budget: 64 ops base tier, 256 flattened with `"v": 2`.** A 52-item
  literal built with `push` ops nearly consumes the base budget — bundle
  sibling scalar writes into ONE `merge` (or generate with `range`+`map` in
  a single `set`). Declare the tier only when genuinely needed; do not
  default to v2.
- **Deep hand-chained if/eq trees have passed add-time validation and then
  thrown at INVOKE.** Never hand-chain index translation; use an eq-based
  `where` match (`{"updateWhere":"arr","where":{"eq":[{"item":"id"},
{"arg":"id"}]}}`) whenever the match is expressible.
- **Dispatched tool args can arrive as STRINGS.** `eq` is strict (`"4"`
  never equals `4`) and arithmetic does NOT coerce (`{"*":[{"arg":"i"},1]}`
  on a string arg yields `0`, not the number). THE FIX IS THE SCHEMA:
  declare every arg's `type` in the tool's inputSchema — the dispatch
  boundary coerces args to their DECLARED types (string→number/boolean,
  number→string; lossless only) in every runtime (authority, coop, playtest,
  prediction, exported worker). An arg declared `{"type":"number"}` can be
  compared with plain strict `eq`. Only when a schema is loose or absent
  does the manual idiom apply: stringify BOTH sides through `concat`
  (`{"eq":[{"concat":[{"item":"i"},""]},{"concat":[{"arg":"index"},""]}]}`)
  and emit legalActions args as strings. The original trap cost a real
  mission ~20 tool calls; the grid-game recipe shows the belt-and-braces
  form (declared type + string-safe compare).
- **Gate EVERY dependent op on the same guard.** Ops run unconditionally in
  sequence: if a `place` writes a cell only-when-empty, the turn flip and
  move counter need the SAME emptiness condition or an occupied-cell tap
  still burns a turn. Compute the guard ONCE into a scratch field as op 1
  (ops see the EVOLVING state — testing emptiness after the write is
  always false), then `if` on it in every dependent op.
- Dotted paths work for `get`/`set`/`inc`/`merge` (e.g. `"run.score"`),
  but merge-to-root fails — merge into a named object path.
- **Author large reducer programs with a generator script** (node -e /
  .mjs emitting the ops-JSON), never by hand — then paste the output into
  `forge.add_tool`. Hand-written 60-op JSON is where typos live.

## Known traps

- `forge.scaffold` recipes: counter, list, grid-game (rows×cols turn-taking
  board — the tic-tac-toe shape), game-loop, game-loop-packs, game-loop-coop,
  questboard, canvas-companion (the EXTENSION exemplar — binds the canvas
  surface), spire-lite (two-scene coop deckbuilder — content as bounded
  data packs over a small rule kernel), crew-deck (coop site-work cockpit —
  host events land in reducers, agents work above the trail), revision-relay
  (candidate, promotion, exact replay, and rollback activation witness),
  canvas-steward (the binding-kernel witness — a required site binding an
  owner grants, a revoke that bites at the next use, an optional archive
  binding that degrades), canvas-snapshot-clerk (the connector witness — one
  allowlisted Canvas read arrives through the site binding as bounded JSON
  and lands through one ordinary reducer; retries dedupe on the invocation
  receipt), morning-canvas-brief (the scheduled witness — a SiteBay calendar
  fires the site connector in an explicit timezone; the fingerprint pin
  refuses silent migration and redelivery replays to one state effect),
  canvas-publish-run (the background witness — a bounded multi-step publish
  whose one completion lands through the signed door; cancellation cannot
  unmake a committed reducer op, and a def promoted under a running job makes
  its completion terminally stale), canvas-audit-press (the export witness —
  one declared audit format streams the app's own governed truth bounded
  WHILE producing, and every stream ends with an in-band terminator so a
  partial can never look complete). The
  scaffold tool description carries the live generated catalog — trust it over
  this list.
- FileRead/FileWrite param is `path`. Shell heredoc writes are refused —
  use FileWrite.
- If a tool errors `reducerSource must be valid JSON` you stored code —
  rewrite as ops-JSON; do not retry the call.

## Shared app information for developers and agents

New Forge apps carry `sorti.app-information/2` through the existing manifest. Read
`forge.information` (omit slug for the bound repository) before proposing changes.
The human Overview consumes the same contract. Do not create per-app Overview UI.
A new public SDK code app uses descriptor `version: 2`; defaults derive its L3 main
view and conservative retention/source information. Existing v1 imports still open.
Describe mixed retention using named regions. Device-local storage is not account
sync; metadata never certifies the last save, a deployment, or source-edit access.
Reference the existing preview catalogue and actual read action when supported;
never copy actions/scenes into a second roster or invent facilities to pass a gate.
Use `workspace_app_diagnostics` for the exact mounted instance, and the existing
source symbols/incident capture to connect a developer's selection with an agent.
Do not dump app state into a request merely to make it richer. Resolve authorization
for source and observations, preserve evidence identity, and never replay an unknown
write. `forge.validate` checks this baseline for authoring, not during playback.
