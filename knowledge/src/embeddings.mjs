export function validVector(vector, dimensions) {
  if (
    !Array.isArray(vector) ||
    vector.length !== dimensions ||
    vector.some((x) => typeof x !== 'number' || !Number.isFinite(x)) ||
    !vector.some((x) => x !== 0)
  )
    throw new Error('Embedding dimensions, numeric values, or norm are invalid');
  return vector;
}
export function embeddingClient(env = process.env) {
  if (!env.DOCS_EMBED_URL && !env.DOCS_EMBED_MODEL) return null;
  if (!env.DOCS_EMBED_URL || !env.DOCS_EMBED_MODEL)
    throw new Error('Set both DOCS_EMBED_URL and DOCS_EMBED_MODEL');
  const url = new URL(env.DOCS_EMBED_URL);
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (
    url.username ||
    url.password ||
    !['http:', 'https:'].includes(url.protocol) ||
    (!local && env.DOCS_ALLOW_REMOTE_EMBEDDINGS !== 'true')
  )
    throw new Error('Remote embedding export requires explicit DOCS_ALLOW_REMOTE_EMBEDDINGS=true');
  if (!local && url.protocol !== 'https:') throw new Error('Remote embeddings require HTTPS');
  const dimensions = Number(env.DOCS_EMBED_DIMENSIONS || 768);
  if (!Number.isInteger(dimensions) || dimensions < 1 || dimensions > 2000)
    throw new Error('Embedding dimensions must be 1–2000');
  return {
    model: env.DOCS_EMBED_MODEL,
    dimensions,
    async embed(texts) {
      if (
        !Array.isArray(texts) ||
        texts.length > 32 ||
        texts.some((t) => typeof t !== 'string' || t.length > 50000)
      )
        throw new Error('Invalid embedding batch');
      const response = await fetch(url, {
        method: 'POST',
        redirect: 'error',
        signal: AbortSignal.timeout(30000),
        headers: {
          'content-type': 'application/json',
          ...(env.DOCS_EMBED_TOKEN ? { authorization: `Bearer ${env.DOCS_EMBED_TOKEN}` } : {}),
        },
        body: JSON.stringify({ model: this.model, input: texts, dimensions, truncate: false }),
      });
      if (!response.ok) throw new Error(`Embedding provider failed (${response.status})`);
      const reader = response.body.getReader();
      let bytes = 0,
        parts = [];
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.length;
          if (bytes > 4 * 1024 * 1024) throw new Error('Embedding response exceeds limit');
          parts.push(value);
        }
      } finally {
        await reader.cancel().catch(() => {});
      }
      const result = JSON.parse(Buffer.concat(parts).toString());
      if (!Array.isArray(result.embeddings) || result.embeddings.length !== texts.length)
        throw new Error('Embedding response count mismatch');
      return result.embeddings.map((v) => validVector(v, dimensions));
    },
  };
}
