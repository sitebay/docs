// Explicit opt-in disposable database test. Never use a production connection.
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import pg from "pg";
import { CorpusStore } from "../src/corpus.mjs";
import { PgStore } from "../src/pg-store.mjs";
import { importCorpus } from "../src/import.mjs";
import { fixture } from "./fixture.mjs";
const owner = process.env.DOCS_TEST_OWNER_URL,
  reader = process.env.DOCS_TEST_READER_URL;
if (!owner || !reader)
  throw new Error("Use test-postgres.sh to create an isolated test database");
const store = new CorpusStore(fixture());
// Known vectors test retrieval mechanics, not a model's semantic quality.
const embedder = {
  model: "deterministic-test-fixture",
  dimensions: 3,
  async embed(texts) {
    return texts.map((t) =>
      /vector|database|PostgreSQL/i.test(t)
        ? [0, 1, 0]
        : /Akamai/i.test(t)
          ? [0, 0, 1]
          : [1, 0, 0],
    );
  },
};
const result = await importCorpus(store, {
  connectionString: owner,
  embedder,
  initialize: true,
});
assert.equal(result.status, "imported");
assert.equal(
  (await importCorpus(store, { connectionString: owner, embedder })).status,
  "unchanged",
);
const broken = new CorpusStore(fixture());
broken.revision = "broken-import-transaction";
broken.chunks = broken.chunks.map((c, i) =>
  i === 1 ? { ...c, doc: { ...c.doc, namespace: "invalid" } } : c,
);
await assert.rejects(
  importCorpus(broken, { connectionString: owner, embedder }),
);
const admin = new pg.Client({ connectionString: owner });
await admin.connect();
assert.equal(
  (
    await admin.query(
      "SELECT count(*)::integer AS count FROM docs_knowledge.snapshots WHERE revision=$1",
      [broken.revision],
    )
  ).rows[0].count,
  0,
);
const privileged = new PgStore(store, { connectionString: owner, embedder });
try {
  await assert.rejects(privileged.check(), /write privileges/);
} finally {
  await privileged.close();
}
try {
  await admin.query(
    "CREATE ROLE docs_test_reader LOGIN PASSWORD 'disposable-reader-only'",
  );
  await admin.query("GRANT USAGE ON SCHEMA docs_knowledge TO docs_test_reader");
  await admin.query(
    "GRANT SELECT ON ALL TABLES IN SCHEMA docs_knowledge TO docs_test_reader",
  );
} finally {
  await admin.end();
}
const db = new PgStore(store, { connectionString: reader, embedder });
const checks = [
  "failed import rolled back snapshot and chunks",
  "over-privileged reader rejected",
];
try {
  await db.check();
  checks.push("snapshot model, dimension and counts matched");
  assert.equal(
    (await db.search({ query: "pgvector", mode: "lexical" })).results[0].title,
    "pgvector retrieval",
  );
  checks.push("PostgreSQL full-text retrieval");
  assert.equal(
    (await db.search({ query: "database vectors", mode: "semantic" }))
      .results[0].title,
    "pgvector retrieval",
  );
  checks.push("real pgvector cosine ordering");
  assert.equal(
    (await db.search({ query: "database vectors", mode: "hybrid" })).results[0]
      .title,
    "pgvector retrieval",
  );
  checks.push("hybrid rank fusion");
  assert(
    (await db.search({ query: "Akamai", source: "sitebay", mode: "lexical" }))
      .results.length === 0,
  );
  checks.push("source boundary retained");
  assert(
    (
      await db.search({
        query: "' OR 1=1; DELETE FROM docs_knowledge.chunks; --",
        mode: "lexical",
      })
    ).results.length === 0,
  );
  checks.push("query text remains a parameter");
  await assert.rejects(db.pool.query("DELETE FROM docs_knowledge.chunks"));
  checks.push("reader refuses writes");
  const privileges = await db.pool.query(
    "SELECT has_table_privilege(current_user,'docs_knowledge.chunks','INSERT,UPDATE,DELETE') AS can_write",
  );
  assert.equal(privileges.rows[0].can_write, false);
  checks.push("SELECT-only role, independently of session read-only");
  await assert.rejects(
    new PgStore(store, {
      pool: db.pool,
      embedder: { ...embedder, model: "wrong-model" },
    }).check(),
  );
  checks.push("model mismatch fails closed");
  const count = await db.pool.query(
    "SELECT count(*)::integer AS count FROM docs_knowledge.chunks",
  );
  assert.equal(count.rows[0].count, 3);
  const tamper = new pg.Client({ connectionString: owner });
  await tamper.connect();
  try {
    const chunk = store.chunks.find(
      (c) => c.doc.title === "pgvector retrieval",
    );
    await tamper.query(
      "UPDATE docs_knowledge.chunks SET content_hash=$1 WHERE revision=$2 AND id=$3",
      ["altered", store.revision, chunk.id],
    );
    await assert.rejects(
      db.search({ query: "pgvector", mode: "lexical" }),
      /provenance/,
    );
    await tamper.query(
      "UPDATE docs_knowledge.chunks SET content_hash=$1 WHERE revision=$2 AND id=$3",
      [chunk.sha256, store.revision, chunk.id],
    );
    checks.push("tampered database chunk rejected against source hash");
    await tamper.query(
      "DELETE FROM docs_knowledge.chunks WHERE revision=$1 AND id=$2",
      [store.revision, chunk.id],
    );
    await assert.rejects(db.check(), /incomplete/);
    checks.push(
      "missing database row rejected even when snapshot metadata still matches",
    );
  } finally {
    await tamper.end();
  }
} finally {
  await db.close();
}
const report = {
  passed: true,
  postgres: "17",
  extension: "pgvector",
  checks,
  scope:
    "Disposable real database with deterministic fixture embeddings. No customer data and no semantic quality claim.",
};
if (process.env.DOCS_TEST_REPORT)
  await fs.writeFile(
    process.env.DOCS_TEST_REPORT,
    JSON.stringify(report, null, 2) + "\n",
  );
console.log(JSON.stringify(report));
