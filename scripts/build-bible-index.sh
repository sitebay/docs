#!/usr/bin/env bash
# Existing stdout behavior is retained. --write and --check are explicit.
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec "${PYTHON:-python3}" "$root/ci/scripts/build-knowledge-index.py" "$@"
