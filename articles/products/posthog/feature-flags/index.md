---
slug: feature-flags
description: "PostHog feature flags for A/B testing on SiteBay."
keywords: ["feature flags", "A/B testing", "sitebay", "posthog"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-27
modified: 2025-12-04
modified_by:
  name: SiteBay
title: "Feature Flags"
tags: ["sitebay", "feature flags", "A/B testing"]
aliases: ['/quick-answers/sitebay/how-to-use-feature-flags/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Feature Flags

Deploying changes shouldn't be terrifying. With SiteBay's native PostHog integration, you can use Feature Flags to toggle new features on or off without touching your code or redeploying your WordPress site. 

Want to run an A/B test on your new pricing page? Easy.

## Rolling Out a Feature

1. Go to **Analytics > Feature Flags > New** in your SiteBay dashboard.
2. Give it a name (e.g., `new-checkout-flow`).
3. Set your rollout percentage. Start small (like 10%) so you don't break things for everyone at once.
4. Save it.

## How You Can Target Users

| Targeting | When to use it |
|------|-----|
| **% Rollout** | Great for safe, gradual rollouts to a random sample of traffic. |
| **User Property** | Only show the feature to users with a specific trait (like `is_admin = true`). |
| **Cohort** | Target specific groups, like "Users who signed up last month". |

## Real-World A/B Testing

1. Create a flag with a control and test variant.
2. Split traffic 50/50.
3. Let it run for a week or two.
4. Check the Experiments tab to see which version actually drove more conversions.

## Code Example

```javascript
if (posthog.isFeatureEnabled('new-checkout-flow')) {
  showAwesomeNewCheckout();
} else {
  showBoringOldCheckout();
}
```

## AI Control via MCP

This is where it gets really cool. Because SiteBay is an AI-native platform, your AI agents can manage feature flags for you using the **SiteBay MCP Server**. You can literally tell Claude: *"Turn off the `new-checkout-flow` flag immediately, it's causing errors,"* and it's done. You can also toggle flags right from the **SiteClaw** mobile app if you're out to lunch when a feature breaks.
