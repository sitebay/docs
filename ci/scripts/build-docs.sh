#!/usr/bin/env bash
# One build owns the HTML, browser index, and cited agent corpus.
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$root"
output="${1:-public}"
# A dirty article checkout must not pretend to have committed source citations.
export HUGO_DOCS_SOURCE_REVISION=""
if [ -z "$(git status --porcelain -- articles)" ]; then
  HUGO_DOCS_SOURCE_REVISION=$(git rev-parse HEAD)
fi
"${HUGO_BIN:-hugo}" --destination "$output"
"${PYTHON:-python3}" ci/scripts/build-docs-corpus.py --output "$output/knowledge/corpus.json"
node ci/scripts/build-pagefind.mjs "$output"

"${PYTHON:-python3}" ci/llm_export.py --public-dir "$output"

"${PYTHON:-python3}" ci/legacy_routes.py --public-dir "$output"
