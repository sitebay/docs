---
title: Troubleshoot documentation search and MCP reads
description: Identify the failing search path, inspect the original deployment, and fix configuration without
  granting extra access.
slug: troubleshoot-reader
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- troubleshoot documentation search and mcp reads
- sorti documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-infrastructure
- docs-knowledge
- sorti-byo
---

First identify which search failed: browser Pagefind, the in-memory MCP reader, or a PostgreSQL-backed reader. They use related documentation but have different deployment and connection requirements.

## Browser search

A working article page does not prove the Pagefind bundle was published. Check that the website artifact contains the generated search files and that the browser can request them under the same deployment base path. Rebuild through `npm run build:docs` instead of copying HTML alone.

When search returns an old title, compare the deployed article and search artifact with the intended source revision. Clearing a local browser cache does not repair a stale server artifact. PostgreSQL settings and Algolia uploads do not update this Pagefind index.

## MCP connection

| Observation | Inspect |
| --- | --- |
| Connection refused | Reader process, bind address, Service, port, and the client's network path |
| HTTP 401 | The reader token in the client's secret configuration; never substitute a database password |
| HTTP 403 | The exact Host or Origin against the reader allowlist |
| Discovery works but tools fail | The proxy routes for `/byo/mcp` or `/mcp` and the selected transport |
| HTTP 429 | Concurrent requests; reduce parallel reads rather than sending immediate duplicates |
| Unknown tool or resource | The discovered read-only roster and returned document IDs |

The local default bind is `127.0.0.1`. Kubernetes deployments explicitly select `0.0.0.0` and must provide exact allowed hosts; wildcard hosts are rejected. A remote agent's loopback address does not refer to the reader's machine.

Sorti's BYO connection uses an origin-root capability document and the `/byo/mcp` endpoint. Standard Streamable HTTP clients use `/mcp`. Forward both discovery and the intended tool endpoint through the authenticated HTTPS origin.

## Readiness and database state

`/healthz` reports process liveness. `/readyz` also checks the selected database store when one is configured. Readiness checks are coalesced for five seconds and do not call an embedding provider. A ready lexical reader is not evidence that a model is installed.

A corpus-revision error means the packaged file, expected deployment revision, or database snapshot disagrees. Check `release.json`, `DOCS_EXPECTED_CORPUS_REVISION`, and the original import result. Import the correct snapshot before switching the reader; do not change the expected hash merely to silence the error.

A write-privilege error means the reader was given the wrong database role or inherited permissions. Restore the SELECT-only role. Missing rows or changed content hashes indicate an incomplete or inconsistent snapshot; investigate the import rather than disabling integrity checks.

A database connection failure can also come from missing CA files, a hostname mismatch, denied egress, or unsettled role credentials. Verify the mounted certificate authority and the configured Service name. Disabling certificate verification is not the repair.

## Semantic retrieval

An explicit semantic request fails when no embedding backend is configured. Set the same approved model, dimensions, and endpoint for import and query, then index a matching snapshot. Remote embedding requests require explicit export permission and HTTPS.

The importer does not install models. A provider timeout, invalid vector, or unexpected dimension is a provider or configuration issue, not an invitation to substitute deterministic test vectors. Test retrieval quality only after the real provider is working.

## Keep the original evidence

Record the reader revision, image digest, Job identity, HTTP status, and non-secret error. Never copy tokens, database URLs, or customer records into an issue. Use [update and recovery]({{< relref "knowledge/update-and-recover.md" >}}) to retry or switch a snapshot deliberately.
