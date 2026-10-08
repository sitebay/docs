import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { CorpusStore } from './corpus.mjs';
import { embeddingClient, validVector } from './embeddings.mjs';
export async function importCorpus(
  store,
  { connectionString, embedder = null, initialize = false },
) {
  const vectors = [];
  // Embedding is an explicit operator operation, never an MCP tool.
  if (embedder)
    for (let i = 0; i < store.chunks.length; i += 16) {
      const batch = store.chunks
        .slice(i, i + 16)
        .map((c) => `${c.doc.title}\n${c.heading}\n${c.text}`);
      const result = await embedder.embed(batch);
      if (!Array.isArray(result) || result.length !== batch.length)
        throw new Error('Embedding response count mismatch');
      vectors.push(...result.map((v) => validVector(v, embedder.dimensions)));
    }
  const client = new pg.Client({
    connectionString,
    connectionTimeoutMillis: 5000,
    application_name: 'sitebay-docs-import',
  });
  await client.connect();
  try {
    await client.query('BEGIN');
    await client.query("SELECT pg_advisory_xact_lock(hashtext('sitebay-docs-import'))");
    if (initialize)
      await client.query(
        await fs.readFile(new URL('../sql/001-knowledge.sql', import.meta.url), 'utf8'),
      );
    const existing = await client.query(
      'SELECT * FROM docs_knowledge.snapshots WHERE revision=$1',
      [store.revision],
    );
    if (existing.rows.length) {
      const e = existing.rows[0];
      if (e.model !== (embedder?.model ?? null) || e.dimensions !== (embedder?.dimensions ?? null))
        throw new Error(
          'Existing revision uses different embeddings; use a separate database for another model',
        );
      const count = await client.query(
        'SELECT count(*)::integer AS count FROM docs_knowledge.chunks WHERE revision=$1',
        [store.revision],
      );
      if (count.rows[0].count !== store.chunks.length)
        throw new Error('Existing snapshot is incomplete');
      await client.query('ROLLBACK');
      return { status: 'unchanged', revision: store.revision, chunks: store.chunks.length };
    }
    await client.query(
      'INSERT INTO docs_knowledge.snapshots(revision,model,dimensions,document_count,chunk_count) VALUES($1,$2,$3,$4,$5)',
      [
        store.revision,
        embedder?.model ?? null,
        embedder?.dimensions ?? null,
        store.documents.size,
        store.chunks.length,
      ],
    );
    for (let i = 0; i < store.chunks.length; i++) {
      const c = store.chunks[i];
      await client.query(
        `INSERT INTO docs_knowledge.chunks(revision,id,document_id,namespace,topic,title,heading,body,content_hash,embedding)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::vector)`,
        [
          store.revision,
          c.id,
          c.doc.id,
          c.doc.namespace,
          c.doc.topic,
          c.doc.title,
          c.heading,
          c.text,
          c.sha256,
          embedder ? JSON.stringify(vectors[i]) : null,
        ],
      );
    }
    await client.query('COMMIT');
    return {
      status: 'imported',
      revision: store.revision,
      documents: store.documents.size,
      chunks: store.chunks.length,
      model: embedder?.model ?? null,
    };
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    throw error;
  } finally {
    await client.end();
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2),
    flags = new Set(args);
  if (args.some((a) => !['--apply', '--initialize'].includes(a)))
    throw new Error('Usage: node src/import.mjs [--apply] [--initialize]');
  const corpus = await CorpusStore.load(
    process.env.DOCS_CORPUS || new URL('../../public/knowledge/corpus.json', import.meta.url),
  );
  const embedder = embeddingClient();
  if (!flags.has('--apply'))
    console.log(
      JSON.stringify({
        mode: 'dry-run',
        documents: corpus.documents.size,
        chunks: corpus.chunks.length,
        revision: corpus.revision,
        model: embedder?.model ?? null,
        initialize: flags.has('--initialize'),
        writes: false,
      }),
    );
  else {
    if (!process.env.DOCS_IMPORT_DATABASE_URL)
      throw new Error('Set DOCS_IMPORT_DATABASE_URL for the dedicated documentation database');
    console.log(
      JSON.stringify(
        await importCorpus(corpus, {
          connectionString: process.env.DOCS_IMPORT_DATABASE_URL,
          embedder,
          initialize: flags.has('--initialize'),
        }),
      ),
    );
  }
}
