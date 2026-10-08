#!/usr/bin/env node
/**
 * Regenerate articles/sorti/forge-reference.md from the canonical forge
 * authoring skill in the sorti repo (apps/sorti-agent/skills/forge-authoring/
 * SKILL.md). Single-source rule: the skill is what the forge specialist
 * actually reads in production, so the public reference is a build artifact
 * of it — never hand-edit the output file, edit the skill.
 *
 * Usage: node ci/scripts/sync-forge-reference.mjs
 *   SORTI_REPO=/path/to/sorti overrides the default ~/sorti.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const docsRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const sortiRepo = process.env.SORTI_REPO ?? join(homedir(), 'sorti');
const skillPath = join(sortiRepo, 'apps/sorti-agent/skills/forge-authoring/SKILL.md');
const outPath = join(docsRoot, 'articles/sorti/forge-reference.md');

const raw = readFileSync(skillPath, 'utf8');
// Strip the skill's own frontmatter; keep the body from the first heading.
const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '').trimStart();
// The skill body opens with "# Forge Authoring Skill" + a mission-voiced
// intro paragraph; replace both with a docs-voiced heading. Everything after
// the first section heading is carried verbatim.
const firstSection = body.indexOf('\n## ');
if (firstSection === -1) throw new Error('unexpected skill shape: no "## " section found');
const reference = body.slice(firstSection + 1);

const today = new Date().toISOString().slice(0, 10);
const out = `---
title: "Forge Reference"
description: "The exact forge vocabulary — primitives, reducer ops, expressions, juice, budgets. Generated from the canonical in-product authoring skill."
tags: ["sorti", "forge", "mcp", "reference", "reducers"]
published: 2026-07-07
lastmod: ${today}
weight: 46
---

# Forge Reference

<!-- GENERATED FILE — do not edit. Source of truth:
     sorti/apps/sorti-agent/skills/forge-authoring/SKILL.md
     Regenerate with: node ci/scripts/sync-forge-reference.mjs -->

This is the exact vocabulary the forge's own authoring specialist works
from — the same document, republished. Concepts and background live in
[Forging Panels](/articles/sorti/forging-panels/). Sections addressed to
the authoring agent (mission tools, checkpoints, verification) describe
in-product behavior you'll see forge missions follow.

${reference}`;

writeFileSync(outPath, out);
console.log(`wrote ${outPath} (${out.length} bytes) from ${skillPath}`);
