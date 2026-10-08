# Contributing to SiteBay documentation

Write for someone completing one task. Lead with the outcome, name the required
access and target, give the procedure, and explain how to verify the result.
The [writing standard](articles/docs-style.md) applies throughout the library.

## Prepare a review branch

Work from the intended base revision in a separate branch. Preserve other
contributors' changes. During the current publication hold, continue the open
refresh branch rather than restoring its incomplete predecessor on `main`.

Use Hugo **0.139.0**, Node **22**, Python **3.12 or later**, Go **1.22**, and
Vale **3.9.5**, as configured in [ci/README.md](ci/README.md). Docker is needed
only for the disposable PostgreSQL integration test. The normal reader does
not require a database.

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm --prefix knowledge ci --ignore-scripts --no-audit --no-fund
python3 -m pip install -r ci/requirements-publishing.txt
npm run build:docs
```

`HUGO_BIN` and `PYTHON` select explicit local executables. Do not install tools
or change permissions in another application's checkout to build this site.

## Edit the source

Edit Markdown under `articles/`, not generated HTML in `docs/` or `public/`.
An individual article bundle uses `index.md`; a section with child pages uses
`_index.md`. Keep established slugs and aliases when changing a title. Use Hugo
page references for internal links and bundle-relative paths for images.

Preserve authors and licenses. State what the source supports, distinguish
historical media from current instructions, and verify product-specific claims
against the owning code. External examples must retain their provider scope.
Do not turn pricing, availability, or recovery assumptions into guarantees.

Every article needs `doc_sources` and an entry in `ci/content-review.json`.
`ci/source-registry.json` records the supporting source files or primary
references. Review the changed prose before updating a hash; hashes detect
unreviewed changes but cannot prove factual correctness.

## Test the complete output

```sh
python3 -m unittest discover -s ci/tests -v
node --test ci/tests/*.test.mjs
npm --prefix knowledge test
npm run build:docs
python3 ci/check-links.py --public-dir public --report .cache/publishing.json
python3 ci/content_review.py --report .cache/review.json
python3 ci/editorial.py --report .cache/editorial.json
bash ci/install-vale.sh .cache/tools
python3 ci/check-spelling.py --vale .cache/tools/vale --report .cache/spelling.json
npx playwright install chromium
bash ci/browser-all.sh public .cache/browser
```

The browser check serves the built site under `/docs/`, opens every authored
route, and exercises real Pagefind search, result clicks, section filters,
keyboard controls, and reading with JavaScript disabled. Its screenshots and
reports are saved under `.cache/browser/`. Unlike the retired setup, local
search includes local changes after a complete build.

Run `bash knowledge/tests/test-postgres.sh` when changing database retrieval.
The script creates a labelled disposable database and removes only that
container. Use the real Sorti client test in `knowledge/README.md` for changes
to the MCP compatibility interface. Neither test activates a live session.

## Submit

Inspect `git diff` and `git status`, stage only the intended files, commit, and
push the review branch. Include the source basis, checks performed, and any
unverified operational behavior in the pull request. Generated corpora, private
source snapshots, credentials, database files, and build output do not belong in
Git.

GitHub Actions runs the current checks and uploads artifacts. Merging, releasing,
deploying, and importing a database snapshot are separate actions. Do not run
retired scripts in `ci/legacy-workflows/` as a shortcut to publishing.
