# Practical Sorti tutorials

Reviewed October 8, 2026. Tested content commit: `2539d638f1984e798d69184c9b021978696a10a3`.
The subsequent receipt commit changes verification records only.

## Articles

Added six original task tutorials, totaling 4008 body words.

| Article | Source | Body words |
| --- | --- | ---: |
| Fix a page on staging with Sorti | `articles/sorti/fix-a-staging-page.md` | 699 |
| Review a staging release before publishing | `articles/sorti/review-a-staging-release.md` | 592 |
| Create a reusable site-review skill | `articles/sorti/create-a-review-skill.md` | 649 |
| Test localhost with Sorti and the editor bridge | `articles/vscode/test-localhost-with-sorti.md` | 674 |
| Build a counter panel with Forge | `articles/sorti/build-a-counter-panel.md` | 689 |
| Recover an interrupted Sorti task | `articles/sorti/recover-an-interrupted-task.md` | 705 |

The staging tutorial follows a contact-page layout issue through target
selection, preview, persisted source and saved-page verification. The release
review explains live drift, the three separate confirmation fields, original
operation IDs and recovery. The skills tutorial includes a complete SKILL.md
example. The editor tutorial includes actual bridge settings and a headless
Playwright example. The Forge tutorial includes state, a view fragment and
increment/reset reducer programs. The interruption tutorial distinguishes
pending decisions, original control receipts and reviewed continuation.

Three existing entry points link these walkthroughs: the Sorti section, editor
section, and Sorti getting-started page. The curated knowledge export was
regenerated. Six retrieval cases and responsive checks for all new pages were
added; no theme, application backend, database or deployment code was changed.

## Source review

The article claims were checked against 21 implementation files in
Sorti and SiteBay. The companion JSON preserves paths, hashes, checkout commits
and whether the reviewed file had working-tree changes. Those hashes still
matched at completion. Private source bytes were not copied into the docs.
Original example prompts and review procedures are distinguished from exact
configuration names and API fields.

Playwright flags and isolated profiles were checked against its official MCP
README. Extension-host placement and workspace trust were checked against the
VS Code primary documentation. These outside references are separately named
in the article and source registry.

The counter view fragment was accepted by Sorti's primitive parser. The complete
review skill was accepted by the actual library parser. The editor settings
match the extension manifest. The reducer examples match the inspected ops-JSON
contract, but this pass did not create a live panel or invoke its minted tools.
Reproduction is in `ci/scripts/check-practical-examples.mts` and `ci/README.md`.

## Validation

| Check | Result |
| --- | --- |
| Fresh root and reader dependency installs | Passed |
| Hugo build | 635 generated pages |
| Authored Pagefind and MCP documents | 350 |
| Maintained Markdown sources | 373 |
| Review, editorial, spelling | Zero findings |
| Internal links and fragments | 1713 checked; zero issues |
| Preserved legacy redirects | 5 passed |
| Python regression tests | 40 passed |
| Publishing Node tests | 4 passed |
| Reader Node tests | 15 passed |
| Article example parser/config checks | 4 passed |
| SiteBay task retrieval | 29/29 |
| Combined-library task retrieval | 33/33 |
| Browser article routes | 350/350 |
| Responsive viewport cases | 40 at 320px and 1440px |
| Browser errors and missing local assets | Zero |

The combined corpus contains 2804 documents and
26562 source-line chunks, with the original Linode library
still pinned to `fe2349568fa499a229a1a5e370929404d8e76287`. That library remains separate
from the public website artifact.

The final checkout was clean. Browser checks use real Pagefind and fixtures for
unrelated external embeds. The initial optional parser command lacked the app's
TypeScript alias configuration; the corrected command uses the existing app
configuration. Three ordinary-word spelling findings were fixed by rephrasing.
Earlier failed results were retained rather than turned into allowances.

## Publication boundary

This pass writes and verifies documentation. It does not perform a staging
change, promotion, shared-skill save, live browser-proxy connection, or Forge app
creation. Source claims and example parsing are not product deployment tests.
The reader code, PostgreSQL adapter, container image and infrastructure were not
changed, and their previous deployment hold remains in place. New article
content requires a newly built artifact before any later publication.

Docs main remains on the requested rollback. No merge, infrastructure apply,
registry publish, Algolia write, or website deployment was performed.
