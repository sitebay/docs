---
slug: events
description: "PostHog event tracking on SiteBay."
keywords: ['PostHog', 'events', 'tracking', 'sitebay']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-19
modified: 2025-12-04
modified_by:
  name: SiteBay
title: "Events"
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Events Tracking

Tracking user actions on your WordPress site shouldn't require a Ph.D. in Tag Management. Because SiteBay is deeply integrated with PostHog at the Kubernetes platform level, we automatically track the important stuff from the second your site goes live.

## What We Track Automatically

- Page views
- Clicks (buttons, links, you name it)
- Form submissions
- When sessions start and end

## Custom Events

Want to track something specific, like when someone upgrades their WooCommerce subscription? You can drop a quick custom event:

```javascript
posthog.capture('subscription_upgraded', {
  plan: 'pro_annual',
  source: 'pricing_table'
});
```

## Making Sense of Events

Once the data is flowing, you can use these tools to figure out what's going on:

| Tool | Why you care |
|------|-----|
| **Trends** | See if an event is happening more or less over time. |
| **Funnels** | Find out where people are dropping off before buying. |
| **User Paths** | Look at the actual routes people take through your site. |
| **Retention** | See if people who trigger an event actually come back later. |

## The AI Angle

Don't want to dig through charts? Open up the **SiteClaw** mobile app and ask your AI assistant to summarize your key events for the day. You can also use the **SiteBay MCP Server** to build agents that react to specific user events in real-time.

## Get Started

Jump into **Dashboard > Analytics > Events** in your SiteBay manager to see the live feed.
