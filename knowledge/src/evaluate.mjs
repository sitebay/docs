// Curated retrieval regression, not a benchmark of unseen or semantic queries.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CorpusStore } from "./corpus.mjs";

export async function evaluate(store, cases) {
  if (!Array.isArray(cases) || !cases.length)
    throw new Error("Evaluation cases are required");
  const results = [];
  for (const c of cases) {
    if (
      !c.query ||
      !["sitebay", "linode"].includes(c.source) ||
      !Array.isArray(c.expected_paths) ||
      (!c.expected_paths.length && !c.expect_empty)
    )
      throw new Error("Invalid evaluation case");
    const response = await store.search({
      query: c.query,
      source: c.source,
      mode: "lexical",
      limit: 5,
    });
    const problems = [];
    for (const hit of response.results) {
      const doc = store.documents.get(hit.id);
      if (
        !doc ||
        hit.namespace !== c.source ||
        hit.authority !== doc.authority ||
        hit.source.sha256 !== doc.source.sha256 ||
        hit.source.path !== doc.source.path
      )
        problems.push("Source identity or scope mismatch");
      const read = store.read({
        id: hit.id,
        start_line: hit.line_start,
        max_lines: Math.min(160, hit.line_end - hit.line_start + 1),
      });
      const original = doc.raw
        .split(/\r?\n/)
        .slice(read.line_start - 1, read.line_end)
        .join("\n");
      if (
        read.text !== original ||
        (doc.source.url &&
          read.citation !==
            `${doc.source.url}#L${read.line_start}-L${read.line_end}`)
      )
        problems.push("Citation or source-line mismatch");
    }
    const rank =
      response.results.findIndex((hit) =>
        c.expected_paths.includes(hit.source.path),
      ) + 1;
    if (c.expect_empty ? response.results.length !== 0 : rank === 0)
      problems.push("Expected retrieval result missing");
    results.push({
      query: c.query,
      source: c.source,
      passed: problems.length === 0,
      expected_rank: rank || null,
      results: response.results.map((hit) => ({
        path: hit.source.path,
        line_start: hit.line_start,
        line_end: hit.line_end,
      })),
      problems,
    });
  }
  return {
    passed: results.every((r) => r.passed),
    cases: results.length,
    passed_cases: results.filter((r) => r.passed).length,
    corpus_revision: store.revision,
    documents: store.documents.size,
    results,
    scope:
      "Curated lexical top-five regression and exact source-line verification. Not a semantic model quality claim.",
  };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const args = process.argv.slice(2);
  let reportPath;
  let upstream = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--upstream") upstream = true;
    else if (args[i] === "--report" && args[i + 1]) reportPath = args[++i];
    else throw new Error("Usage: evaluate.mjs [--upstream] [--report FILE]");
  }
  const store = await CorpusStore.load(
    process.env.DOCS_CORPUS ||
      new URL("../../public/knowledge/corpus.json", import.meta.url),
  );
  try {
    const spec = JSON.parse(
      await fs.readFile(
        new URL("../evaluation/cases.json", import.meta.url),
        "utf8",
      ),
    );
    const cases = spec.cases.filter((c) => upstream || c.source === "sitebay");
    const result = await evaluate(store, cases);
    if (reportPath) {
      await fs.mkdir(path.dirname(path.resolve(reportPath)), {
        recursive: true,
      });
      await fs.writeFile(reportPath, JSON.stringify(result, null, 2) + "\n");
    }
    console.log(JSON.stringify(result));
    if (!result.passed) process.exitCode = 1;
  } finally {
    await store.close();
  }
}
