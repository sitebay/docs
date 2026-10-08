# Documentation publishing checks

## Tested toolchain

Use Hugo **0.139.0**, Node **22**, Python **3.12 or newer**, and Go **1.22**.
The repository's `.nvmrc` pins the Node patch used for local verification.
Run commands from the repository root unless a command changes directory.

```sh
npm ci --ignore-scripts --no-audit --no-fund
python -m pip install -r ci/requirements-publishing.txt
python -m unittest discover -s ci/tests -v
node --test ci/tests/*.test.mjs
(cd scripts && go test ./internal/searchconfig ./update_linode_docs_search_indices ./init_algolia_indices ./clean_linode_sections_index ./download_algolia_settings)
hugo --destination public
python ci/check-links.py --public-dir public --report .cache/publishing.json
python ci/editorial.py --baseline ci/editorial-baseline.json --report .cache/editorial.json
(cd scripts && go run ./update_linode_docs_search_indices --config ../config.toml --sourcedir ../public --dry-run)
npx playwright install chromium
node ci/browser-smoke.cjs public .cache/browser
```

`HUGO_BIN` or `--hugo` may select an explicit Hugo executable. The browser test
accepts `PLAYWRIGHT_EXECUTABLE_PATH` for a separately installed Chromium.
It serves the unchanged production export on loopback and refuses remote side
effects. Its remote-service fixtures are not live Algolia qualification. The
build and link check retain the configured production base URL.

## Source and output are different trees

`articles/` contains authored Markdown. `public/` is the current build output;
`docs/` contains historical generated output, not additional source pages.
The public URL prefix remains `/docs/`. Do not put `/articles/` in hyperlinks.

A directory that contains independently published child articles needs an
`_index.md` section landing page. `index.md` is for an individual leaf bundle.
The four product landing pages use a shared static documentation layout, so
remote search availability cannot hide their introductions or child links.
`expected-pages.json` protects the restored product sections and integration
pages against being silently omitted from Hugo's page inventory.

Publishing validation scans all source Markdown, then checks the real Hugo
page inventory, rendered prose links and fragments, and generated search-index
coverage. It refuses empty discovery and missing output. It does not infer
public URLs from source filenames, and it has no baseline or ignored failures.
External destinations and non-documentation site routes are outside its scope.

## Existing editorial debt remains visible

The old checks inspected generated `docs/` instead of `articles/`. Pointing
those checks at the real content exposed existing metadata/style findings.
`editorial.py` retains the existing Blueberry rules and reports every finding.
Its baseline is recomputed from the immutable, reviewed `f7bc8c1...` commit,
including the two relocated integration pages; it is not an editable count.
CI refuses new findings. Run without `--baseline` to get the strict editorial
result, which remains nonzero until the pre-existing findings are repaired.
This editorial comparison never excuses a publishing or link-check failure.

## Search ownership and theme maintenance

SiteBay's search application and index identities live in root `config.toml`.
The two supported search configuration schemas must agree. The Go utilities
share a loader and refuse mixed identities. `--dry-run` on the index updater
prints its exact destinations without requiring credentials or making writes.
An explicit application override remains available for a reviewed staging
operation; it is not inferred from the upstream theme.

Site-specific templates and CSS live in project `layouts/` and `assets/`, ahead
of vendored defaults. The pinned website-partials dependency stores its files at
its root; the theme module mounts must match that actual layout.

`sync-upstream-theme.sh` copies presentation candidates only. It preserves
site configuration, dependencies, content, CI, index writers and project
layout/asset overrides. Use `--dry-run` first. An explicit `--ref` operates on
an already fetched commit without a network request. A sync is not accepted
until the complete publishing checks pass again.
