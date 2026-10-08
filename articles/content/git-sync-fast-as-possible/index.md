---
slug: git-sync-fast-as-possible
authors:
- SiteBay
contributors:
- SiteBay
description: The recorded demonstration is historical UI context. Use the current instructions below when a menu,
  branch selector or operation differs from the video.
keywords:
- what is SiteBay
tags:
- SiteBay
- kubernetes
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-29
modified_by:
  name: SiteBay
title: Git Sync demonstration and current workflow
doc_sources:
- git-sync
- lifecycle
modified: 2026-10-07
---

The recorded demonstration is historical UI context. Use the current instructions below when a menu, branch selector or operation differs from the video.

{{< youtube VvhQrbbHoqA >}}

## What to verify today

Connect the intended repository through a supported provider account, validate the root `wp-content/` layout, and confirm the target branch and site environment. Review the initial sync direction before allowing existing files to change.

A repository commit and a successful deployment are distinct. Inspect the sync health and running site after a test edit. The video does not establish a fixed latency, zero-conflict collaboration, risk-free staging or unlimited rollback for the current product.

## Files are not the entire site

Git tracks only selected files. Database content and ignored uploads require their own recovery coverage. Preserve a verified checkpoint before promoting staging or restoring live state, and retain the operation's result until application checks pass.

Continue with [Connect and verify Git Sync]({{< relref "products/git-sync/get-started/index.md" >}}) for the source-grounded procedure.
