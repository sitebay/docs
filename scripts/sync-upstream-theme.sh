#!/bin/bash
#
# Sync functional improvements from upstream Linode docs theme.
# This pulls theme assets (CSS, JS, layouts, templates) from upstream
# and applies branding replacements (linode → sitebay).
#
# Usage: ./scripts/sync-upstream-theme.sh [--dry-run]
#
# What it syncs:
#   - Theme CSS, JS, layouts, templates, config
#   - Build scripts and CI improvements
#   - Hugo config (non-branding parts)
#
# What it does NOT sync:
#   - Article/guide content (docs/ directory)
#   - Branding (linode references are replaced with sitebay)
#
set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "=== DRY RUN MODE ==="
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

UPSTREAM_REMOTE="upstream"
UPSTREAM_BRANCH="develop"

# Ensure upstream remote exists
if ! git remote get-url "$UPSTREAM_REMOTE" &>/dev/null; then
    echo "Adding upstream remote..."
    git remote add "$UPSTREAM_REMOTE" https://github.com/linode/docs.git
fi

echo "Fetching upstream/$UPSTREAM_BRANCH..."
git fetch "$UPSTREAM_REMOTE" "$UPSTREAM_BRANCH"

# Create a temp branch to work with upstream files
SYNC_BRANCH="upstream-sync-$(date +%Y%m%d-%H%M%S)"
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

echo "Extracting upstream theme files..."

# --- 1. Sync theme (the big one) ---
UPSTREAM_THEME="_vendor/github.com/linode/linode-docs-theme"
LOCAL_THEME="_vendor/github.com/sitebay/sitebay-docs-theme"

# Extract upstream theme to temp dir
git archive "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH" -- "$UPSTREAM_THEME/" | tar -x -C "$TEMP_DIR" 2>/dev/null || true

if [[ -d "$TEMP_DIR/$UPSTREAM_THEME" ]]; then
    echo "Found upstream theme with $(find "$TEMP_DIR/$UPSTREAM_THEME" -type f | wc -l) files"

    # Files/dirs to skip (content that has our own branding/data)
    SKIP_PATTERNS=(
        "content/authors/"
        "content/data/"
        "content/headless/"
        "content/tags/"
        "content/topresults/"
        "content/whatsnew/"
        "content/maintenance/"
        "content/testpages/"
        "static/wptestjson/"
        "i18n/"
    )

    # Build find exclude args
    FIND_EXCLUDES=""
    for pat in "${SKIP_PATTERNS[@]}"; do
        FIND_EXCLUDES="$FIND_EXCLUDES -not -path '*/$pat*'"
    done

    # Sync theme files (CSS, JS, layouts, config, etc.)
    SYNC_DIRS=(
        "assets/css"
        "assets/js"
        "assets/images"
        "layouts"
        "config"
        "tailwind.config.js"
        "postcss.config.js"
        "babel.config.js"
        "package.json"
        "package.hugo.json"
        "config.toml"
    )

    FILES_UPDATED=0
    FILES_SKIPPED=0

    for sync_item in "${SYNC_DIRS[@]}"; do
        src="$TEMP_DIR/$UPSTREAM_THEME/$sync_item"
        dst="$LOCAL_THEME/$sync_item"

        if [[ ! -e "$src" ]]; then
            continue
        fi

        if [[ -d "$src" ]]; then
            find "$src" -type f | while read -r file; do
                rel="${file#$TEMP_DIR/$UPSTREAM_THEME/}"

                # Check skip patterns
                skip=false
                for pat in "${SKIP_PATTERNS[@]}"; do
                    if [[ "$rel" == *"$pat"* ]]; then
                        skip=true
                        break
                    fi
                done
                if $skip; then
                    ((FILES_SKIPPED++)) || true
                    continue
                fi

                target="$LOCAL_THEME/$rel"

                if $DRY_RUN; then
                    if [[ ! -f "$target" ]] || ! diff -q "$file" "$target" &>/dev/null; then
                        echo "  [would update] $rel"
                        ((FILES_UPDATED++)) || true
                    fi
                else
                    mkdir -p "$(dirname "$target")"
                    cp "$file" "$target"
                    ((FILES_UPDATED++)) || true
                fi
            done
        else
            # Single file
            if $DRY_RUN; then
                if [[ ! -f "$dst" ]] || ! diff -q "$src" "$dst" &>/dev/null; then
                    echo "  [would update] $sync_item"
                    ((FILES_UPDATED++)) || true
                fi
            else
                mkdir -p "$(dirname "$dst")"
                cp "$src" "$dst"
                ((FILES_UPDATED++)) || true
            fi
        fi
    done

    echo "Theme: $FILES_UPDATED files synced, $FILES_SKIPPED skipped"

    # --- 2. Apply branding replacements in synced theme files ---
    if ! $DRY_RUN; then
        echo "Applying branding replacements..."

        # Replace linode references with sitebay in text files only
        find "$LOCAL_THEME" -type f \( -name "*.css" -o -name "*.js" -o -name "*.html" -o -name "*.toml" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" \) | while read -r file; do
            if grep -ql 'linode' "$file" 2>/dev/null; then
                # Careful replacements - preserve URLs and package names where needed
                sed -i \
                    -e 's|github\.com/linode/linode-docs-theme|github.com/sitebay/sitebay-docs-theme|g' \
                    -e 's|github\.com/linode/linode-api-docs|github.com/sitebay/sitebay-api-docs|g' \
                    -e 's|github\.com/linode/linode-website-partials|github.com/sitebay/sitebay-website-partials|g' \
                    -e 's|linode-docs-theme|sitebay-docs-theme|g' \
                    -e 's|linode-documentation|sitebay-documentation|g' \
                    -e 's|Linode Docs|SiteBay Docs|g' \
                    -e 's|Linode docs|SiteBay docs|g' \
                    -e 's|linode\.com/docs|sitebay.org/docs|g' \
                    "$file"
            fi
        done
        echo "Branding replacements applied."
    fi
else
    echo "WARNING: Could not extract upstream theme"
fi

# --- 3. Sync build scripts (selective) ---
echo ""
echo "Syncing build scripts..."
for script_file in ci/blueberry.py ci/check-links.py ci/yaml_rules.json ci/vale/dictionary.txt; do
    git show "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH:$script_file" > "$TEMP_DIR/script_file" 2>/dev/null || continue
    if $DRY_RUN; then
        if [[ ! -f "$script_file" ]] || ! diff -q "$TEMP_DIR/script_file" "$script_file" &>/dev/null; then
            echo "  [would update] $script_file"
        fi
    else
        mkdir -p "$(dirname "$script_file")"
        cp "$TEMP_DIR/script_file" "$script_file"
        echo "  Updated $script_file"
    fi
done

# --- 4. Sync Go scripts ---
for go_dir in scripts/clean_linode_sections_index scripts/download_algolia_settings scripts/init_algolia_indices scripts/update_linode_docs_search_indices; do
    if git ls-tree "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH" -- "$go_dir/" &>/dev/null; then
        if $DRY_RUN; then
            echo "  [would sync] $go_dir/"
        else
            mkdir -p "$go_dir"
            git archive "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH" -- "$go_dir/" | tar -x 2>/dev/null || true
            echo "  Synced $go_dir/"
        fi
    fi
done

echo ""
echo "=== Sync complete ==="
if $DRY_RUN; then
    echo "Run without --dry-run to apply changes."
else
    echo "Review changes with: git diff --stat"
    echo "Then commit with a message like: 'Sync upstream theme improvements ($(date +%Y-%m-%d))'"
fi
