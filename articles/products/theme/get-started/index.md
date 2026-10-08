---
slug: sitebay-theme
description: "The SiteBay WordPress Theme is engineered from the ground up for AI agents, utilizing a robust CSS token system and utility classes."
keywords: ['sitebay theme', 'ai-friendly', 'wordpress theme', 'css tokens', 'utility classes', 'design system']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2026-03-12
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "The AI-Native WordPress Theme"
bible: true
tags: ["sitebay", "theme", "wordpress", "ai"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# The AI-Native WordPress Theme

Traditional WordPress themes are a nightmare for AI agents. They're bloated with deeply nested PHP logic, thousands of lines of unstructured CSS, and arbitrary ID selectors. When an AI tries to change a button color, it usually breaks the layout somewhere else.

We threw that architecture out. Every SiteBay installation ships with the **SiteBay Theme**—a hyper-minimal, lightning-fast foundation engineered specifically to be manipulated by Large Language Models.

## How It Works: Tokens and Utilities

We designed the theme to be as predictable and systematic as an API.

### 1. The Token System (CSS Custom Properties)
We stripped out hardcoded values. Everything from typography to brand colors is governed by a strict set of CSS variables defined in the `:root`. 

| Token | Default Value | Purpose |
|-------|---------------|-------------|
| `--color-primary` | `#1a1a2e` | The core brand identity. |
| `--color-accent` | `#e94560` | High-contrast call-to-actions. |
| `--space-4` | `1rem` | Baseline layout spacing. |

Because the design system is centralized, an AI agent only needs to edit a handful of tokens at the top of `style.css` to completely overhaul the look and feel of the entire site.

### 2. Utility Classes
Instead of writing custom CSS for every new component, the theme includes a comprehensive library of utility classes (e.g., `.flex`, `.p-4`, `.text-center`). 

This means when Claude (via MCP) or SiteClaw builds a new landing page, it doesn't have to write fragile, custom stylesheets. It just applies the existing utility classes directly to the HTML structure. The result is perfectly consistent styling that never bloats your CSS payload.

## The "Image-to-Theme" Workflow

Because the underlying system is so predictable, the SiteBay Theme unlocks incredible workflows. 

You can drop a screenshot of an incredibly designed modern website into **SiteClaw** and say:
> *"Extract the design system from this image and apply it to my SiteBay theme."*

The AI will parse the hex codes, identify the typographic hierarchy, map them to your CSS tokens, and deploy the new `style.css` to your container in seconds. 

## Built for Humans, Too

Just because it's built for bots doesn't mean it sucks for humans. 
*   **Gutenberg Ready:** Full native support for the WordPress Block Editor and modern block patterns.
*   **Zero Bloat:** It loads instantly. There are no heavy JavaScript frameworks or slider plugins baked in.
*   **Developer Experience:** If you want to dive in manually, you can open the integrated Code Server IDE and extend the theme cleanly, knowing the foundation is rock solid.
