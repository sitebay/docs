---
slug: design-site-from-image-cline-roo
author:
  name: SiteBay
  email: support@sitebay.org
description: Use a reference image to describe the layout and visual hierarchy, then implement and test the page
  in a development environment.
keywords:
- cline
- roo
- ai
- website design
- image to website
- siteclaw
tags:
- web design
- ai
- cline
- siteclaw
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2025-03-16
title: Build a page from a visual reference
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- sorti-canvas
- editor-bridge
- wp-theme
---

Use a reference image to describe the layout and visual hierarchy, then implement and test the page in a development environment.

## Define the target

Choose a reference you have permission to use. Explain the page's purpose, required content, important interactions, and mobile behavior. A screenshot does not define hidden states or backend behavior.

## Work in the right project

Open the intended site or repository. In Sorti, select the canvas and environment; in an editor-based assistant, verify the workspace and permitted tools. Keep credentials out of reference images and prompts.

## Build in small changes

Start with structure, then typography, spacing, and responsive behavior. Reuse the project's components and design tokens. Ask for a diff and preview rather than replacing the entire theme without review.

## Verify

Compare the page at narrow and wide widths. Test navigation, forms, keyboard access, and real content lengths. A close screenshot match does not prove the page is functional or accessible.

Use [Canvas and workspace]({{< relref "sorti/canvas-and-workspace.md" >}}) and [the Agent Bridge]({{< relref "vscode/setup.md" >}}) for the current SiteBay workflows. Client-specific setup belongs to that client's maintained documentation.
