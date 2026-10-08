-- Run only against the dedicated documentation database, with migration ownership.
-- The MCP process uses a different SELECT-only role and cannot run this migration.
CREATE EXTENSION IF NOT EXISTS vector;
CREATE SCHEMA IF NOT EXISTS docs_knowledge;
CREATE TABLE IF NOT EXISTS docs_knowledge.snapshots (
  revision text PRIMARY KEY,
  model text,
  dimensions integer CHECK (dimensions BETWEEN 1 AND 2000),
  document_count integer NOT NULL,
  chunk_count integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((model IS NULL) = (dimensions IS NULL))
);
CREATE TABLE IF NOT EXISTS docs_knowledge.chunks (
  revision text NOT NULL REFERENCES docs_knowledge.snapshots(revision) ON DELETE CASCADE,
  id text NOT NULL,
  document_id text NOT NULL,
  namespace text NOT NULL CHECK (namespace IN ('sitebay', 'linode')),
  topic text NOT NULL,
  title text NOT NULL,
  heading text NOT NULL,
  body text NOT NULL,
  content_hash text NOT NULL,
  embedding vector,
  search tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', title || ' ' || heading), 'A') ||
    setweight(to_tsvector('english', body), 'B')
  ) STORED,
  PRIMARY KEY (revision, id)
);
CREATE INDEX IF NOT EXISTS chunks_search ON docs_knowledge.chunks USING gin(search);
CREATE INDEX IF NOT EXISTS chunks_scope ON docs_knowledge.chunks(revision, namespace, topic);
-- No automatic DROP, role grants, production migration, or old-snapshot deletion.
-- Exact vector search is the default. Size an ANN index after measuring the corpus.
