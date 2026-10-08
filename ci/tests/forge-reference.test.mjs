import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderReference, synchronize } from '../scripts/sync-forge-reference.mjs';

test('reference preserves canonical sections and normalizes only trailing whitespace', () => {
 const output = renderReference('---\nname: forge\n---\n# Skill\nPrivate intro\n## Contract\nExact `version` and fields.  \n');
 assert.match(output, /## Contract\nExact `version` and fields\.\n$/);
 assert(!output.includes('Private intro'));
 assert.throws(() => renderReference('# Missing contract'));
});
test('check refuses drift without modifying metadata or files', () => {
 const dir = mkdtempSync(join(tmpdir(), 'docs-forge-test-'));
 try {
  const source = join(dir, 'SKILL.md'), destination = join(dir, 'reference.md');
  const metadata = '---\ntitle: Reference\npublished: 2026-07-07\n---\n';
  writeFileSync(source, '# Skill\n\n## Contract\nOriginal.\n');
  writeFileSync(destination, metadata + '\nStale\n');
  assert.throws(() => synchronize({source,destination,check:true}));
  assert.equal(readFileSync(destination,'utf8'), metadata + '\nStale\n');
  synchronize({source,destination});
  assert(readFileSync(destination,'utf8').startsWith(metadata));
  assert.equal(synchronize({source,destination,check:true}),false);
  writeFileSync(source, '# Skill\n\n## Contract\nChanged.\n');
  assert.throws(() => synchronize({source,destination,check:true}));
 } finally { rmSync(dir,{recursive:true,force:true}); }
});
