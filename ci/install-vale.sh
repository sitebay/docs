#!/usr/bin/env bash
# Pinned Linux x86_64 spelling tool; reject an unexpected artifact.
set -euo pipefail
[[ "$(uname -s)" == Linux && "$(uname -m)" == x86_64 ]] || { echo 'Install Vale 3.9.5 for your platform.' >&2; exit 2; }
destination="${1:-.cache/tools}"
mkdir -p "$destination"
temp="$(mktemp -d)"
trap 'rm -rf -- "$temp"' EXIT
url='https://github.com/vale-cli/vale/releases/download/v3.9.5/vale_3.9.5_Linux_64-bit.tar.gz'
curl --fail --location --silent --show-error --retry 2 "$url" -o "$temp/vale.tar.gz"
printf '%s  %s\n' '774c034771f990e25fdbb4f940213423f2563b8df99ec31a296643e0872324cb' "$temp/vale.tar.gz" | sha256sum --check --status
tar -xzf "$temp/vale.tar.gz" -C "$temp" vale
install -m 0755 "$temp/vale" "$destination/vale"
"$destination/vale" --version
