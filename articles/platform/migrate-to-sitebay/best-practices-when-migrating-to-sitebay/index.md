---
slug: best-practices-when-migrating-to-sitebay
authors: ["SiteBay"]
description: 'Best practices when migrating a website to SiteBay.'
keywords: ["migrate", "wordpress migration"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-04-03
modified_by:
  name: SiteBay
published: 2024-04-24
title: Best Practices when Migrating to SiteBay
tags: ["sitebay platform"]
contributors: ["SiteBay"]
aliases: ['/platform/migrate-to-sitebay/best-practices-when-migrating-to-sitebay/']
---

# Best Practices when Migrating to SiteBay

Migrating your WordPress site to SiteBay’s AI-native Kubernetes platform is the best move you can make for performance and scale. Here is how to make sure the transition is buttery smooth.

## The Checklist

1. **Clean Up First**: Don't migrate garbage. Delete old backups, unused themes, and inactive plugins before you start the transfer.
2. **Use the Staging Environment**: SiteBay makes spinning up staging sites trivial. Migrate your site to a staging URL first. Test everything. 
3. **DNS TTL**: Lower the Time-to-Live (TTL) on your DNS records a few days before you plan to switch the nameservers. This makes the final cutover almost instant.
4. **Enable SiteClaw**: Once you're on SiteBay, make sure SiteClaw is active immediately. You want our automated security layer protecting you from day one.
5. **Check PostHog**: Ensure your PostHog integration is flipped on so you can start gathering user metrics the second traffic hits your new platform.

## Next Steps

After your data is moved over and your DNS is pointed to us, your site is officially running on Kubernetes. Take a few days to monitor the site on SiteBay before you cancel your old hosting provider. This gives you a safety net just in case you forgot to grab a specific asset or database table.
