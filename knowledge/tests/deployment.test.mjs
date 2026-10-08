import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { fixture } from "./fixture.mjs";
import { CorpusStore } from "../src/corpus.mjs";
import { assertExpectedRevision } from "../src/deployment.mjs";
import { listen } from "../src/http.mjs";
import { packageReader } from "../deploy/package-reader.mjs";
const token = "test-only-documentation-token-000000000000";
const get = (port, host, url = "/healthz") =>
  new Promise((resolve, reject) => {
    http
      .get(
        { hostname: "127.0.0.1", port, path: url, headers: { host } },
        (res) => {
          let body = "";
          res.on("data", (c) => (body += c));
          res.on("end", () => resolve({ status: res.statusCode, body }));
        },
      )
      .on("error", reject);
  });
test("deployment revision is checked before external services are used", () => {
  const s = new CorpusStore(fixture());
  assertExpectedRevision(s, {});
  assertExpectedRevision(s, { DOCS_EXPECTED_CORPUS_REVISION: s.revision });
  assert.throws(() =>
    assertExpectedRevision(s, {
      DOCS_EXPECTED_CORPUS_REVISION: "0".repeat(64),
    }),
  );
  assert.throws(() =>
    assertExpectedRevision(s, { DOCS_EXPECTED_CORPUS_REVISION: "latest" }),
  );
});
test("container binding remains opt-in with exact host and token checks", async () => {
  const s = new CorpusStore(fixture());
  await assert.rejects(listen(s, { token, host: "0.0.0.0" }));
  await assert.rejects(
    listen(s, { token, host: "0.0.0.0", allowedHosts: ["*"] }),
  );
  const server = await listen(s, {
    token,
    host: "0.0.0.0",
    allowedHosts: ["docs.test"],
  });
  try {
    assert.equal(server.address().address, "0.0.0.0");
    assert.equal((await get(server.address().port, "evil.test")).status, 403);
    assert.equal((await get(server.address().port, "docs.test")).status, 200);
    assert.equal(
      (await get(server.address().port, "docs.test", "/byo/mcp")).status,
      401,
    );
    assert.equal(
      (await get(server.address().port, "docs.test", "/readyz")).status,
      200,
    );
  } finally {
    await new Promise((r) => server.close(r));
  }
});
test("readiness reports backend failure without leaking its exception", async () => {
  const s = new CorpusStore(fixture());
  s.check = async () => {
    throw new Error("postgresql://sensitive:not-for-response@host/db");
  };
  const server = await listen(s, { token });
  try {
    const response = await get(
      server.address().port,
      `localhost:${server.address().port}`,
      "/readyz",
    );
    assert.equal(response.status, 503);
    assert(!response.body.includes("sensitive"));
  } finally {
    await new Promise((r) => server.close(r));
  }
});
test("reader image context contains only code and validated source corpus", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "docs-image-"));
  try {
    const source = path.join(dir, "source.json");
    await fs.writeFile(source, JSON.stringify(fixture()));
    const dest = path.join(dir, "context");
    const result = await packageReader(source, dest);
    assert.equal(result.documents, fixture().documents.length);
    assert.deepEqual((await fs.readdir(dest)).sort(), [
      "Dockerfile",
      "corpus.json",
      "knowledge",
      "release.json",
    ]);
    assert.deepEqual((await fs.readdir(path.join(dest, "knowledge"))).sort(), [
      "package-lock.json",
      "package.json",
      "sql",
      "src",
    ]);
    await assert.rejects(packageReader(source, dest));
    await fs.writeFile(source, "{}");
    await assert.rejects(packageReader(source, path.join(dir, "bad")));
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});
