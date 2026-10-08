/** A deployment names its corpus before any database or embedding request. */
export function assertExpectedRevision(store, env = process.env) {
  const expected = env.DOCS_EXPECTED_CORPUS_REVISION;
  if (
    expected !== undefined &&
    (!/^[a-f0-9]{64}$/.test(expected) || store.revision !== expected)
  )
    throw new Error(
      "Packaged corpus does not match DOCS_EXPECTED_CORPUS_REVISION",
    );
}
