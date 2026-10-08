---
slug: how-to-migrate-your-site
description: "A comprehensive guide to migrating an existing WordPress site to SiteBay's Kubernetes infrastructure."
keywords: ['migration', 'move wordpress', 'transfer site', 'import', 'sitebay migration']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "How to Migrate to SiteBay"
bible: true
tags: ["sitebay", "migration", "getting started"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# How to Migrate Your Site to SiteBay

Moving a live, high-traffic website can be stressful. SiteBay simplifies the migration process with automated tools and expert support, ensuring your transition to our AI-native Kubernetes platform is seamless and devoid of downtime.

## Migration Methods

We offer three primary ways to move your existing WordPress site to SiteBay:

### 1. Automated Concierge Migration (Recommended)
Our automated system securely connects to your existing host, packages your site, and imports it directly into a new SiteBay container.

1.  Log in to the SiteBay Dashboard and click **Create Site**.
2.  Select the **Migrate Existing Site** option.
3.  Provide the URL of your current site, and standard WordPress admin credentials (an Administrator username and password).
4.  SiteBay's migration engine will log in, install a temporary export plugin, package your database and `wp-content`, and securely transfer it over our private network.
5.  You will receive an email (and a push notification via SiteClaw) when the migration is complete.

### 2. Manual ZIP Upload
If your current host blocks automated connections, or if you prefer to migrate a site from a local development environment (like XAMPP or Local), you can upload a ZIP archive.

1.  On your old host, create a ZIP file containing your database (as an `.sql` file) and your `wp-content` folder.
2.  In the SiteBay Dashboard, choose **Migrate via ZIP**.
3.  Drag and drop your archive. Our system will automatically parse the database, replace old URLs with your temporary SiteBay URL, and unpack your files.

### 3. WordPress.com Export
If you are moving away from the proprietary WordPress.com platform:

1.  Export your site data from WordPress.com as an XML file.
2.  Deploy a fresh, blank site on SiteBay.
3.  Log into your new SiteBay WP Admin, install the official WordPress Importer plugin, and upload the XML file.

## Post-Migration Checklist

Once your site is successfully imported onto a temporary SiteBay URL (`*.sitebay.org`), we recommend verifying the following before pointing your live domain:

1.  **Visual Inspection:** Click around the temporary URL to ensure themes and images load correctly.
2.  **Review the PostHog Logs:** Open the PostHog dashboard (Analytics > PostHog) and check for any immediate JavaScript errors or broken API calls that might have been caused by the change in environment.
3.  **Clear Caches:** Ensure any old caching plugins (like WP Rocket or W3 Total Cache) are deactivated, as SiteBay provides superior server-level caching automatically.

## Going Live (DNS Cutover)

When you are ready to make the switch:

1.  Go to the **Domains** tab in your SiteBay dashboard and add your custom domain.
2.  Log in to your domain registrar (e.g., GoDaddy, Namecheap) and update your nameservers to SiteBay's, or point your A record to the provided IP address.
3.  SiteBay will automatically provision a free SSL certificate via Let's Encrypt within minutes of the DNS propagating.
