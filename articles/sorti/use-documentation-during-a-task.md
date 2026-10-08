---
title: Use documentation during a Sorti task
description: Find a procedure, read its cited source, and keep reference lookup separate from permission to
  act.
slug: use-documentation-during-a-task
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- use documentation during a sorti task
- sorti documentation
tags:
- documentation
- knowledge
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- docs-knowledge
- sorti-byo
- sorti-current-skills
---

Connect the documentation reader when Sorti needs procedures or system references. The reader helps explain what to do; it does not perform site changes or grant access to another application.

## Ask for a source before a change

A useful request names the target and the question:

> Read the current staging procedure. Explain which checks apply to this site before proposing a promotion. Do not publish anything.

The assistant can search with `search_docs`, then use `read_doc` on a returned document ID. Search excerpts are a starting point. Read the full relevant section before treating a sentence as a complete procedure.

Each read identifies the article path, source revision, original line range, and content hash. Keep those citations with a recommendation so another person can inspect the same text. A file hash identifies the reference; it does not prove the live service has that implementation.

## Select the right collection

SiteBay documentation is the default source. The original Linode library is an explicitly selected external collection. A useful request is:

> Search the original upstream library for pgvector setup. Explain which steps are general PostgreSQL work and which assume Akamai services.

Preserve the provider and license when citing an external reference. Do not treat a Linode provisioning command as a SiteBay API call. The library is useful background, not a list of installed SiteBay capabilities.

Use `docs_topics` to inspect the available collections and `list_docs` to browse their metadata. An upstream source is available only when the selected corpus contains it; a connected reader does not fetch arbitrary repositories or filesystem paths on demand.

## Turn a reference into a bounded task

Compare the procedure with the selected site, environment, current tool schema, and permissions. Identify the checks that can be performed now and the prerequisites that are still missing. Then request a specific operation through the service that owns it.

For example, the documentation reader can explain a database import, but only the approved import process can write its snapshot. The reader cannot turn a cited SQL example into a database mutation. Likewise, a site deployment uses the site's own operation and approval flow.

## Keep skills and documentation distinct

A skill is a reusable instruction document. It may tell the assistant to consult a maintained guide and verify particular outcomes. A documentation search returns source passages; reading one does not install a skill or mark a mission complete.

Avoid storing a second long copy of a changing guide inside a skill. Reference the relevant procedure and describe the task-specific checks. When the guide changes, inspect its new revision before repeating an old workflow.

## Verify the outcome separately

After an allowed operation, inspect its actual result and the requested behavior. A good answer distinguishes the cited procedure, the observed environment, the action taken, and anything not verified. A successful documentation search is evidence of retrieval, not evidence of a successful deployment.

For connection setup, use [MCP connections]({{< relref "sorti/connect-mcp-services.md" >}}). For stale results or unavailable reads, use [reader troubleshooting]({{< relref "knowledge/troubleshoot-reader.md" >}}).
