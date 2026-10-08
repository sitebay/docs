import pg from "pg";
import { validateSearch } from "./corpus.mjs";
import { validVector } from "./embeddings.mjs";
const { Pool } = pg;
export class PgStore {
  constructor(memory, { connectionString, embedder = null, pool } = {}) {
    this.memory = memory;
    this.embedder = embedder;
    this.revision = memory.revision;
    this.pool =
      pool ||
      new Pool({
        connectionString,
        max: 4,
        connectionTimeoutMillis: 5000,
        statement_timeout: 5000,
        application_name: "sitebay-docs-reader",
        options: "-c default_transaction_read_only=on",
      });
  }
  async check() {
    const access = await this.pool.query(
      "SELECT has_table_privilege(current_user,'docs_knowledge.chunks','INSERT,UPDATE,DELETE,TRUNCATE') OR has_table_privilege(current_user,'docs_knowledge.snapshots','INSERT,UPDATE,DELETE,TRUNCATE') AS can_write",
    );
    if (access.rows[0]?.can_write)
      throw new Error(
        "The documentation reader role has write privileges; use a SELECT-only role",
      );
    const { rows } = await this.pool.query(
      "SELECT * FROM docs_knowledge.snapshots WHERE revision=$1",
      [this.revision],
    );
    if (rows.length !== 1)
      throw new Error(
        "Documentation database does not contain this corpus revision; import it before serving",
      );
    const row = rows[0];
    if (
      row.document_count !== this.memory.documents.size ||
      row.chunk_count !== this.memory.chunks.length
    )
      throw new Error(
        "Database corpus counts do not match the source snapshot",
      );
    if (
      this.embedder &&
      (row.model !== this.embedder.model ||
        row.dimensions !== this.embedder.dimensions)
    )
      throw new Error(
        "Embedding model or dimensions do not match the indexed snapshot",
      );
    const actual = await this.pool.query(
      "SELECT count(*)::integer AS count FROM docs_knowledge.chunks WHERE revision=$1",
      [this.revision],
    );
    if (actual.rows[0]?.count !== this.memory.chunks.length)
      throw new Error(
        "Database snapshot is incomplete; restore the verified import before serving",
      );
    this.snapshot = row;
  }
  topics() {
    return this.memory.topics();
  }
  list(a) {
    return this.memory.list(a);
  }
  read(a) {
    return this.memory.read(a);
  }
  get documents() {
    return this.memory.documents;
  }
  async search(input) {
    const a = validateSearch(input);
    const mode =
      a.mode === "auto" || !a.mode
        ? this.embedder
          ? "hybrid"
          : "lexical"
        : a.mode;
    if (mode !== "lexical" && !this.embedder)
      throw new Error(
        "Semantic retrieval is not configured; use lexical search or configure a real embedding provider",
      );
    const params = [
      this.revision,
      a.source === "all" ? null : a.source,
      a.topic ?? null,
    ];
    const where =
      "revision=$1 AND ($2::text IS NULL OR namespace=$2) AND ($3::text IS NULL OR topic=$3)";
    const candidates = Math.min(a.limit * 6, 120),
      scores = new Map();
    const add = (rows) =>
      rows.forEach((row, index) => {
        const chunk = this.memory.chunkMap.get(row.id);
        if (
          !chunk ||
          row.content_hash !== chunk.sha256 ||
          row.namespace !== chunk.doc.namespace ||
          row.topic !== chunk.doc.topic
        )
          throw new Error(
            "Database chunk provenance does not match the verified corpus",
          );
        if (
          (a.source !== "all" && chunk.doc.namespace !== a.source) ||
          (a.topic && chunk.doc.topic !== a.topic)
        )
          throw new Error(
            "Database result is outside the requested source scope",
          );
        scores.set(row.id, (scores.get(row.id) || 0) + 1 / (60 + index + 1));
      });
    if (mode !== "semantic") {
      const q = `SELECT id, content_hash, namespace, topic, ts_rank_cd(search,websearch_to_tsquery('english',$4)) AS score
        FROM docs_knowledge.chunks WHERE ${where} AND search @@ websearch_to_tsquery('english',$4)
        ORDER BY score DESC,id LIMIT $5`;
      add((await this.pool.query(q, [...params, a.query, candidates])).rows);
    }
    if (mode !== "lexical") {
      const [vector] = await this.embedder.embed([a.query]);
      validVector(vector, this.embedder.dimensions);
      const q = `SELECT id, content_hash, namespace, topic FROM docs_knowledge.chunks WHERE ${where} AND embedding IS NOT NULL
        ORDER BY embedding <=> $4::vector,id LIMIT $5`;
      add(
        (
          await this.pool.query(q, [
            ...params,
            JSON.stringify(vector),
            candidates,
          ])
        ).rows,
      );
    }
    const seen = new Map(),
      results = [];
    for (const [id, score] of [...scores].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    )) {
      const c = this.memory.chunkMap.get(id);
      if (!c)
        throw new Error(
          "Database returned a chunk absent from the verified corpus",
        );
      if ((seen.get(c.doc.id) || 0) >= 2) continue;
      seen.set(c.doc.id, (seen.get(c.doc.id) || 0) + 1);
      results.push(this.memory.hit(c, score));
      if (results.length >= a.limit) break;
    }
    return {
      mode,
      revision: this.revision,
      embedding_model: mode === "lexical" ? null : this.embedder.model,
      results,
    };
  }
  async close() {
    await this.pool.end();
  }
}
