#!/usr/bin/env bash
# Fresh Chromium processes bound memory while all three disjoint shards run.
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"
output="${1:-public}"
evidence="${2:-.cache/browser}"
mkdir -p "$evidence"
for shard in 0 1 2; do
  DOCS_PAGE_SHARD="$shard/3" node ci/browser-smoke.cjs "$output" "$evidence/shard-$shard" > "$evidence/shard-$shard.log" 2>&1
  printf 'Browser shard %s passed\n' "$shard"
done
"${PYTHON:-python3}" ci/browser-coverage.py "$evidence"/shard-{0,1,2}/report.json --report "$evidence/report.json"
