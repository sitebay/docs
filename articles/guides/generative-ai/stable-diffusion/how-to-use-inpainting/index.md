---
slug: how-to-use-inpainting
author:
  name: SiteBay
  email: support@sitebay.org
description: 'Modern Photoshop for free in Stable Diffusion (AUTOMATIC1111 tutorial)'
keywords: ['stable diffusion','help','beginner','introduction']
tags: ["stable diffusion","quickstart"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-29
modified_by:
  name: SiteBay
title: "Basic inpainting guide"
contributor:
  name: SiteBay
---

## What Is Inpainting?
Inpainting is the process of modifying parts of an image with AI. You can alter images as subtly or as drastically as you like, correct mistakes, and take your pictures to a new level. 

Here is the basic process:

- Use the canvas tool in the User Interface (UI) to paint a mask over the part you want to alter.
- Write a prompt describing what you want to change.
- Generate the new image.

## Basic Settings 

Each setting in the Inpainting tab has a specific function:

- **Mask Blur:** This setting is typically left at its default value of 4.
- **Mask Mode:** 'Inpaint Masked' alters what’s under the mask, while 'Inpaint not Masked' does the opposite. In most cases, you use 'Inpaint Masked'.
- **Masked Content:** This adjusts how your inpaint will be generated.
  - Fill: Generates noise using the colors inside the mask, causing more drastic changes.
  - Original: Uses what’s already under the mask. Minor adjustments keep what's in the mask almost the same.
  - Latent noise: Generates pure noise to work from scratch. Use this to add new content to the image.
  - Latent nothing: A worse Latent Noise. Not recommended.
- **Inpaint Area:** 'Whole Picture' redraws the entire picture using the resolution set; 'Only Masked' redraws only the mask region, leaving everything else at the original resolution.
- **Masked Padding, Pixels:** Determines how far the AI looks outside the mask to generate content.
- **Resize Mode:** Typically left on 'Just Resize'.
- **Sampling Method, Sampling Steps:** Similar to txt2img or img2img settings.
- **Resize to:** Input the resolution of your mask.
- **Batch count, batch size, CFG scale, seed:** Same as for txt2img and img2img.
- **Denoising Strength (DS):** Influences how much noise is poured into the mask before the inpaint process. Higher values result in more drastic changes.

An important setting : Whole Picture will redraw the full picture using the resolution you set while inpainting the mask region. 
Only Masked will only redraw the mask region in the resolution you set, leaving everything else untouched, including the base resolution of your picture. Make sure to have this checked.

### Only masked padding, pixels
This setting is also very important. When inpainting using Only Masked, the AI will grab a certain amount of pixels around the mask you drew to get context. This slider determines how many pixels it takes. You can think of it as “how far does the AI look around to determine what it will produce”.
At 0, the AI will ONLY look at the mask and nothing else.
At 256, it will look at a fairly large amount of pixels around the mask.   
So what do we set up on? When inpainting for details or for altering elements like clothes, jewelry, hair and such, keep as much padding as you can. 
When you wanna modify an element or add an element, keep the padding low. The lower the padding, the more the AI will do its own thing. Set it higher, (closer to 256) to make minor changes to the area.


## Checkpoints and VAE

Any checkpoint can do Inpaint. Your selected Checkpoint and VAE will influence the style, colors, and how prompts are parsed.

## The Canvas

This is where you load your images and draw masks. Buttons include:

- Erase: Erases the mask.
- Remove: Removes the current picture.
- Brush size slider: Adjusts the size of the brush.
- Color picker: Changes the mask color for personal preferences.


## Advanced Tips

- Manual Edits: Make edits using a photo editor/drawing software before your inpaints.
- Drawing and Inpaint Sketch: Draw what you want in a dedicated app or directly on the canvas using Inpaint Sketch.
- Collage: Use inpaint to blend external elements into your image.
  
It may require iterating and tweaking your prompts to achieve the desired results.

If there's a visible division between the inpainted area and the rest of your image using normal inpainting, we can fix this with the new Soft inpainting feature. Click below.

## Advanced Inpainting Guides
For more in-depth guides by read below
* [Advanced inpainting guide by RoiD1kan](/docs/guides/how-to-use-inpainting-roid1kan/)
* [Soft inpainting guide](/docs/guides/how-to-use-soft-inpainting/)

