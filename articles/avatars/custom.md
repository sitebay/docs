---
title: Import an avatar
description: Import a GLB avatar and inspect the resulting manifest before using it in a speaking session.
tags:
- sitebay
- avatars
- voice
published: 2026-04-28
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- bring your own avatar
- sitebay documentation
slug: custom
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- avatar-contract
modified: 2026-10-07
---

Import a GLB avatar and inspect the resulting manifest before using it in a speaking session.

## Prepare the model

Use an asset you own or have permission to use. Keep its attribution and license with the import. Check the model's geometry, materials, orientation, and size in a preview.

## Check speech support

The import classifier reports a viseme tier from the actual model bytes: `oculus`, `arkit`, `vrm`, `minimal`, or `none`. These describe the available mouth controls, not a general quality score.

A model can look correct while lacking usable mouth shapes. A malformed file is an import error, not a valid model with a `none` tier.

## Verify the selected avatar

Preview a short spoken phrase. Check mouth movement, framing, and the selected appearance. Keep the model and its manifest together; do not infer speech support from a catalog thumbnail.

Read [Viseme tiers]({{< relref "avatars/visemes-explained.md" >}}) for the meaning of each result.
