# Build only from the allowlisted context made by package-reader.mjs.
# Supply an independently resolved node:22-bookworm-slim digest.
ARG NODE_IMAGE
FROM ${NODE_IMAGE}
WORKDIR /app
COPY knowledge/package.json knowledge/package-lock.json ./knowledge/
RUN npm --prefix knowledge ci --omit=dev --ignore-scripts --no-audit --no-fund && npm cache clean --force
COPY knowledge/src ./knowledge/src
COPY knowledge/sql ./knowledge/sql
COPY corpus.json release.json ./
ENV NODE_ENV=production DOCS_CORPUS=/app/corpus.json
USER 1000:1000
EXPOSE 8788
CMD ["node", "knowledge/src/server.mjs", "--http"]
