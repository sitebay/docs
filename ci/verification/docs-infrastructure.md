# Documentation database infrastructure and articles

Verified October 8, 2026. Tested docs commit: `9b38a5b5633db2b39a6e1941e6ca512725f77001`.
Infrastructure commit: `34eff661f3f1e04b96024ad23f5de154ffa714af`. The following receipt commit changes
verification records only. The infrastructure is prepared and tested locally,
not applied to the live cluster.

## Infrastructure placement

The new standalone Pulumi project is present at
`~/pulumi-aks/docs-knowledge/`. Its 15 files match the committed isolated
clone at `/home/bitnami/sitebay-docs-fix-xor8kM/docs-infra-20261008/infra`. The original infrastructure checkout's 148
pre-existing changed paths were fingerprinted and left unchanged at placement.
Final-check drift in those paths: 0. This project never imports the
parent platform stack or changes the customer/PostHog database.

The branch is `feat/docs-knowledge-infrastructure`. Its GitLab SSH push failed
with public-key authentication denied; noninteractive HTTPS also lacked
credentials. The commit and a portable patch remain in the local working area.
No remotely published infrastructure branch is claimed.

The checked infrastructure instructions reserve `pulumi up` and deployment
rollouts for the owner. The configured Kubernetes credentials were not readable
in this session. No alternate credentials, permission workaround, or cluster
mutation was attempted. Live admission, storage capacity, existing Cilium
policies, operator reconciliation, and ingress acceptance remain unverified.

## Prepared resource set

The default database is `docs_knowledge` in a dedicated `docs-knowledge`
namespace, with CloudNativePG cluster `docs-postgres`, one instance and 10Gi
storage. This is an index that can be rebuilt, not HA or an off-cluster backup.
The pinned standard PostgreSQL image was pulled and inspected: PostgreSQL 17.11
and the pgvector 0.8.6 extension are present. An existing compatible CNPG
operator is required; this project does not install or upgrade it.

Separate managed `docs_importer` and `docs_reader` roles prevent the running
reader from receiving import credentials. Bootstrap grants default SELECT
access on future importer-owned tables. Database connections in the manifest
use the operator CA with TLS hostname verification. Cluster TLS/reconciliation
was not exercised by the disposable database tests.

Optional reader mode adds a revision-addressed, one-shot import Job, then a
non-root container with a read-only root filesystem, probes, ClusterIP Service,
and scoped network policies. Optional ingress routes both discovery and MCP;
DNS and certificates are not invented. Image pulls, client selectors, secret
values and any public hostname are explicit owner configuration.

The same reader image can use keyword retrieval without an embedding model.
Optional semantic retrieval needs an approved HTTPS embedding endpoint, model,
dimensions, and scoped egress. Model installation and real relevance evaluation
are separate from this infrastructure definition.

## Reader packaging and tests

The image context copies only reader source, SQL, package locks, and the
explicitly selected validated corpus. `DOCS_EXPECTED_CORPUS_REVISION` rejects a
mismatch before a database or embedding request. The default HTTP bind remains
loopback; container binding to all interfaces requires exact allowed hosts and
the existing token checks. `/readyz` checks the selected database store;
`/healthz` is liveness. Neither probe evaluates a real embedding model.

A local Docker build and 8 container acceptance checks
passed. The actual image was run non-root with a read-only root filesystem,
capabilities removed, and no importer credential. It served the packaged
revision, refused unauthorized requests, discovered the four read-only tools,
retrieved a new article with committed line citations, and rejected a mutation
and an incorrect expected revision. This local image was not published to a
registry or run on Kubernetes.

## Articles

Four new guides:

- Deploy the documentation reader with Pulumi.
- Update and recover a documentation snapshot.
- Troubleshoot documentation search and MCP reads.
- Use documentation during a Sorti task.

Six existing guide/entry-point pages were updated to connect these procedures
and clarify infrastructure ownership and local versus container binding.
The older SiteClaw redirect checks remain intact. The original upstream
reference library remains separate from the public website artifact.

## Verification

| Check | Result |
| --- | --- |
| Maintained Markdown sources | 367 |
| Hugo build | 629 generated pages |
| Public corpus and Pagefind | 344 documents; 1300 chunks |
| Combined original library | 2798 documents; 26521 chunks |
| Article review, editorial, spelling | Zero findings |
| Internal links and fragments | 1656 checked; zero issues |
| Legacy redirect expectations | 5 passed |
| Python regression tests | 40 passed |
| Publishing Node tests | 4 passed |
| Reader Node tests | 15 passed |
| Real PostgreSQL/pgvector assertions | 13 passed |
| New bootstrap/role integration checks | 6 passed |
| Infrastructure manifest unit tests | 13 passed |
| Actual Pulumi constructors with mock RPCs | 14 resources passed |
| CNPG 1.28 structural OpenAPI | Passed; live/CEL admission not tested |
| Actual Sorti BYO client | Passed |
| SiteBay lexical task retrieval | 23/23 |
| Combined-library task retrieval | 27/27 |
| Browser page coverage | 344/344 |
| Mobile/desktop layout cases | 28 |
| Browser errors and missing local assets | Zero |
| API, Forge and curated index generation | Passed |

The first clean run found an API source-fingerprint change. All 163 selected
public operation records were compared and were unchanged; only the source
fingerprint was refreshed. The failed receipt is retained, and all checks were
rerun afterward. No check was converted into an allowance.

Dependencies were freshly installed in the clean clone; the final follow-up
only changed metadata and did not change dependency locks. Database tests use
an actual disposable PostgreSQL server and deterministic vectors, not a semantic
model benchmark. Browser Pagefind is real; unrelated external embeds are
fixtures. None of these checks establishes that a production cluster or client
has been activated.

## Operator entry point

Start at `~/pulumi-aks/docs-knowledge/README.md`, not the parent infrastructure
program. Configure the reviewed Kubernetes context, storage/operator/client
selectors and independent secrets; preview the isolated project. The owner
performs apply after review. Publish the tested reader image to an approved
registry and use its manifest digest and packaged corpus revision for reader
mode. Public HTTPS, model setup, and a live Sorti connection have their own
acceptance checks.

Docs `main` remains on rollback `f57e17c`. No website deployment, production
migration, Algolia write, or live Sorti session change was performed.
