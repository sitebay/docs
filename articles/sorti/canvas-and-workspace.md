---
title: Canvas and workspace
description: The workspace holds the surfaces used during a session. The canvas is the selected page or preview
  that the assistant can inspect through its provider's tools.
tags:
- sorti
- canvas
- workspace
published: 2026-06-04
weight: 40
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- canvas and workspace
- sitebay documentation
slug: canvas-and-workspace
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-canvas
- sorti-panels
modified: 2026-10-07
---

The workspace holds the surfaces used during a session. The canvas is the selected page or preview that the assistant can inspect through its provider's tools.

## Select the target

Check the site, provider, environment, and page URL. Select the element or region you want to discuss, then describe a specific change. A screenshot or old selector can become stale after navigation or another edit.

## Edit and verify

Request a small change first. Review the proposed or staged result, then inspect the page at the relevant screen size. Test the affected interaction as well as its appearance.

The provider chooses the write path. A local preview, a WordPress site, and a Shopify theme do not share identical persistence or publishing behavior. A successful preview change is not automatically a published site change.

## Preserve the reviewed revision

A staged change must still match the version you reviewed. When a revision check fails, reread and reconsider the change rather than silently replacing the expected revision.

Canvas history records successful operations to help the session distinguish its own edits from other activity. Recovery and publication still belong to the provider that owns the data.

## Use panels for supporting work

Keep related analytics, Git, security, and files beside the canvas. Use [panel tools]({{< relref "sorti/panels-and-mcp.md" >}}) for focused actions instead of encoding hidden commands in chat.
