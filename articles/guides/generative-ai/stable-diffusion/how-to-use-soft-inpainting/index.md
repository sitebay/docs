---
slug: how-to-use-soft-inpainting
title: Blend an inpainted region
author:
  name: SiteBay
  email: support@sitebay.org
description: Soft inpainting blends generated and original content across a partially transparent mask. Use it when
  a hard transition leaves a visible seam.
keywords:
- corporate memphis
- generation'
- inpainting
tags:
- inpainting
- ai
- stable diffusion
- img2img
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-23
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- inpainting
modified: 2026-10-07
---

Soft inpainting blends generated and original content across a partially transparent mask. Use it when a hard transition leaves a visible seam.

## Start from a comparison

Save the original and generate a baseline edit with the same model, seed, mask, and prompt. Enable **Soft Inpainting** in a WebUI version that provides it, then compare one adjustment at a time.

## Review the controls

Schedule bias changes when original content is preserved during denoising. Preservation strength changes how much is retained in partially masked areas. Transition contrast compensates for contrast lost in blended regions.

The pixel-composite controls adjust the influence of the mask and how image differences affect blending. Read the control's help before changing it; settings interact with the mask and model.

## Inspect the whole image

Compare edges, textures, lighting, and protected content at normal size. Keep the edit only when it improves the intended region without introducing other changes.

Use [the implementation's help text](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/extensions-builtin/soft-inpainting/scripts/soft_inpainting.py) for the installed version. See [inpainting basics]({{< relref "guides/generative-ai/stable-diffusion/how-to-use-inpainting/index.md" >}}) for the common workflow.
