---
slug: persons
description: 'PostHog People/Users tracking on SiteBay.'
keywords: ["PostHog", "users", "analytics", "sitebay"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-18
modified: 2025-12-04
modified_by:
  name: SiteBay
title: 'People'
tags: ["sitebay", "analytics", "PostHog"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# People Tracking

Numbers on a chart are fine, but eventually, you need to know *who* is actually using your site. Because SiteBay runs your WordPress site on our optimized Kubernetes stack, we can track individual user journeys from their first click to their hundredth purchase.

## The Anatomy of a User

When you look up a person in PostHog, you get the full picture:
- **Events**: Every single action they've taken on your site.
- **Properties**: Where they live, what browser they use, or any custom data (like their WooCommerce lifetime value).
- **Sessions**: A neat history of every time they've visited.

## Grouping People (Cohorts)

Stop treating all traffic the same. You can group users into Cohorts based on exactly what they do:
- "People who added to cart but didn't buy in the last 7 days"
- "Power users who log in every day"
- "Mobile visitors from Canada"

## How to Find Someone

1. Open your SiteBay dashboard and go to **Analytics > People**.
2. Click on any user to open their profile.
3. Scroll through their timeline to see exactly what they've been up to.

## The AI Shortcut

If you don't have time to dig through user profiles, use the **SiteBay MCP Server** or the **SiteClaw** mobile app. You can just ask your AI agent, "Hey, build a list of all the users who experienced a checkout error yesterday and summarize what browsers they were using." 
