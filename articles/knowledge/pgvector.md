---
title: Use pgvector for documentation retrieval
description: Import a fixed documentation snapshot and query it with a separate read-only PostgreSQL role.
slug: pgvector
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- use pgvector for documentation retrieval
- sitebay documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-knowledge
- pgvector-primary
- ollama-embeddings
- sorti-byo
---

Use pgvector when the documentation reader needs database-backed or semantic retrieval. Browser Pagefind search and the in-memory MCP reader work without it. The reader belongs to `sitebay/docs`; no pgvector code change in `~/sorti` or `~/sitebay` is required for the existing connection path.

## Prepare the dedicated database

Install pgvector on the PostgreSQL server, then enable `vector` in the documentation database. A database administrator must handle any extension permissions the import role does not have. [CREATE EXTENSION](https://www.postgresql.org/docs/current/sql-createextension.html) is database-specific; installing a server package alone does not enable the type in every database.

Keep this database separate from SiteBay, WordPress, and PostHog application databases. Provision two roles: an import role that owns the documentation schema and a reader role with no write privileges or ownership. Keep their credentials in the service's secret configuration.

Before a migration, confirm the connection with the intended database administrator:

```sql
SELECT current_database(), current_user;
SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';
```

`knowledge/sql/001-knowledge.sql` creates `docs_knowledge.snapshots`, `docs_knowledge.chunks`, the full-text index, and a vector column. It does not create login roles or configure their credentials. The extension must already be available to the server before this migration runs.

## Choose lexical or semantic import

For database-backed lexical search, leave the embedding settings unset. For semantic search, choose and install an embedding model before importing the snapshot. The adapter accepts an [Ollama embedding endpoint](https://docs.ollama.com/api/embed), such as a local `/api/embed` service.

Set `DOCS_EMBED_URL`, `DOCS_EMBED_MODEL`, and `DOCS_EMBED_DIMENSIONS` for both the importer and reader. The actual model output must match the configured dimensions. The supported range in this reader is 1–2000 dimensions; setting a number does not make an incompatible model support it.

The importer does not install or download a model. It sends document text to the configured provider during an explicit import; the reader sends search text during semantic or hybrid queries. Remote embedding export requires `DOCS_ALLOW_REMOTE_EMBEDDINGS=true` and a non-local HTTPS endpoint. Use `DOCS_EMBED_TOKEN` only when the provider requires authentication.

Choose the mode before the first import. A snapshot imported without embeddings cannot be silently overwritten with a different model later. The current implementation requires a separate database for a different embedding model, including a change from no model to a model for the same corpus revision.

## Build and import a snapshot

Run the build from the documentation checkout:

```sh
npm run build:docs
node knowledge/src/import.mjs
```

The second command is a preview: it reports the revision and counts without opening a database connection or generating embeddings. `DOCS_CORPUS` selects another generated corpus, including a separate combined reference library. Do not substitute an arbitrary directory or live database for that file.

Load `DOCS_IMPORT_DATABASE_URL` from the dedicated import secret, confirm its database identity, then initialize and import:

```sh
node knowledge/src/import.mjs --apply --initialize
```

Use the import role, not the eventual reader role. When the extension has been provisioned by an administrator, the migration can use that existing extension. The import role still needs permission to create and own the documentation schema and tables.

The importer commits a complete snapshot in one transaction. A failed import does not publish a partial snapshot. Reimporting an unchanged revision with the same model leaves the stored snapshot unchanged. A new documentation snapshot needs its own import before a database-backed reader can serve it.

## Grant only the reader access

After schema creation, the schema owner or database administrator grants access to the separately provisioned reader. These examples assume the role is named `docs_reader`:

```sql
GRANT USAGE ON SCHEMA docs_knowledge TO docs_reader;
GRANT SELECT ON TABLE docs_knowledge.snapshots,
  docs_knowledge.chunks TO docs_reader;
```

The reader also needs permission to connect to the dedicated database. Do not make it a superuser, schema owner, or member of the writer role. PostgreSQL privileges are additive: [a SELECT grant](https://www.postgresql.org/docs/current/sql-grant.html) does not remove existing direct, inherited, or public write privileges.

From the reader connection, check both tables:

```sql
SELECT has_table_privilege(current_user,
  'docs_knowledge.snapshots', 'INSERT,UPDATE,DELETE,TRUNCATE')
  AS can_write_snapshots;
SELECT has_table_privilege(current_user,
  'docs_knowledge.chunks', 'INSERT,UPDATE,DELETE,TRUNCATE')
  AS can_write_chunks;
```

Both results must be false. The reader process also checks these privileges at startup, but a service-level check does not replace proper role provisioning.

## Start and verify the reader

Run the reader with `DOCS_READ_DATABASE_URL` set to the read connection and `DOCS_CORPUS` set to the imported file. Do not include the import credential in the running reader environment. For semantic retrieval, supply the same embedding model and dimensions used during import.

```sh
node knowledge/src/cli.mjs search "How Sorti works"
```

Startup checks the snapshot revision, counts, and configured model. The result reports `lexical` without embeddings, or `hybrid` when embeddings are configured. Explicit `semantic` retrieval uses cosine distance; `hybrid` combines vector and full-text rankings. The database still returns source-filtered passages that are checked against the local corpus.

Evaluate known questions and source citations, not just whether the service returns rows. Deterministic vectors in the regression suite verify database mechanics, not a real model's relevance. Keep the previous corpus and database snapshot during a reader change; old snapshots are not deleted automatically.

For HTTP authentication and Sorti setup, follow [Connect the documentation reader]({{< relref "knowledge/read-with-mcp.md" >}}). The database, persistent reader process, and published website have separate deployment steps; see [service ownership]({{< relref "knowledge/service-ownership.md" >}}).
