import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { CorpusStore } from "../src/corpus.mjs";
const root = fileURLToPath(new URL("../../", import.meta.url));
export async function packageReader(corpusPath, output) {
  const raw = await fs.readFile(corpusPath);
  const corpus = JSON.parse(raw);
  const store = new CorpusStore(corpus);
  if (corpus.documents.some((d) => !/^[a-f0-9]{40}$/.test(d.source.revision)))
    throw new Error(
      "Release packaging requires committed documentation sources",
    );
  const target = path.resolve(output);
  await fs.mkdir(target); // Refuse reuse, symlinks, and accidental overwrite.
  for (const dir of ["src", "sql"])
    await fs.cp(
      path.join(root, "knowledge", dir),
      path.join(target, "knowledge", dir),
      { recursive: true },
    );
  for (const file of ["package.json", "package-lock.json"])
    await fs.copyFile(
      path.join(root, "knowledge", file),
      path.join(target, "knowledge", file),
    );
  await fs.copyFile(
    new URL("./Dockerfile", import.meta.url),
    path.join(target, "Dockerfile"),
  );
  await fs.writeFile(path.join(target, "corpus.json"), raw);
  const receipt = {
    corpus_revision: store.revision,
    corpus_sha256: createHash("sha256").update(raw).digest("hex"),
    documents: store.documents.size,
    chunks: store.chunks.length,
    scope:
      "Allowlisted reader code and explicit public corpus; no Git checkout, keys, customer data or local caches.",
  };
  await fs.writeFile(
    path.join(target, "release.json"),
    JSON.stringify(receipt, null, 2) + "\n",
  );
  return receipt;
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const [corpus, output, ...extra] = process.argv.slice(2);
  if (!corpus || !output || extra.length)
    throw new Error("Usage: package-reader.mjs CORPUS NEW_OUTPUT_DIRECTORY");
  console.log(JSON.stringify(await packageReader(corpus, output)));
}
