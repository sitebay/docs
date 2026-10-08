---
title: Deploy the documentation reader with Pulumi
description: Provision an isolated documentation database and connect a revision-matched reader without changing
  customer databases.
slug: deploy-with-pulumi
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- deploy the documentation reader with pulumi
- sorti documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-infrastructure
- docs-knowledge
---

The deployment project lives in `pulumi-aks/docs-knowledge/`. It is separate from the repository's main platform stack. Run its preview from that directory so unrelated platform changes do not enter the documentation deployment.

## Choose the deployment scope

The database-only configuration creates a new namespace and a CloudNativePG cluster named `docs-postgres`. The database is `docs_knowledge`; it has separate `docs_importer` and `docs_reader` roles. The existing platform database and its credentials are not reused.

The default is one PostgreSQL instance with a 10Gi data volume. This documentation index can be rebuilt from source; it is not a highly available database or a backup service. Keep the source, corpus, image digest, and model identity outside the database. Configure and test a backup policy before storing anything that cannot be reconstructed.

The project expects a compatible CloudNativePG operator to exist. It does not install or upgrade that operator. Verify the actual operator namespace and labels, storage class, capacity, DNS, and cluster network policies before applying it. Source defaults are not live cluster observations.

## Configure the database

Create or select the isolated project's stack. Load the example settings without overwriting an existing stack's encrypted values or secret-provider metadata. Set an explicit Kubernetes context and the reviewed storage class.

Set `importerPassword` and `readerPassword` as separate Pulumi secrets. Use independently generated credentials of at least 32 bytes. Keep passwords out of shell arguments, article examples, and repository files.

The owner reviews and applies the plan. The repository rules reserve deployment for the owner; a passing local manifest test does not create a database. The namespace and database are protected against deletion, and bootstrap SQL runs only when a new cluster is initialized.

## Package the reader

Build the committed documentation source and package its corpus from the docs checkout:

```sh
npm run build:docs
node knowledge/deploy/package-reader.mjs \
  public/knowledge/corpus.json ../docs-reader-context
```

The destination must not exist. Packaging copies only the reader, dependency locks, schema, and selected validated corpus. It excludes the repository history, local secrets, and unrelated files. A separate combined corpus may be selected explicitly; it is not added merely because an upstream checkout exists.

Build the context with a pinned Node image and publish it to the approved registry. Configure `readerImage` with the registry manifest digest and `corpusRevision` with the exact hash in `release.json`. A local image ID and a Git commit are not substitutes for those values.

## Enable the service

Set the actual client namespace and pod labels. For a private image, provision the approved image-pull secret in the docs namespace and list it in `imagePullSecrets`. Enable the reader only after those inputs are ready.

Pulumi creates a one-shot import Job, then starts the reader after that Job succeeds. The importer gets the writer credential; the reader gets only the read credential and its MCP token. Both use the same packaged corpus and verify the database connection with the operator's certificate authority.

The Service is internal by default. A remote client needs reviewed HTTPS ingress, DNS, and a certificate. Configure the hostname, ingress class, and existing TLS secret; the ingress must forward discovery as well as `/byo/mcp` and `/mcp`. The project does not invent a public domain or issue a certificate automatically.

## Verify the activated service

Check the cluster, role reconciliation, import result, and reader readiness. Confirm the reported corpus revision. An unauthenticated tool request must fail, and the connected client must discover only the four documentation tools. Search a known task and read its source lines.

A successful database import does not install an embedding model. Database-backed keyword search works without one. Use [pgvector configuration]({{< relref "knowledge/pgvector.md" >}}) for model settings and [reader troubleshooting]({{< relref "knowledge/troubleshoot-reader.md" >}}) for failed checks.
