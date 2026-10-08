---
slug: how-to-use-inpainting
author:
  name: SiteBay
  email: support@sitebay.org
description: Inpainting regenerates a selected part of an image using a mask and a prompt. Keep the original file
  and work on a copy.
keywords:
- stable diffusion
- help
- beginner
- introduction
tags:
- stable diffusion
- quickstart
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-29
modified_by:
  name: SiteBay
title: Inpaint part of an image
contributor:
  name: SiteBay
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- inpainting
modified: 2026-10-07
---

Inpainting regenerates a selected part of an image using a mask and a prompt. Keep the original file and work on a copy.

## Prepare the edit

Choose an inpainting-compatible model and workflow. Load the image, mask the region to change, and confirm whether the mask marks the area to edit or preserve. Mask conventions can differ between tools.

## Describe one change

Write a prompt for the selected region. Start with a modest change strength when preserving the original appearance matters. Keep the model, seed, and other settings fixed while comparing one parameter.

## Inspect the result

Check edges, lighting, scale, and nearby details. A successful generation can still alter content you intended to preserve. Save an intermediate result before the next edit.

There is no universal denoising value or resolution for every model. Read the [inpainting documentation](https://huggingface.co/docs/diffusers/using-diffusers/inpaint) for the chosen pipeline and the [worked editing sequence]({{< relref "guides/generative-ai/stable-diffusion/how-to-use-inpainting-roid1kan/index.md" >}}) for a repeatable comparison method.
