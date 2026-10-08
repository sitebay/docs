#!/usr/bin/env node
// Render the public reference from the canonical Forge authoring skill.
// Existing article metadata is preserved. --check performs no writes.
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function renderReference(raw) {
  const skill = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').replaceAll('\r\n', '\n').trimStart();
  const firstSection = skill.indexOf('\n## ');
  if (firstSection < 0) throw new Error('Canonical skill has no level-two section');
  const reference = skill.slice(firstSection + 1).replace(/[\t ]+$/gm, '').trimEnd();
  return `This reference is generated from the canonical Forge authoring skill. Use the current session's schemas when making tool calls. Read [Create a panel with Forge](/docs/sorti/forging-panels/) for the workflow.\n\n<!-- GENERATED: sorti/apps/sorti-agent/skills/forge-authoring/SKILL.md -->\n\n${reference}\n`;
}

export function synchronize({ source, destination, check = false }) {
  const current = readFileSync(destination, 'utf8');
  const match = current.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  if (!match) throw new Error('Reference article must retain its metadata');
  const rendered = renderReference(readFileSync(source, 'utf8'));
  const existing = current.slice(match[0].length).trimStart();
  if (check) {
    if (existing !== rendered) throw new Error('Forge reference differs from canonical source; regenerate it');
    return false;
  }
  const next = match[0] + '\n' + rendered;
  if (next !== current) writeFileSync(destination, next);
  return next !== current;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.some(arg => arg !== '--check')) throw new Error('Usage: sync-forge-reference.mjs [--check]');
  const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
  const sortiRoot = process.env.SORTI_REPO || join(homedir(), 'sorti');
  const changed = synchronize({
    source: join(sortiRoot, 'apps/sorti-agent/skills/forge-authoring/SKILL.md'),
    destination: join(docsRoot, 'articles/sorti/forge-reference.md'),
    check: args.includes('--check'),
  });
  console.log(args.includes('--check') ? 'Forge reference matches canonical source' : changed ? 'Updated Forge reference' : 'Forge reference unchanged');
}
