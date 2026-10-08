#!/usr/bin/env bash
# Copy upstream presentation candidates, never SiteBay identity or release tools.
# Usage: scripts/sync-upstream-theme.sh [--dry-run] [--ref COMMIT]
# --ref uses an already fetched revision and performs no network requests.
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"
dry_run=false
ref=""
while (($#)); do
    case "$1" in
        --dry-run) dry_run=true; shift ;;
        --ref) [[ $# -ge 2 ]] || { echo '--ref needs a revision' >&2; exit 2; }; ref="$2"; shift 2 ;;
        --help) sed -n '2,4p' "$0"; exit 0 ;;
        *) echo "Unknown argument: $1" >&2; exit 2 ;;
    esac
done
if [[ -z "$ref" ]]; then
    git fetch --no-tags https://github.com/linode/docs.git develop
    ref=FETCH_HEAD
fi
ref="$(git rev-parse --verify --end-of-options "${ref}^{commit}")"
upstream_theme='_vendor/github.com/linode/linode-docs-theme'
local_theme='_vendor/github.com/sitebay/sitebay-docs-theme'
temp_dir="$(mktemp -d)"
trap 'rm -rf -- "$temp_dir"' EXIT
git archive "$ref" -- "$upstream_theme/" | tar -x -C "$temp_dir"
updated=0
skipped=0
while IFS= read -r -d '' source; do
    relative="${source#"$temp_dir/$upstream_theme/"}"
    case "$relative" in
        assets/css/*|assets/js/*|assets/images/*|layouts/*) ;;
        *) skipped=$((skipped + 1)); continue ;;
    esac
    # Local overrides are authoritative. Do not even change their vendor copy.
    if [[ -f "$root/$relative" ]]; then
        skipped=$((skipped + 1)); continue
    fi
    candidate="$temp_dir/candidate"
    case "$relative" in
        *.css|*.js|*.html|*.toml|*.json|*.yaml|*.yml)
            sed \
                -e 's|github\.com/linode/linode-docs-theme|github.com/sitebay/sitebay-docs-theme|g' \
                -e 's|github\.com/linode/linode-api-docs|github.com/sitebay/sitebay-api-docs|g' \
                -e 's|github\.com/linode/linode-website-partials|github.com/sitebay/sitebay-website-partials|g' \
                -e 's|Linode Docs|SiteBay Docs|g' "$source" > "$candidate" ;;
        *) cp -- "$source" "$candidate" ;;
    esac
    target="$local_theme/$relative"
    if [[ -f "$target" ]] && cmp -s -- "$candidate" "$target"; then
        continue
    fi
    updated=$((updated + 1))
    if "$dry_run"; then
        printf '[would update] %s\n' "$relative"
    else
        mkdir -p -- "$(dirname "$target")"
        cp -- "$candidate" "$target"
        printf '[updated] %s\n' "$relative"
    fi
done < <(find "$temp_dir/$upstream_theme" -type f -print0 | sort -z)
printf 'Presentation candidates: %d; protected/non-presentation files skipped: %d\n' "$updated" "$skipped"
printf 'SiteBay config, dependency manifests, CI, index writers and content were not copied.\n'
printf 'Review the diff and run the full publishing checks before committing.\n'
