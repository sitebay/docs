# Current Sorti wording and source verification

Verified October 8, 2026. Tested source commit: `5f0edd320157ea3c00730cc4c61d9d718d491ffc`.
The following receipt commit changes these verification records only.

## What was still present

The earlier pass deliberately kept a migration article, former-name references
in introductions and the agent index, and old URL aliases in article front
matter. Two historical generated SVG copies also still used the old label.
Those aliases were part of the raw Markdown returned in the MCP corpus, even
though their purpose was only to keep bookmarks working.

## Current product surfaces

The active reference now uses Sorti only. The case-insensitive guard found
**zero retired-name matches in 1,380 source text files and
1,239 generated text files**. Its coverage includes article
bodies, front matter, paths, HTML, Markdown companions, JSON corpora/manifests,
agent indexes, and editable SVG text. All 350 public document records and their
metadata were checked; the SiteBay subset of the combined reader was checked too.
Compressed binary search shards and raster/video pixels are not text-scanned.
This is not a claim that every historical screenshot has been inspected.

The former migration article is replaced by **Current Sorti workflows**, at
`articles/sorti/current-workflows.md` and `/docs/sorti/current-workflows/`.
It links current site, staging, mission, skill, Forge, editor, MCP and signal
procedures. Product introductions, getting-started text, navigation, task maps,
the curated knowledge export and llms entry point no longer repeat the old name.
9 articles/entry points were updated, and two editable SVG copies
were corrected. Runtime identifiers such as `sitebay.roomName`,
`sitebay.serverUrl`, `git_changed`, and `editor_signal` were not renamed.

## Compatibility is not product copy

Eight former URLs remain accepted through the isolated
`data/legacy-doc-routes.json` map. `ci/legacy_routes.py` generates nonindexable
redirects after the reference export. Their page text and canonical targets use
Sorti; only the old incoming URL retains its spelling. All eight destinations
passed the independent redirect test.

No retired-name compatibility aliases remain in article front matter, so they do not leak
into the raw-source MCP corpus or rendered Markdown. Old identifiers also
remain in tests designed to reject them, historical review records, earlier
verification reports, and Git history. These are not customer-facing product
instructions. This work does not rewrite history or break old bookmarks to
produce an artificial zero count across an entire Git repository.

`ci/current_brand.py` and the publishing workflow reject new active-brand
regressions, including corpus alias leakage. Negative tests also cover real
articles accidentally occupying a redirect path, missing targets, redirect
chains, external destinations, and retired text inside a redirect. Use a fresh
build destination; the generator refuses to overwrite earlier non-redirect
content and does not silently delete another build tree.

## Currentness review

Rechecked **188 source-reference fingerprints across
159 distinct paths** against the current working trees or the
explicitly pinned revisions recorded for historical contributions. Every
reference matched at the final check. The WordPress theme, Shopify theme and
WordPress agent-plugin clones also matched their current remote heads.

The source review found new SiteBay router mounts for shared mission runtime
and Forge domain services. The updated current-workflows and system-map pages
explain their actual limits: shared missions require owner installation; Forge
custom domains require an enabled deployment and installed provider, and domain
publication/DNS actions are owner-reviewed rather than ordinary MCP tools.
A route appearing in source does not mean it is enabled for a customer. The
mission service is not the documentation pgvector database.

The API catalog still matches **163 selected public operation records** from
the current client contract. The generated Forge reference matches its canonical
authoring skill. Those are bounded contract checks, not an exhaustive live API
probe. Historical external-source tutorials retain their declared era and
attribution rather than pretending their old defaults are current universal
recommendations. No third-party pricing, provider version, or deployed feature
is silently certified by a matching source hash.

## Clean-clone results

| Check | Result |
| --- | --- |
| Fresh root and reader npm installations | Passed |
| Python regression tests | 65 passed |
| Publishing / reader Node tests | 4 / 15 passed |
| Article example parser/config checks | 4 passed |
| Maintained article review, editorial, spelling | Zero findings across 373 sources |
| Retired branding in active source/generated text | Zero findings |
| Public authored documents and Markdown companions | 350 |
| Internal links and fragments | 1,720 checked; zero issues |
| Compatibility redirects | 8 passed |
| SiteBay task retrieval | 29/29 |
| Combined-library retrieval | 33/33 |
| Browser authored routes | 350/350 |
| Narrow/wide layout cases | 42 passed |
| Browser exceptions / missing local assets | Zero |
| Source-reference fingerprints | 188/188 matched |

Hugo generated 635 pages; the compatibility step adds the eight
explicit redirect pages separately. The curated agent entry point is
4,493 bytes. Local browser tests exercise the real Pagefind
index; unrelated external embeds use fixtures.

The readiness check passes 90/90 local points under
`sitebay-documentation-llm-readiness-v2`. Version 2 replaces the requirement for
visible migration wording with current-only product identity plus working
compatibility redirects. Weights are unchanged, but this is not a like-for-like
v1 score comparison. Public delivery and external AI citations are not measured
by this run; no search-engine ranking claim is made.

## Publication boundary

The changes are for the review branch. Docs `main` remains on rollback
`f57e17c6ca8c35fdffec479c262301e78ce4101c`; no merge or website deployment was
performed. The Sorti, SiteBay and Pulumi implementation checkouts were only read.
No database import, embedding activation, registry publication, customer site
change, crawler-policy change, or DNS/CDN modification occurred.

Generated local artifacts were refreshed only after validation, with their
previous copies retained outside the repository. The previously prepared reader image has
not been rebuilt or activated for this corpus. Source-grounded documentation is
not proof of which version a particular live service runs.

Reproduction: `ci/README.md`, `ci/current_brand.py`, `ci/check-redirects.py`, and
the standard clean-build commands. The companion JSON stores the exact source
fingerprints, corpus identities, remaining historical matches, and test results.
