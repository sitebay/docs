import fs from "node:fs/promises";
import { createHash } from "node:crypto";
const stop = new Set(
  "a an the and or to for of on in is are what how do does can i our with from this that it be by".split(
    " ",
  ),
);
export const tokenize = (text) =>
  String(text)
    .toLowerCase()
    .normalize("NFKC")
    .match(/[\p{L}\p{N}_]+/gu)
    ?.filter((x) => x.length > 1 && !stop.has(x)) || [];
export const hash = (text) => createHash("sha256").update(text).digest("hex");
// Match the Python corpus builder's sorted JSON encoding. This detects drift,
// including metadata changes; the digest is not a signature or a trust grant.
export function corpusRevision(documents) {
  function encode(value) {
    if (Array.isArray(value)) return "[" + value.map(encode).join(", ") + "]";
    if (value !== null && typeof value === "object")
      return (
        "{" +
        Object.keys(value)
          .sort()
          .map((key) => JSON.stringify(key) + ": " + encode(value[key]))
          .join(", ") +
        "}"
      );
    return JSON.stringify(value);
  }
  return hash(encode(documents));
}
function validateProvenance(doc) {
  const prefix = doc.namespace === "sitebay" ? "articles/" : "docs/";
  const source = doc.source;
  const expectedAuthority =
    doc.namespace === "sitebay" ? "sitebay-reference" : "external-reference";
  if (
    !source ||
    typeof source.path !== "string" ||
    !source.path.startsWith(prefix) ||
    !source.path.endsWith(".md") ||
    source.path.split("/").some((part) => part === ".." || part === ".") ||
    source.path.includes("\\") ||
    /[\x00-\x1f]/.test(source.path) ||
    source.repository !== `${doc.namespace}/docs` ||
    doc.authority !== expectedAuthority ||
    doc.id !== `${doc.namespace}:${hash(source.path).slice(0, 20)}`
  )
    throw new Error("Document identity, source path, or authority mismatch");
  if (source.revision === null && doc.namespace === "sitebay") {
    if (source.url !== null)
      throw new Error("Uncommitted source must not claim a committed citation");
  } else if (
    !/^[a-f0-9]{40}$/.test(source.revision ?? "") ||
    source.url !==
      `https://github.com/${source.repository}/blob/${source.revision}/${source.path}`
  ) {
    throw new Error("Source revision or citation URL mismatch");
  }
}
export function boundedInt(value, fallback, min, max) {
  if (value === undefined) return fallback;
  if (!Number.isInteger(value) || value < min || value > max)
    throw new Error(`Expected an integer from ${min} to ${max}`);
  return value;
}
export function validateSearch(args = {}) {
  if (
    typeof args.query !== "string" ||
    !args.query.trim() ||
    args.query.length > 500
  )
    throw new Error("query must contain 1–500 characters");
  if (!["sitebay", "linode", "all"].includes(args.source ?? "sitebay"))
    throw new Error("Unknown source");
  if (
    args.topic !== undefined &&
    (typeof args.topic !== "string" || args.topic.length > 100)
  )
    throw new Error("Invalid topic");
  if (!["auto", "lexical", "semantic", "hybrid"].includes(args.mode ?? "auto"))
    throw new Error("Unknown search mode");
  return {
    ...args,
    limit: boundedInt(args.limit, 8, 1, 20),
    source: args.source ?? "sitebay",
  };
}
export class CorpusStore {
  constructor(corpus) {
    if (
      corpus?.schema_version !== 1 ||
      !Array.isArray(corpus.documents) ||
      !corpus.documents.length
    )
      throw new Error("Invalid or empty corpus");
    this.corpus = corpus;
    this.revision = corpus.revision;
    this.documents = new Map();
    this.chunks = [];
    this.df = new Map();
    const chunkIds = new Set();
    for (const d of corpus.documents) {
      if (
        !/^(sitebay|linode):[a-f0-9]{20}$/.test(d.id) ||
        this.documents.has(d.id) ||
        hash(d.raw) !== d.source.sha256
      )
        throw new Error("Invalid, duplicate, or changed document");
      if (
        !["sitebay", "linode"].includes(d.namespace) ||
        !Array.isArray(d.chunks)
      )
        throw new Error("Invalid document source");
      validateProvenance(d);
      this.documents.set(d.id, d);
      const lines = d.raw.split(/\r?\n/);
      if (!Number.isInteger(d.body_start))
        throw new Error("Missing document body position");
      boundedInt(d.body_start, undefined, 1, lines.length);
      for (const c of d.chunks) {
        if (
          chunkIds.has(c.id) ||
          c.id !== `${d.id}:${c.line_start}` ||
          !Number.isInteger(c.line_start) ||
          !Number.isInteger(c.line_end) ||
          c.line_start < 1 ||
          c.line_end < c.line_start ||
          c.line_end > lines.length
        )
          throw new Error("Invalid or duplicate chunk position");
        chunkIds.add(c.id);
        if (
          c.document_id !== d.id ||
          hash(c.text) !== c.sha256 ||
          c.text !== lines.slice(c.line_start - 1, c.line_end).join("\n")
        )
          throw new Error("Chunk provenance mismatch");
        const terms = tokenize(c.text),
          freq = new Map();
        for (const term of terms) freq.set(term, (freq.get(term) || 0) + 1);
        const titleTerms = new Set(tokenize(`${d.title} ${c.heading}`));
        const row = {
          ...c,
          doc: d,
          terms: freq,
          titleTerms,
          length: terms.length,
        };
        this.chunks.push(row);
        for (const term of new Set([...freq.keys(), ...titleTerms]))
          this.df.set(term, (this.df.get(term) || 0) + 1);
      }
    }
    if (
      typeof corpus.revision !== "string" ||
      corpusRevision(corpus.documents) !== corpus.revision
    )
      throw new Error(
        "Corpus revision does not match document content and metadata",
      );
    this.averageLength =
      this.chunks.reduce((n, c) => n + c.length, 0) /
      Math.max(1, this.chunks.length);
    this.chunkMap = new Map(this.chunks.map((c) => [c.id, c]));
  }
  static async load(filename) {
    const size = (await fs.stat(filename)).size;
    if (size > 256 * 1024 * 1024) throw new Error("Corpus exceeds 256 MB");
    return new CorpusStore(JSON.parse(await fs.readFile(filename, "utf8")));
  }
  metadata(d) {
    const { raw, chunks, body_start, ...metadata } = d;
    return {
      ...metadata,
      lines: d.raw.split(/\r?\n/).length,
      corpus_revision: this.revision,
    };
  }
  list({ source = "sitebay", topic, cursor, limit } = {}) {
    if (!["sitebay", "linode", "all"].includes(source))
      throw new Error("Unknown source");
    const start =
      cursor === undefined
        ? 0
        : boundedInt(Number(cursor), 0, 0, this.documents.size);
    const count = boundedInt(limit, 30, 1, 50);
    const docs = [...this.documents.values()].filter(
      (d) =>
        (source === "all" || d.namespace === source) &&
        (!topic || d.topic === topic),
    );
    return {
      revision: this.revision,
      total: docs.length,
      documents: docs.slice(start, start + count).map((d) => this.metadata(d)),
      next_cursor: start + count < docs.length ? String(start + count) : null,
    };
  }
  topics() {
    const counts = new Map();
    for (const d of this.documents.values()) {
      const key = `${d.namespace}/${d.topic}`;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return {
      revision: this.revision,
      topics: [...counts]
        .sort()
        .map(([key, documents]) => ({ key, documents })),
      scope: this.corpus.scope,
    };
  }
  read({ id, start_line, max_lines } = {}) {
    const d = this.documents.get(id);
    if (!d)
      throw new Error(
        "Unknown document ID; use search_docs or list_docs first",
      );
    const lines = d.raw.split(/\r?\n/),
      start = boundedInt(start_line, d.body_start, 1, lines.length),
      count = boundedInt(max_lines, 80, 1, 160);
    let end = Math.min(lines.length, start + count - 1);
    while (end > start && lines.slice(start - 1, end).join("\n").length > 24000)
      end--;
    const text = lines.slice(start - 1, end).join("\n");
    if (text.length > 48000)
      throw new Error(
        "Source line exceeds the read limit; open the cited original",
      );
    return {
      ...this.metadata(d),
      line_start: start,
      line_end: end,
      text,
      next_line: end < lines.length ? end + 1 : null,
      citation: d.source.url ? `${d.source.url}#L${start}-L${end}` : d.url,
    };
  }
  hit(c, score) {
    return {
      id: c.doc.id,
      chunk_id: c.id,
      title: c.doc.title,
      heading: c.heading,
      url: c.doc.url,
      source: c.doc.source,
      namespace: c.doc.namespace,
      topic: c.doc.topic,
      authority: c.doc.authority,
      license: c.doc.license,
      line_start: c.line_start,
      line_end: c.line_end,
      excerpt: c.text.slice(0, 1400),
      excerpt_truncated: c.text.length > 1400,
      score,
      corpus_revision: this.revision,
    };
  }
  async search(input) {
    const a = validateSearch(input);
    if (a.mode === "semantic" || a.mode === "hybrid")
      throw new Error(
        "Semantic search requires the configured pgvector and embedding backend",
      );
    const terms = [...new Set(tokenize(a.query))];
    if (!terms.length)
      return { mode: "lexical", revision: this.revision, results: [] };
    const matches = [];
    const n = this.chunks.length;
    for (const c of this.chunks) {
      if (
        (a.source !== "all" && c.doc.namespace !== a.source) ||
        (a.topic && c.doc.topic !== a.topic)
      )
        continue;
      let score = 0,
        matched = 0;
      for (const term of terms) {
        const tf = c.terms.get(term) || 0,
          title = c.titleTerms.has(term) ? 1 : 0;
        if (!tf && !title) continue;
        matched++;
        const idf = Math.log(
          1 +
            (n - (this.df.get(term) || 0) + 0.5) /
              ((this.df.get(term) || 0) + 0.5),
        );
        score +=
          idf *
          ((tf * 2.2) /
            (tf + 1.2 * (0.25 + (0.75 * c.length) / this.averageLength)) +
            title * 2);
      }
      if (matched) matches.push({ c, score: (score * matched) / terms.length });
    }
    matches.sort((a, b) => b.score - a.score || a.c.id.localeCompare(b.c.id));
    const seen = new Map(),
      hits = [];
    for (const { c, score } of matches) {
      if ((seen.get(c.doc.id) || 0) >= 2) continue;
      seen.set(c.doc.id, (seen.get(c.doc.id) || 0) + 1);
      hits.push(this.hit(c, score));
      if (hits.length >= a.limit) break;
    }
    return { mode: "lexical", revision: this.revision, results: hits };
  }
  async close() {}
}
