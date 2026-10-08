---
title: Build a counter panel with Forge
description: Remix a small panel, connect visible controls to state, and test the actual tool before reusing
  the pattern.
slug: build-a-counter-panel
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- Forge counter tutorial
- counter panel
- state binding
- reducerSource
- Sorti panel
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- practical-forge-authoring
---

Build a counter to learn how a Sorti panel connects a view, state, and tool actions. Keep this first app local to its own state: no site changes, external API calls, or publication are needed.

## Start from the workbench

Ask:

> Use the Forge workbench to find a suitable counter recipe. Remix it into a small counter with Increase and Reset controls. Keep the prepared app styling and verify the controls. Do not connect external services or publish it.

The current authoring flow starts at `forge.guide` and uses its `forge.browse` remix guidance. Read the returned recipe and exact tool schemas instead of inventing a creation request. A code-app with a bound repository keeps that workflow; this tutorial concerns a runtime-definition panel.

Use the version returned by `runtime.primitivesVersion`. The recipe's shell and themed components are the starting point for presentation, not something to replace with a plain full-screen HTML page.

## Make state the source of the number

The app's state needs one numeric field:

```json
{
  "count": 0
}
```

The displayed value should bind to that field. It should not be separate text that the assistant updates after every click.

This is a small **view fragment**, not a complete app or a tool-call envelope. Keep the recipe's styling, spec wrapper, and current version. The `counter.*` names below are illustrative; use the actual tool names returned for your remixed app.

```json
{
  "type": "view",
  "children": [
    {
      "type": "text",
      "props": { "value": { "$bind": "count", "fallback": 0 } }
    },
    {
      "type": "pressable",
      "props": { "intent": { "type": "counter.increment", "payload": {} } },
      "children": [{ "type": "text", "props": { "value": "Increase" } }]
    },
    {
      "type": "pressable",
      "props": { "intent": { "type": "counter.reset", "payload": {} } },
      "children": [{ "type": "text", "props": { "value": "Reset" } }]
    }
  ]
}
```

A `pressable` emits an intent. The declared tool handles that intent and changes state; the view then reads the new value. This keeps the visible control and the assistant's tool action connected to the same behavior.

## Define the two state changes

The increment reducer program is:

```json
{ "ops": [{ "inc": "count", "by": 1 }] }
```

The reset reducer program is:

```json
{ "ops": [{ "set": "count", "value": 0 }] }
```

When the tool schema asks for `reducerSource`, send the serialized JSON string, such as `JSON.stringify(program)`. It is not JavaScript source, a bare operations array, or an object instead of a string.

For a remixed app, inspect its current definition before changing it. Use the guide's reviewed source-change template with its complete source basis and an operation ID. Group related view and reducer edits through the supported source-change path rather than leaving a button pointed at a tool that does not exist.

## Test the actual controls

Run the guide's validation and playtest, then exercise the actual panel and its minted tool. Use this sequence:

| Action | Expected count |
| --- | ---: |
| Open the initial state | 0 |
| Increase once | 1 |
| Increase again | 2 |
| Reset | 0 |
| Reset again | 0 |

Compare the returned state and the displayed value after each action. If the tool changes state but the number stays still, inspect the binding. If a click does nothing, compare its intent name with the tool inventory.

A failed playtest provides a counterexample and a route back to the implicated source. Repair the failure and rerun that test. Do not remove the failing check to manufacture a pass. A `recorded` or `stale` result is not current execution evidence.

## Check the finished panel

Open the panel at narrow and wide sizes. Confirm that both controls remain readable and reachable, and that the displayed number follows the actual state. These checks are separate from parsing the JSON fragment above.

This counter proves a small interaction pattern, not durable shared storage or a successful public export. Add those requirements deliberately after the basic behavior works. The [Forge reference]({{< relref "sorti/forge-reference.md" >}}) covers the current scene vocabulary and authoring contract; [panel testing]({{< relref "sorti/testing-sorti-panels.md" >}}) covers the wider verification workflow.
