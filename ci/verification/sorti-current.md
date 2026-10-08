# Current Sorti articles and documentation database setup

Reviewed October 8, 2026. Tested code: `694b721937b1436e76a0e8c231946420f15ae2a1`.
The subsequent receipt commit contains verification records only.

## Database ownership

The optional documentation PostgreSQL/pgvector backend belongs to the
`sitebay/docs` reader service. The existing MCP connection path does not require
pgvector implementation changes in `~/sitebay` or `~/sorti`. Browser Pagefind
search and the in-memory lexical reader do not require PostgreSQL.

For database-backed retrieval, an operator still provisions the dedicated docs
database and extension, separate import and read roles, and corpus import. A
real embedding model is needed only for semantic/hybrid retrieval. The reader
and importer must agree on the model, dimensions, and corpus revision. Running
the HTTP reader persistently also needs its own token and an approved reachable
HTTPS deployment for remote clients. These are configuration and activation
steps, not completed production changes.

## Article changes

Added 7 guides and landing pages:

- SiteClaw is now Sorti — `articles/sorti/siteclaw-to-sorti.md`
- Inspect missions and handle approvals — `articles/sorti/missions-and-approvals.md`
- Use skills and shared collections — `articles/sorti/skills-and-collections.md`
- Work with your site in Sorti — `articles/sorti/work-with-your-site.md`
- Choose the right MCP connection — `articles/sorti/connect-mcp-services.md`
- Where the documentation database belongs — `articles/knowledge/service-ownership.md`
- Sorti assistant — `articles/products/sorti/_index.md`

Updated 13 existing Markdown pages and two editable SVG labels.
The changes cover onboarding, applications, site state and available actions,
missions and original approvals, shared skill collections, current MCP
connection types, and docs database ownership. The pgvector guide now includes
role separation, identity checks, SELECT grants, import commands, model
configuration, and reader verification.

The former SiteClaw product guides moved to `articles/products/sorti/`.
Five expected old routes are checked against their generated Hugo alias pages
and new destinations. Real identifiers such as `sitebay.roomName`,
`sitebay.serverUrl`, `ExternalSignal`, and `git_changed` remain unchanged.
Historical explanations, old aliases, and the rename guide intentionally retain
the old product name.

The current pass reviewed 19 specific source files in the Sorti and
SiteBay checkouts. Their paths, revisions, hashes, and dirty-file status are
recorded without copying private source bytes. Those file hashes were unchanged
at completion. Unchanged articles retain their earlier review records; this is
not a claim that every customer deployment has the current implementation.

## Verification

| Check | Result |
| --- | --- |
| Maintained Markdown sources | 363 |
| Hugo build | 625 generated pages |
| Public corpus and Pagefind | 340 documents; 1273 source-line chunks |
| Combined original Linode library | 2794 documents; 26494 chunks |
| Article review, editorial, spelling | Zero findings |
| Internal links and fragments | 1618 checked; zero issues |
| Legacy route expectations | 5 passed |
| Python tests | 40 passed |
| Publishing Node tests | 4 passed |
| Knowledge service tests | 11 passed |
| Real PostgreSQL/pgvector | 13 integration assertions passed |
| Actual Sorti BYO client | Discovery, read-only tool roster, cited reads, resources and rejected writes passed |
| SiteBay task retrieval | 19/19 cases passed |
| Combined-library task retrieval | 23/23 cases passed |
| Browser route coverage | 340/340 |
| Responsive layouts | 24 cases at 320px and 1440px |
| Browser errors and missing local assets | Zero |
| API, Forge, and curated index checks | Passed |

The final checkout remained clean. Dependencies were freshly installed for the
clean-clone verification and did not change in the final prose clarification;
all suites, generation checks, retrieval, and browser checks were repeated on
that final code. Earlier failed metadata-format checks remain in local evidence
and were corrected rather than waived.

Browser search uses real local Pagefind. Unrelated browser embeds are fixtures.
Database tests use real disposable PostgreSQL and deterministic fixture vectors,
not a production model-quality benchmark. No live client session, database,
customer site, Algolia index, or production deployment changed.

## Read and reproduce

Use `articles/knowledge/service-ownership.md`,
`articles/knowledge/pgvector.md`, and `knowledge/README.md` for configuration.
`ci/README.md` documents the build and validation commands. The companion JSON
receipt stores detailed results and source fingerprints.

Main remains on the requested rollback. The review branch can be inspected
without merging it or publishing the site.
