# Package and deploy the reader

Infrastructure lives in the isolated `pulumi-aks/docs-knowledge/` project.
This directory packages application code and a reviewed corpus; it does not
run the platform stack, publish a website, or connect a live Sorti session.

## Build an allowlisted context

Use a clean committed documentation checkout. Build and verify its articles,
then create a **new** output directory:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm --prefix knowledge ci --ignore-scripts --no-audit --no-fund
npm run build:docs
node knowledge/deploy/package-reader.mjs public/knowledge/corpus.json ../docs-reader-context
```

The context includes only reader source, schema, dependency locks, Dockerfile,
corpus and a release record. No `.git`, process environment, private checkout,
customer data, or whole-home indexing is included. Use an explicit combined
corpus path when intentionally packaging the original upstream library. Such
an image contains that library and must retain its source/license metadata;
it is distinct from the public website artifact.

Build with an immutable Node base reference:

```sh
NODE_IMAGE=$(node -p 'JSON.parse(require("fs").readFileSync("knowledge/deploy/base-image.json")).image')
docker build --build-arg "NODE_IMAGE=$NODE_IMAGE" \
  --tag docs-reader:review ../docs-reader-context
```

Verify the image locally before the owner publishes it to an approved registry.
Use the registry manifest digest as Pulumi `readerImage`, and the exact
`corpus_revision` from the packaged `release.json` as `corpusRevision`. The build
script refuses an existing destination; retain earlier contexts for comparison.
A local Docker image ID is not a remotely pullable registry digest.

## Runtime configuration

`DOCS_MCP_HOST` defaults to `127.0.0.1`. The Kubernetes pod explicitly sets it to
`0.0.0.0`; that mode requires nonempty exact `DOCS_ALLOWED_HOSTS`. Authentication
and Origin checking remain enabled. `DOCS_MCP_TOKEN` must be at least 32 bytes.
No wildcard host or hard-coded production token is supplied.

`DOCS_EXPECTED_CORPUS_REVISION` rejects a mismatched corpus before database or
embedding requests. The deployment supplies it to both importer and reader.
Reader readiness checks the selected store at `/readyz`, coalesced for five
seconds; `/healthz` is process liveness. Readiness does not test a real embedding
provider. Database connections use a mounted CA and hostname verification in
the infrastructure project. Never disable TLS to resolve a mismatch.

The same image runs a one-shot importer with `node knowledge/src/import.mjs
--apply --initialize`, or the reader with `node knowledge/src/server.mjs --http`.
Only the importer receives `DOCS_IMPORT_DATABASE_URL`. Runtime receives
`DOCS_READ_DATABASE_URL`, corpus, and reader authentication. Local lexical mode
needs neither a database nor a model. A real model needs separate installation,
configuration and relevance acceptance.

## Activation boundary

The owner supplies the target context, real selectors, storage class, secret
values, registry access, and any public hostname/TLS setup. This package does
not create a DNS record, issue certificates, download models, or perform an
infrastructure apply. Follow the infrastructure README's separate database,
image, import, reader, and client acceptance steps. Keep the docs `main` rollback
until the requested release decision is made.
