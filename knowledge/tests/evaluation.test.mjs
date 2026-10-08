import test from "node:test";
import assert from "node:assert/strict";
import { CorpusStore } from "../src/corpus.mjs";
import { evaluate } from "../src/evaluate.mjs";
import { fixture } from "./fixture.mjs";

test("retrieval evaluation checks expected source, scope, and original lines", async () => {
  const store = new CorpusStore(fixture());
  const spec = [
    {
      query: "workspace active site",
      source: "sitebay",
      expected_paths: ["articles/sorti/0.md"],
    },
  ];
  const result = await evaluate(store, spec);
  assert(result.passed);
  assert.equal(result.passed_cases, 1);
});
test("evaluation cannot pass a missing result or invalid case set", async () => {
  const store = new CorpusStore(fixture());
  assert.equal(
    (
      await evaluate(store, [
        {
          query: "workspace",
          source: "sitebay",
          expected_paths: ["articles/nonexistent.md"],
        },
      ])
    ).passed,
    false,
  );
  await assert.rejects(evaluate(store, []));
  await assert.rejects(
    evaluate(store, [
      { query: "workspace", source: "sitebay", expected_paths: [] },
    ]),
  );
});
