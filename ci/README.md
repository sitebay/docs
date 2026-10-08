# Documentation checks

## Build and verify

Use Hugo **0.139.0**, Node **22**, Python **3.12 or later**, Go **1.22**, and
Vale **3.9.5**. Run commands from the repository root.

```sh
npm ci --ignore-scripts --no-audit --no-fund
python -m pip install -r ci/requirements-publishing.txt
python -m unittest discover -s ci/tests -v
node --test ci/tests/*.test.mjs
npm --prefix knowledge ci --ignore-scripts --no-audit --no-fund
npm --prefix knowledge test
bash knowledge/tests/test-postgres.sh
(cd scripts && go test ./internal/searchconfig ./update_linode_docs_search_indices ./init_algolia_indices ./clean_linode_sections_index ./download_algolia_settings)
npm run build:docs
node knowledge/src/evaluate.mjs --report .cache/retrieval.json
python ci/check-links.py --public-dir public --report .cache/publishing.json
python ci/check-redirects.py --public-dir public --report .cache/redirects.json
python ci/content_review.py --report .cache/content-review.json
python ci/editorial.py --report .cache/editorial.json
bash ci/install-vale.sh .cache/tools
python ci/check-spelling.py --vale .cache/tools/vale --report .cache/spelling.json
python ci/scripts/build-knowledge-index.py --check
(cd scripts && go run ./update_linode_docs_search_indices --config ../config.toml --sourcedir ../public --dry-run)
npx playwright install chromium
bash ci/browser-all.sh public .cache/browser
```

The installer verifies the pinned Linux x86_64 Vale archive. On another platform,
install the same version and give its executable to `--vale`. The spelling check
first proves the active rules reject a known misspelling. It then scans every
article. Editorial validation is strict: **there is no baseline allowance**.

`HUGO_BIN`, `PYTHON`, and `PLAYWRIGHT_EXECUTABLE_PATH` select explicit tools for
local verification. The browser suite serves the production export on loopback,
loads every authored page route across three fresh browser processes, and checks
representative narrow and wide layouts. The final coverage report rejects
missing, duplicate, or failed routes. Browser search uses the real Pagefind index. External embeds use fixtures; this is not a live customer-service acceptance test.

## Source and output

`articles/` contains authored Markdown. `public/` is build output; historical
`docs/` files are not an extra content source. Public URLs retain the `/docs/`
prefix. Use Hugo references rather than `/articles/` links.

A section uses `_index.md`; an individual leaf bundle uses `index.md`. Never put
both in one directory. The scanner guide's former section entry is retained as
a headless resource, and its earlier section URL redirects to the real article.

The publishing check validates source discovery, actual Hugo routes, rendered
prose links and fragments, and search coverage for all authored regular pages.
Headless resources are not search results. Product introductions, the homepage,
and section links render without waiting for Algolia.

## Article review records

`content-review.json` records each article's reviewed file hash, original body
hash, source basis, and reason for the change. `source-registry.json` identifies
source files by path and hash, and links to primary provider documentation.
Private source bytes and credentials are not copied into this repository.

Hashes detect drift; they do not prove an assertion is true. Review changed prose
against the named source before updating its record. Add a review record for a
new article, retain attribution and license information, and explain any rename.
Do not refresh a hash merely to silence a failed check.

## Generated references

The API catalog is a selected customer-facing subset of the source contract,
not the complete backend schema. Update it from an authorized OpenAPI snapshot:

```sh
python ci/scripts/sync-api-catalog.py --source /path/to/sitebay-openapi.json
python ci/scripts/sync-api-catalog.py --source /path/to/sitebay-openapi.json --check
SORTI_REPO=/path/to/sorti node ci/scripts/sync-forge-reference.mjs
SORTI_REPO=/path/to/sorti node ci/scripts/sync-forge-reference.mjs --check
python ci/scripts/build-knowledge-index.py --write
```

The Forge reference preserves the canonical skill's technical sections. Its
metadata is retained, and `--check` never writes. The curated knowledge index
uses real Hugo URLs and nonempty article bodies. CI verifies that index from the
available Markdown. The private API/Forge source comparisons are run in the
source-authorized checkout; GitHub CI does not require those private repositories.

## Search and theme updates

The active website uses Pagefind built from the same corpus as the reader.
It does not call Algolia. Legacy index settings and utilities remain for
compatibility and rollback inspection; their `--dry-run` prints destinations
without credentials or writes. They are not the active publication path.

Site-specific templates and assets override vendored defaults. The theme's
website-partials mounts must match the pinned dependency's actual files.
`sync-upstream-theme.sh` preserves configuration, dependencies, content, CI,
index writers, and project overrides. Review its presentation-only diff and run
all checks before accepting an upstream sync.

## Release boundary

The full article refresh stays on its review branch. The temporary rollback on
`main` remains in place until the completed work is explicitly accepted.
A local test pass is not a production deployment, a live API write, or a native
app-store qualification. `NOT_SURE.md` records the remaining operational scope.

## Read-only knowledge service

`npm run build:docs` creates HTML, Pagefind, a source-line corpus, and `llms.txt`
together. `knowledge/README.md` documents MCP, CLI, PostgreSQL roles, optional
embeddings, and the separately pinned Linode reference collection. The old
Algolia-writing workflows are retained under `ci/legacy-workflows/`, not active
Actions. CI uploads the verified website artifact; it does not deploy it.

On hosts with a crowded shared temporary filesystem, set `TMPDIR` to a private
directory on a disk with free space and inodes before browser checks. Do not
delete other processes’ temporary files. Browser errors still fail the check.


## Practical tutorial examples

The optional check below uses a reviewed Sorti checkout to parse the tutorial's
view fragment and complete skill document with the real implementation parsers.
It also checks the editor JSON settings against the extension manifest.

```sh
SORTI_REPO=/path/to/sorti \
  /path/to/sorti/node_modules/.bin/tsx \
  --tsconfig /path/to/sorti/apps/sorti/tsconfig.json \
  ci/scripts/check-practical-examples.mts
```

`EXAMPLE_REPORT` optionally selects a JSON report path. Run from the docs repo;
`DOCS_REPO` can select another documentation checkout. These are pure parser and
configuration checks, not a created panel, an active browser-proxy session, or a
shared-library save. Public CI does not require the private Sorti checkout.

## Agent reading and readiness

`npm run build:docs` now exports rendered Markdown after Hugo and Pagefind.
Each public authored URL ending in `/` has an `index.md` companion. The HTML
head declares that alternate, and the footer exposes it to people. Shortcodes,
relative links, and syntax-highlighted code are resolved from the actual article
region. Navigation and line-number columns are not included in the Markdown.
No external page is fetched by this exporter.

`public/llms.txt` is a curated entry point, not a full-context dump.
`public/llms-index.txt` provides the complete grouped list.
`public/knowledge/documents.json` supplies hashes and section line ranges for
rendered Markdown; `corpus.json` retains the original source and exact raw-source
line coordinates. Never mix those coordinate systems in a citation. The explicit
`task` front matter on the six walkthroughs feeds the visible summary, manifest,
and MCP document metadata. No synthetic FAQ or fabricated ratings are added.

```sh
node knowledge/src/evaluate.mjs --report .cache/retrieval.json
python ci/llm_readiness.py --retrieval-report .cache/retrieval.json \
  --report .cache/llm-readiness.json --check
```

This is **our versioned checklist, not an industry SEO score or probability of
being cited**. Ninety points cover locally testable artifacts. Five require
public delivery evidence; five require actual search/citation measurements.
Unknown checks do not earn points and are explicitly labelled unassessed. CI
fails local regressions; it does not pretend to monitor the public origin.
The page checks use proportions of authored pages, while the task-summary check
covers the six named walkthroughs, not every article. Retrieval cases are curated
lexical regressions, not a benchmark of an external LLM's answer quality.

| Category | Points | What is tested |
| --- | ---: | --- |
| Crawl and identity | 20 | Static text, canonical URLs, sitemap coverage and modified dates |
| Machine reading | 25 | Markdown, discovery links, bounded index, manifest and code/heading fidelity |
| Provenance | 20 | Original hashes, article review records, JSON-LD and visible attribution |
| Task usefulness | 25 | Descriptions, six task summaries, rename redirect and matching-revision retrieval |
| Live validation | 10 | Public delivery and independently measured search inclusion |

The `--live-report` option accepts a read-only probe JSON list of URLs and HTTP
status codes. An HTTP success is only delivery, not indexing. A 5xx response
needs origin/CDN investigation before claims about public search visibility.

The docs deploy under `/docs/`. Root `/robots.txt`, DNS and CDN policy belong
to the origin owner and are **not** configured by writing `/docs/robots.txt`.
Verify access for Googlebot and OAI-SearchBot separately from training-crawler
preferences. This change does not opt the site into training or modify crawler
access. Public `text/markdown` content types and optional canonical HTTP Link
headers need checking in the actual deployment; a local static export cannot
establish those response headers. Deploy a fresh artifact rather than overlaying
an old directory that might retain withdrawn Markdown files.

Primary references: [Google AI search requirements](https://developers.google.com/search/docs/appearance/ai-features),
[OpenAI crawlers](https://developers.openai.com/api/docs/bots), and the
[llms.txt proposal](https://llmstxt.org/). Machine-reading files are useful for
agents consuming the docs, not a special Google inclusion requirement.
