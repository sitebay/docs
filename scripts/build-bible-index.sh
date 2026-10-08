#!/bin/bash
#
# Build a JSON index of all "bible" (source-of-truth) articles.
# These are articles with `bible: true` in their frontmatter.
#
# Output: articles/bible-index.json
#   - Used by sitebay-mcp to serve curated knowledge
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

OUTPUT="$REPO_ROOT/articles/bible-index.json"

echo "["

first=true
grep -rl '^bible: true' articles/ | sort | while read -r file; do
    # Extract frontmatter
    title=$(sed -n '/^---$/,/^---$/{ /^title:/{ s/^title: *//; s/^["'"'"']//; s/["'"'"']$//; p; q; } }' "$file")
    description=$(sed -n '/^---$/,/^---$/{ /^description:/{ s/^description: *//; s/^["'"'"']//; s/["'"'"']$//; p; q; } }' "$file")
    slug=$(sed -n '/^---$/,/^---$/{ /^slug:/{ s/^slug: *//; s/^["'"'"']//; s/["'"'"']$//; p; q; } }' "$file")

    # Derive a URL-friendly path
    rel_path="${file#articles/}"
    rel_path="${rel_path%/index.md}"
    rel_path="${rel_path%.md}"

    if ! $first; then echo ","; fi
    first=false

    # Output JSON object (content is the full markdown body after frontmatter)
    body=$(sed '1,/^---$/d; 1,/^---$/d' "$file")

    # Escape JSON strings
    title_json=$(echo "$title" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().strip()))')
    desc_json=$(echo "$description" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().strip()))')
    body_json=$(echo "$body" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().strip()))')
    path_json=$(echo "$rel_path" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().strip()))')

    echo "  {"
    echo "    \"title\": $title_json,"
    echo "    \"description\": $desc_json,"
    echo "    \"path\": $path_json,"
    echo "    \"file\": \"$file\","
    echo "    \"content\": $body_json"
    echo -n "  }"
done

echo ""
echo "]"
