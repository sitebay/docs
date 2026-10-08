#!/usr/bin/env bash
# One build owns the HTML, browser index, and cited agent corpus.
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$root"
output="${1:-public}"
"${HUGO_BIN:-hugo}" --destination "$output"
"${PYTHON:-python3}" ci/scripts/build-docs-corpus.py --output "$output/knowledge/corpus.json"
node ci/scripts/build-pagefind.mjs "$output"
