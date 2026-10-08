---
title: Documentation style
description: Write for someone trying to complete one task. State the outcome first, then the prerequisites, steps,
  and a check that proves the result.
tags:
- sitebay
- docs
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- docs style
- sitebay documentation
slug: docs-style
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-style
modified: 2026-10-07
---

Write for someone trying to complete one task. State the outcome first, then the prerequisites, steps, and a check that proves the result.

## Use one voice

Use direct sentences and short, descriptive headings. Name the real button, field, tool, or command. Remove sales claims, jokes, filler introductions, and promises that the source does not support.

A quick answer can link to a detailed procedure instead of repeating it. A technical reference can be longer when its exact vocabulary and constraints are necessary.

## Ground instructions

Check product behavior against the owning source. Use current primary documentation for external tools. Record the basis in `doc_sources` and distinguish a source-level contract from a live deployment test.

Keep limits, prices, and availability tied to their authoritative source. Do not update a date to imply that an old screenshot or video was recorded again.

## Make examples safe

Identify the target and permissions before a write. Use obvious placeholder values, quote shell paths, and keep credentials out of examples. Explain what a command changes and how to verify it.

## Preserve navigation

Edit Markdown under `articles/`. Keep established slugs and aliases where possible. Use Hugo references for internal links. A section uses `_index.md`; an individual article bundle uses `index.md`.

## Validate

Build the site, check every published route and internal link, and run the strict editorial checks. Preserve author and license information. Do not publish placeholder screenshots, unsupported payment promises, or a claim that an untested operation succeeded.
