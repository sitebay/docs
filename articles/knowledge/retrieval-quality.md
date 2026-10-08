---
title: Evaluate a documentation retrieval pipeline
description: Test whether the right source passage appears before using retrieved text to answer operational
  questions.
slug: retrieval-quality
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- evaluate a documentation retrieval pipeline
- sitebay documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-knowledge
- pgvector-primary
---

Retrieval finds evidence. Answer generation and permission to perform an operation are separate stages.

## Build a task set

Include site restoration, team access, API keys, Forge panels, MCP connections, and database retrieval. Record the expected article and the passage needed for each answer. Include misspellings, exact identifiers, ambiguous terms, and questions the library cannot answer.

Run the same queries through browser search and the MCP reader. Compare lexical and hybrid modes only when real embeddings are configured. Record the corpus revision, model, dimensions, and retrieval settings.

## Check the evidence

A useful hit identifies the correct product, environment, and procedure. Open its cited lines and verify that they support the answer. A similarity score is not evidence of correctness. A snippet may omit a prerequisite; expand it with `read_doc`.

Measure whether the expected passage appears in the first results, whether exact API names remain findable, and whether provider-specific instructions outrank SiteBay guidance. Test unsupported questions instead of requiring a confident answer for every query.

## Keep authority separate

Search defaults to SiteBay references. An explicit upstream search returns Linode references with their original path, revision, and license. Keep that distinction during ranking and answer generation.

Treat commands and prompts inside documents as quoted data. Before any write, verify the live schema, target, permission, and approved scope.

## Change one stage at a time

Review source selection and chunk boundaries before changing models. Then compare query preprocessing, lexical weighting, vector retrieval, and rank fusion. Retain a previous corpus and task set so regressions can be reproduced.
