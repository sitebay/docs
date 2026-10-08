---
title: Update and recover a documentation snapshot
description: Keep article sources, packaged search data, database snapshots, and running readers on matching
  revisions.
slug: update-and-recover
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- update and recover a documentation snapshot
- sorti documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-infrastructure
- docs-knowledge
---

A documentation update has several identities: the source commit, generated corpus revision, container image digest, and database snapshot. Record each one. Similar timestamps or a reused image tag do not prove that the reader and articles match.

## Build from reviewed source

Edit the Markdown under `articles/`, update its review record, and run the publishing checks. Commit the reviewed source before creating a release context. The packager rejects source references without a committed revision.

Build HTML, Pagefind, and the corpus together. Pagefind is the browser index; it does not read the PostgreSQL database. The MCP reader uses the source-line corpus, optionally backed by PostgreSQL. Updating only one search path can leave people and assistants reading different revisions.

## Import before switching readers

Package the selected corpus and record `release.json`. Publish the tested image and record its registry digest. Configure the infrastructure with that image and the expected corpus revision.

The import Job writes a complete snapshot in one transaction. A failure rolls back its transaction rather than exposing a partial snapshot. An unchanged revision with matching embedding settings is reused. The new reader starts after the import Job succeeds and rejects a packaged corpus that differs from the configured expected revision.

Readers also check that their database contains the expected revision and chunk count. Keep the previous reader's snapshot available during the switch. A database-backed reader cannot serve a new article revision merely because its local corpus file was replaced.

## Inspect failed imports without replaying blindly

Read the exact Job's status and logs. Separate an image-pull failure, a database connection problem, a model response error, and an import validation failure. Retain the original Job identity and diagnostic output.

The infrastructure uses no automatic Job retries. After resolving the cause, the owner can increment `importAttempt` to create a new explicit attempt. Checking the old Job or reader status does not retry it. Previous Jobs are retained when replaced; their cleanup is a separate owner operation.

Do not weaken the read role or use a customer database to get past an import error. The importer and running reader intentionally have different credentials.

## Change an embedding model deliberately

Document vectors and query vectors must use the same model and dimensions. A snapshot already stored under a corpus revision cannot be overwritten with another model. Compare another model in a separately indexed database rather than relabeling existing vectors.

Relevance testing is separate from database mechanics. Test representative questions, source filters, and citations. Do not claim improved search because a model endpoint returned the expected number of vectors.

## Roll back a reader

Restore the previous tested image and expected corpus revision through an owner-reviewed infrastructure change. Keep the corresponding database snapshot. Verify readiness, tool discovery, and a known cited read after the switch.

A reader rollback does not roll back the public website automatically. Publish the intended HTML and Pagefind artifact separately when the website must match. Do not delete the database to resolve a revision mismatch; identify which component is on the wrong revision first.

For an in-memory reader, there is no database import. Its replacement still needs the reviewed corpus and client verification. See [deployment]({{< relref "knowledge/deploy-with-pulumi.md" >}}) for the resource sequence and [service ownership]({{< relref "knowledge/service-ownership.md" >}}) for configuration boundaries.
