---
slug: outgoing-bandwidth
authors: ["SiteBay"]
contributors: ["SiteBay"]
modified_by:
  name: SiteBay
description: "Learn how your Site's outgoing data transfer is calculated."
keywords: ["network","billing","account","transfer", "overage"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-21
modified: 2024-04-03
title: "Outgoing Bandwidth"
tags: ["sitebay platform"]
aliases: ['/platform/billing-and-support/outgoing-bandwidth/']
---

Your *Outgoing Bandwidth* is the total amount of data sent from your site during a monthly billing cycle. 

## Outgoing Bandwidth reset

Your bandwidth quota resets at the start of every new monthly cycle.

### How Overages Work

We don't charge you for bandwidth overages. However, if your site goes way over its allowed monthly bandwidth, we might have to throttle it to keep our Kubernetes clusters running smoothly for everyone. Honestly, we expect less than 0.5% of sites will ever hit this point. 

Incoming data? Never limited. Bring it on.

### How to Mitigate Overages

If you're blowing past your quota, or you see a huge traffic spike coming (maybe you're tracking it in PostHog), you have options to avoid getting throttled:

[Upgrade your plan](/docs/guides/) to get a higher monthly outgoing bandwidth allowance.

## View Bandwidth Out

You can check out your current outgoing bandwidth usage for the month right inside SiteBay Insites.

## More Information

Read the [Billing and Payments](/docs/guides/billing-and-payments/) tutorial for a full rundown of how billing works here at SiteBay.