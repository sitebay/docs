---
slug: data-management
description: 'PostHog data management on SiteBay.'
keywords: ["sitebay", "data management", "posthog", "analytics"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases: ['/quick-answers/sitebay/how-to-use-posthog/', '/quick-answers/how-to-use-posthog/']
modified: 2025-12-04
modified_by:
  name: SiteBay
published: 2024-04-04
title: Data Management
tags: ["sitebay", "posthog", "data management"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Data Management

Your analytics are only as good as your data. SiteBay's integrated PostHog setup makes it super easy to keep your event data clean, organized, and actually useful.

## The Basics

Here's the jargon you need to know:

| Term | What it actually means |
|------|------------|
| **Events** | Stuff users do (clicking buttons, viewing pages, custom tracking). |
| **Actions** | A bunch of events grouped together (like "Watched a video" AND "Clicked subscribe"). |
| **Properties** | Extra details attached to an event (like the user's plan type or browser). |
| **Annotations** | Little notes you can leave on your timeline (e.g., "Launched the new homepage today"). |

## Keep It Clean

Don't let your dashboard turn into a dumpster fire of useless data:
1. **Merge duplicates**: If you have three different events that all mean "Sign Up", combine them into one Action.
2. **Hide the noise**: Filter out internal traffic or events you don't care about anymore.
3. **Describe things**: Leave notes so the rest of your team knows what `btn_clk_final_3` actually means.

## AI Cleanup with SiteBay MCP

If you're using our **SiteBay MCP Server**, you can actually have your AI agent help maintain your data dictionary. Just ask Claude to "Review my PostHog events from last week and flag any undocumented custom events." 

## Where to Find It

Go to **Dashboard > Analytics > Data Management** in your SiteBay control panel to start tidying up.
