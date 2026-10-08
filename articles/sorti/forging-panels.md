---
title: Create a panel with Forge
description: Forge creates or modifies an app definition using capabilities exposed by the current session. Start
  from its guide and inspect the target before editing.
tags:
- sorti
- forge
- mcp
- panels
- reducers
published: 2026-07-07
weight: 45
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- forging panels
- sitebay documentation
slug: forging-panels
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-forge
modified: 2026-10-07
---

Forge creates or modifies an app definition using capabilities exposed by the current session. Start from its guide and inspect the target before editing.

## Choose the authoring path

A `primitive-spec` panel is a validated JSON scene: the default Forge path, with native rendering and Gadget export.

A `primitive-ops` panel is an externally built React application that emits the same vocabulary. There is no `forge.set_ops` authoring command. These panels cannot be exported as static Gadgets; external native execution requires the applicable installation grant.

HTML is a compatibility path. It does not inherit primitive validation, native rendering, or Gadget export.

## Inspect and change

Use the guide's current tool names, schemas, virtual files, and primitive version. Read an existing app before editing. Preserve its complete source-request basis and operation ID when submitting a reviewed change.

The source-change operation can group related view and reducer edits. It does not make provider writes, migrations, or publication atomic with them.

## Test

Validate and run the declared playtest. Repair the input or control that caused a failure; do not remove an invariant to obtain a pass.

`passed` describes the tested inputs. `stale` means they changed, `recorded` is historical evidence, and `not-run` means absent evidence. A bounded playtest still needs the actual renderer and workflow checked.

The [Forge reference]({{< relref "sorti/forge-reference.md" >}}) retains the canonical authoring skill's exact technical vocabulary.
