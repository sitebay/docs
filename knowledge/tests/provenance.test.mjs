import test from "node:test";
import assert from "node:assert/strict";
import { CorpusStore, corpusRevision } from "../src/corpus.mjs";
import { fixture } from "./fixture.mjs";

test("corpus digest binds metadata as well as source bytes", () => {
  const f = fixture();
  f.documents[0].title = "A different title";
  assert.throws(() => new CorpusStore(f), /revision/);
  f.revision = corpusRevision(f.documents);
  assert.equal(new CorpusStore(f).documents.size, 3);
});

test("external source cannot impersonate SiteBay or substitute a citation", () => {
  for (const mutate of [
    (d) => (d.authority = "sitebay-reference"),
    (d) => (d.namespace = "sitebay"),
    (d) => (d.source.repository = "sitebay/docs"),
    (d) => (d.source.url = "https://example.test/forged"),
    (d) => (d.source.path = "docs/../private.md"),
    (d) => (d.source.revision = null),
    (d) => (d.body_start = 0),
    (d) => delete d.body_start,
  ]) {
    const f = fixture();
    mutate(f.documents[2]);
    f.revision = corpusRevision(f.documents);
    assert.throws(() => new CorpusStore(f));
  }
});

test("uncommitted reference is usable without fabricating a Git citation", () => {
  const f = fixture();
  f.documents[0].source.revision = null;
  f.documents[0].source.url = null;
  f.revision = corpusRevision(f.documents);
  const s = new CorpusStore(f);
  const r = s.read({ id: f.documents[0].id });
  assert.equal(r.citation, f.documents[0].url);
  assert.equal(r.source.revision, null);
});
