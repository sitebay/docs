---
slug: migrate-a-wordpressdotcom-site-to-sitebay
authors: ["SiteBay"]
description: 'Shows how to export posts from a WordPress.com website and import them to WordPress on a SiteBay.'
keywords: ["wordpress", "wordpress.com", "migrate", "website migration"]
tags: ["sitebay platform","wordpress"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-04-04
modified_by:
  name: SiteBay
published: 2024-04-04
title: How to Migrate a WordPress.com Website to SiteBay
external_resources:
 - '[WordPress.com: Moving to Self-Hosted WordPress](https://move.wordpress.com/)'
contributors: ["SiteBay"]
aliases: ['/platform/migrate-to-sitebay/migrate-a-wordpressdotcom-site-to-sitebay/']
---

# Migrate from WordPress.com to SiteBay

Outgrown the limitations of WordPress.com? It happens. When you're ready for real control, migrating your content to SiteBay’s AI-native Kubernetes platform is the next logical step. You'll get blazingly fast performance and the freedom to install whatever themes and plugins you want.

{{< note >}}
The built-in WordPress.com export tool grabs your pages, posts, and comments, but it leaves your themes and widgets behind. You’ll need to set up your design again once you land on SiteBay.
{{< /note >}}

## Making the Move

### Step 1: Spin Up Your SiteBay Environment

Log into your My SiteBay dashboard and launch a new WordPress site. Thanks to our Kubernetes infrastructure, your new server will be provisioned and ready in seconds. Ensure you pick a plan with enough storage for all your existing media.

### Step 2: Grab Your Content from WordPress.com

1. Jump into your WordPress.com dashboard, head to `Settings`, and hit the `Export` option.
2. Click `Export All`, then `Download`. You'll get a zip file packed with XML files containing your site's DNA. (They'll email you a backup link too).
3. Unzip that file on your local machine.

### Step 3: Import to SiteBay

1. Log into your fresh SiteBay WordPress admin panel.
2. Go to `Tools > Import`. Look for the WordPress option at the bottom of the list and hit `Install Now`, then `Run Importer`.
3. Click `Choose File` and select the XML file you unzipped earlier. 
4. **Crucial Step**: When the next screen asks, make sure you check the box for *Download and import file attachments*. This ensures all your images come over. Assign the posts to an existing user (you) and hit submit.

### Step 4: Fix Your Links

WordPress.com uses a specific URL structure. Let's make sure we match it so you don't break your SEO.

1. Go to `Settings > Permalinks` in your SiteBay WordPress admin.
2. Select the `Day and name` option. This perfectly mirrors the WordPress.com setup. Save your changes.

## Next Steps

With your content moved over, it's time to make the site yours. Install a killer theme, set up your plugins, and flip on the SiteBay features. We highly recommend activating SiteClaw for automated security and PostHog for deep user analytics right out of the gate.
