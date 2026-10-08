# Agent reading and documentation readiness

Verified October 8, 2026. Tested implementation commit: `ecd938e8fcaf7b70fb385cf10ba62dce5daffb69`.
The following verification commit changes these records only.

## Score and limits

**50/100 before; 90/100 after on our own versioned checklist.** This is not an
industry SEO score, a search engine rating, an external LLM evaluation, or a
probability of being cited. Both artifacts were measured with the same rubric.

| Category | Before | After |
| --- | ---: | ---: |
| Crawl and identity | 20/20 | 20/20 |
| Machine reading | 0/25 | 25/25 |
| Provenance | 10/20 | 20/20 |
| Task usefulness | 20/25 | 25/25 |
| Live validation | 0/10 | 0/10 |

All 90 locally testable points pass. Public delivery earns 0/5 because the six
probed URLs returned HTTP 523. Actual search inclusion and AI citations are
unassessed, earning no verified points out of their five. Unknown evidence is
not a pass. CI checks local regressions rather than claiming to monitor the
public site. The task-summary check covers the six named walkthroughs, not all
350 documents; retrieval uses 29 curated lexical cases, not model answers.

Google's official AI-search documentation says no special AI text file or
schema is required for inclusion. The llms.txt format is a proposal for direct
agent reading, not a ranking guarantee. No fabricated FAQ, rating, citation,
keyword stuffing, or crawler-training opt-in was added.

## Delivered reading paths

The build exports **350 individual rendered Markdown pages** beside their HTML,
with HTML alternate links and a visible Read as Markdown link. A page ending in
`/` receives an `index.md` companion. Shortcodes and API tables come from the
rendered article, without page chrome, navigation or syntax-highlighting line
numbers. Code fences, nested examples, list indentation and headings were
checked against the HTML rather than assumed correct after conversion.

The curated `/docs/llms.txt` is **4,524 bytes**, compared with **72,656 bytes** for
the previous flat index: a 93.8% smaller entry point.
It links selected onboarding, task and connection references. The separate
`/docs/llms-index.txt` remains the complete 350-document navigation index
(75,994 bytes), so content was not discarded to shrink the entry.

`/docs/knowledge/documents.json` maps IDs to canonical/Markdown URLs, hashes,
authors, review dates, source identity, task summaries and **1,346 section line
ranges**. Each range and every exported Markdown hash was checked. Rendered
Markdown has its own coordinates; original source citations remain in the raw
corpus and source links. A generated line number is not an original-source line.
The original upstream Linode library is not included in these public exports.

The Markdown pages total **845,242 bytes**, versus **12,191,848 bytes** for the
corresponding full HTML pages. Median page sizes are 1,906 versus 33,957 bytes.
These are uncompressed byte measurements, not tokenizer or ranking results.

## Article and metadata changes

The six practical walkthroughs have visible Task at a glance sections covering
goal, prerequisites, changes/limits, and verification. Their original procedure
bodies are unchanged. The same four fields appear in the corpus and rendered
manifest; actual `read_doc` handler checks verified all six without changing the
reader implementation. The MCP reading guide explains static discovery and the
difference between rendered and original source coordinates.

The old head-seo and body-structured-data partials were not called by the active
standalone base layout. Page-specific TechArticle/CollectionPage metadata now
runs in that actual layout, with matching titles, canonical URLs, dates, authors
and source references. Author/date/source links are also visible. Metadata is
limited to authored public pages rather than inventing Markdown companions for
vendor-generated author pages. Canonical, sitemap and modified-date checks had
already passed before; this is not a claim that those existing features failed.

## Verification

Fresh root and reader npm dependencies were installed in a clean clone.
The publishing Python environment was installed with the committed pinned
requirements. Results:

| Check | Result |
| --- | --- |
| Python regression tests | 58 passed, including 18 new export/corpus tests |
| Publishing and reader Node tests | 4 and 15 passed |
| Practical example parser/config checks | 4 passed |
| Rendered Markdown / metadata / fidelity | 350 documents passed |
| Manifest section coordinates | 1,346 checked |
| Actual MCP task metadata reads | 6 passed |
| Article review, editorial and spelling | Zero findings across 373 sources |
| Internal links and fragments | 1,714 checked; zero issues |
| Preserved legacy redirects | 5 passed |
| Browser routes | 350/350 passed |
| Narrow/wide layout cases | 40 passed |
| Browser errors and missing local assets | Zero |
| SiteBay and combined-library retrieval | 29/29 and 33/33 passed |
| Hugo build | 635 generated pages |

Negative tests cover mixed upstream exports, noindex leakage, tampered hashes,
invalid metadata, unsafe/symlink paths, duplicate IDs, wrong retrieval revisions,
code-table flattening, nested fences, and false source-line equivalence.
Initial defects in code-table conversion and nested-list code comparison were
repaired and regression-tested. Earlier failed attempts remain outside the
repository in the phase evidence directory. No local check was waived.
Browser tests use actual Pagefind and fixtures for unrelated external embeds.
No new live database or real embedding-model acceptance is implied.

## Public delivery blocker

At **19:46 UTC on October 8, 2026**, the development host again received 523 for
origin `/robots.txt`, the docs homepage, `/docs/llms.txt`, the Sorti section,
`/docs/sitemap.xml`, and the staging-page tutorial. The first probe had the same
result. This is a single-vantage observation, not proof of a worldwide outage.
Cloudflare documents 523 as an origin-reachability error; the specific DNS,
routing or firewall cause was not established here.

Before claiming public AI-search readiness, restore and verify origin delivery,
publish the reviewed artifact, check root robots/CDN access for the intended
search crawlers, and measure actual index coverage/citations. OAI-SearchBot and
GPTBot are separately controlled search and training crawlers; no training
preference was changed by this work. Root robots belongs to the origin owner,
not a `/docs/robots.txt` file. Production Markdown MIME and canonical response
headers remain deployment checks.

Docs main remains at rollback `f57e17c`. No merge, website deploy, DNS/CDN change,
Algolia write, database import, registry publish or live Sorti connection was
performed. The previous deployment image was not rebuilt for this new corpus.

## Reproduce

```sh
npm run build:docs
node knowledge/src/evaluate.mjs --report .cache/retrieval.json
python ci/llm_readiness.py --retrieval-report .cache/retrieval.json \
  --report .cache/llm-readiness.json --check
```

With no live report the remaining ten points are unassessed. The companion JSON
preserves both score reports, initial/final public probes, exact corpus
identities, output statistics and test evidence. Full rubric and deployment
boundaries are documented in `ci/README.md`.

Primary references:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.openai.com/api/docs/bots
- https://llmstxt.org/
- https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-523/
