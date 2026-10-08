# Article refresh — completed verification

Verified in a clean clone of `85ecea44379518d4010ef4d2e05a4b21d3402bc1` on October 8, 2026.
The receipt commit adds verification records only; the tested site tree is
`a2702f2aced53b6651ffdd981d884e16ffd81d5f`.

## Content

All 348 Markdown sources have body changes, including articles, section pages,
and reusable fragments. The source body count changed from 88,421 to 59,338
words. The per-file manifest retains source bases, original-path mappings,
review notes, and content hashes. Canonical Forge detail is generated rather
than rewritten by hand. The API reference contains 163 selected source-derived
operation records.

The complete article set uses task-first introductions, direct instructions,
and consistent headings. Unsupported pricing and availability promises were
replaced by current catalog workflows. Historical media retains attribution
and an explicit historical scope.

## Checks

| Check | Result |
| --- | --- |
| Clean npm installation | Passed |
| Hugo 0.139.0 production build | Passed; 606 generated pages |
| Source review | 348 sources; zero record or source-basis issues |
| Strict editorial checks | Zero findings; the 677-finding allowance is removed |
| Spelling | Zero findings; known-misspelling negative control passed |
| Published internal prose links and fragments | 1,490 checked; zero issues |
| Python regression tests | 30 passed |
| Node regression tests | 4 passed |
| Go configuration tests and admin command compilation | Passed |
| API, Forge, and knowledge-index generation | Matches the reviewed sources |
| Browser route coverage | 325 of 325 authored routes; no skipped or repeated routes |
| Narrow and wide layouts | 14 cases passed at 320px and 1440px |
| Browser exceptions and missing local assets | Zero |
| Navigation click | Passed |

The browser gate runs three disjoint route shards in fresh processes and checks
their combined coverage. It also catches blank reading surfaces, including the
release-note template that was repaired during final verification.

## Publication boundary

The completed candidate incorporates the temporary rollback ancestor without
removing the corrected articles. GitHub `main` remains at `f57e17c6`; this branch
is for review and has not been deployed. External browser services are test
fixtures, not live customer acceptance. See `NOT_SURE.md` for those boundaries
and `ci/README.md` for reproduction commands. Hosted CI is a separate result.
