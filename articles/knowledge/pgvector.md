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
---

Use pgvector when the reader needs semantic retrieval or a database-backed index. The in-memory reader remains available for lexical search.

## Use a dedicated database

Use a documentation database, not the SiteBay customer database. Install the `vector` extension with an authorized migration role. The MCP process needs schema usage and `SELECT` on the documentation tables; it must not use the migration credential.

`knowledge/sql/001-knowledge.sql` creates snapshot and chunk tables, a PostgreSQL full-text index, and a vector column. The importer does not drop old snapshots or create customer resources.

## Import a snapshot

Set `DOCS_CORPUS` to the generated file and `DOCS_IMPORT_DATABASE_URL` to the dedicated writer connection. Preview first:

```sh
node knowledge/src/import.mjs
```

The preview reports the revision and counts without connecting to the database or generating embeddings. Apply the migration and import only to the intended database:

```sh
node knowledge/src/import.mjs --apply --initialize
```

The importer commits a complete snapshot in one transaction. A failure does not publish a partial snapshot. Reimporting the same revision and model leaves the stored snapshot unchanged. Retain old snapshots until readers have moved to the new revision.

## Add real embeddings

The adapter accepts an explicitly configured [Ollama embedding endpoint](https://docs.ollama.com/api/embed). Set `DOCS_EMBED_URL`, `DOCS_EMBED_MODEL`, and `DOCS_EMBED_DIMENSIONS` before importing. Install and evaluate the chosen model separately; the importer does not silently download one.

Use the same model and dimensions for documents and queries. Changing the model requires a separately indexed database in this implementation. Remote embedding export is disabled unless `DOCS_ALLOW_REMOTE_EMBEDDINGS=true`; non-local endpoints also require HTTPS.

No provider means no semantic search. Deterministic vectors in regression tests establish database mechanics, not retrieval quality.

## Start a reader

Set `DOCS_READ_DATABASE_URL` to the reader role and use the same corpus. Startup checks the snapshot revision, counts, model, and dimensions. Queries are parameterized and sessions are read-only. Check the role’s grants separately; connection settings do not replace restricted privileges.

`lexical` uses PostgreSQL full-text search. `semantic` orders matching-source vectors by cosine distance. `hybrid` combines both ranked lists. Exact search is the default. Measure relevance and latency before adding an [approximate pgvector index](https://github.com/pgvector/pgvector).
