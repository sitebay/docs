import { hash, corpusRevision } from "../src/corpus.mjs";
export function fixture() {
  const documents = [
    [
      "sitebay",
      "sorti",
      "Sorti workspace",
      "Verify the active site before editing.\nRead the panel contract before opening a panel.",
    ],
    [
      "sitebay",
      "data",
      "pgvector retrieval",
      "Use a read-only database role.\nPostgreSQL stores vectors for cosine similarity.",
    ],
    [
      "linode",
      "guides",
      "Akamai MCP gateway",
      "Akamai procedures describe Akamai services, not SiteBay.\nRead original provider instructions.",
    ],
  ].map(([namespace, topic, title, raw], i) => {
    const sourcePath = `${namespace === "sitebay" ? "articles" : "docs"}/${topic}/${i}.md`;
    const id = namespace + ":" + hash(sourcePath).slice(0, 20);
    return {
      id,
      namespace,
      topic,
      title,
      description: title,
      url: "https://www.sitebay.org/docs/" + i + "/",
      authority:
        namespace === "sitebay" ? "sitebay-reference" : "external-reference",
      license: "CC BY 4.0",
      authors: ["Fixture"],
      basis: [],
      reviewed: "2026-10-08",
      body_start: 1,
      raw,
      source: {
        repository: namespace + "/docs",
        path: sourcePath,
        revision: "0".repeat(40),
        sha256: hash(raw),
        url: `https://github.com/${namespace}/docs/blob/${"0".repeat(40)}/${sourcePath}`,
      },
      chunks: [
        {
          id: id + ":1",
          document_id: id,
          heading: title,
          line_start: 1,
          line_end: 2,
          text: raw,
          sha256: hash(raw),
        },
      ],
    };
  });
  return {
    schema_version: 1,
    revision: corpusRevision(documents),
    documents,
    scope: "Test fixtures only",
  };
}
