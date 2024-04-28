---
slug: securing-your-wordpress
author:
  name: Site Bay
  email: support@sitebay.org
description: 'Dive into the basics of securing your WordPress site on Site Bay, including setting up user accounts, configuring a firewall, securing SSH, and disabling unused network services like XMLRPC.'
og_description: 'Kickstart your journey to a more secure WordPress site with Site Bay by configuring a firewall, securing SSH, and disabling unused network services such as XMLRPC.'
keywords: ["security", "secure", "firewall", "quick start"]
tags: ["wordpress","security"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
aliases: ['/securing-your-wordpress/']
modified: 2024-04-19
modified_by:
  name: Site Bay
published: 2024-04-17
title: How to Secure Your WordPress
h1_title: Securing Your WordPress
---

Secure your site against those no-good, unauthorized accesses.

## HTTP Password Authentication

We have tools to help lock down your WordPress site on Site Bay: HTTP Password Auth. These bad boys let you decide who gets in and who gets bounced, ensuring your site stays safe and sound.

Here's the play-by-play on using Site Bay's IP-based firewall and HTTP Password Auth to secure your WordPress site:

Hit up My Site Bay with your email and password to log in.
Jump over to the HTTP Password Auth tab and switch that on for your site.
Your username is always sitebay, and you'll find the password in the tools tab. Now, anyone trying to peep your site needs to know the secret handshake (aka the username and password).

## Wordfence Plugin
### 1. Firewall Protection

Wordfence provides a web application firewall that helps block malicious traffic before it can reach your site. This is essential for preventing attacks that can damage your site or steal sensitive information.

### 2. Malware Scanner

With Wordfence, you can scan your WordPress site for malware, bad URLs, backdoors, SEO spam, malicious redirects, and code injections. Regular scans can help catch threats early before they cause damage.

### 3. Login Security

Wordfence strengthens login security with features like two-factor authentication, which adds an extra layer of security by requiring a second form of identification beyond just a password.

### 4. Live Traffic View

You can monitor your traffic in real-time with Wordfence, seeing exactly who is visiting your site and what they are doing. This feature helps you identify and block suspicious activity instantly.

Wordfence offers a free version that includes firewall, malware scanner, and login security. There’s also a premium version with additional features, which is worth considering if you are managing a business or have traffic.

## Cloudflare

1. **Prevents DDoS Attacks:** IP protection helps to shield your site from Distributed Denial of Service (DDoS) attacks, which can overwhelm your site with traffic and take it offline.
2. **Secures User Data:** Protecting your IP also helps in securing data transactions between your users and your website, essential for maintaining privacy and trust.
3. **Improves Website Performance:** By filtering out harmful traffic, Cloudflare ensures that your website remains fast and accessible for legitimate users.

### IP Block your wp-login.php
#### Find Your IP Address
To protect your login page specifically for your IP, you need to know your current IP address. You can find this by searching "What is my IP address" in any search engine.

#### Create a Firewall Rule
After setting up your site on Cloudflare:

1. Log in to your Cloudflare dashboard.
1. Select your site.
1. Go to the **Firewall** tab.
1. Click **Firewall Rules**.
1. Click **Create a Firewall Rule**.

Here's how to set up the rule:

- **Field**: URI Path
- **Operator**: contains
- **Value**: `/wp-login.php`

Set the action to **Allow** if the IP matches yours, or **Block** to block other IPs.

#### Configuration
- **Rule Name**: Allow WP Login
- **Expression**: `(http.request.uri.path contains "/wp-login.php" and ip.src ne YOUR_IP_ADDRESS)`
- **Action**: Block

Replace `YOUR_IP_ADDRESS` with the IP address you found earlier.

#### Deploy the rule
Once you have set up your firewall rule, click **Deploy**. This action will activate the rule, and it will start protecting your WordPress login page from access by IPs other than your own.



Mastering the Essentials: Your Guide to WordPress Basics on Site Bay

Welcome to the digital age, where your voice, your business, or your portfolio can live online through the power of WordPress hosted on Site Bay. Whether you're crafting your first blog post, setting up an online store, or showcasing a portfolio, understanding the essentials of running a WordPress site is key. This guide will walk you through the WordPress basics tailored for Site Bay users, ensuring you have the foundation to build, grow, and maintain your website with confidence.

What is WordPress?

WordPress is the world's most popular content management system (CMS), empowering individuals and businesses to create and manage their websites without needing to code. From blogs and portfolios to online stores and forums, WordPress's flexibility and ease of use make it the go-to choice for millions of websites worldwide.

Why Choose Site Bay for WordPress Hosting?

Site Bay elevates WordPress hosting with its powerful infrastructure, designed to provide speed, security, and scalability. With Site Bay, you're not just getting a hosting service; you're getting a platform optimized for WordPress, backed by Kubernetes technology for unmatched reliability and performance.

Getting Started with WordPress on Site Bay
1. Creating Your WordPress Site
Sign up for Site Bay and choose your WordPress hosting plan. Whether you're a blogger starting out or a business scaling up, Site Bay has a plan tailored to your needs.
Follow the prompts to set up your WordPress site. Site Bay's intuitive dashboard makes it easy to get your site up and running in minutes.
2. Navigating the WordPress Dashboard

Once your site is live, you'll access the WordPress dashboard, your command center for creating and managing content. Here's a quick overview of key sections:

Posts: Where you'll write and manage blog posts.
Pages: For creating static pages like "About Us" or "Contact."
Appearance: Customize your site's look with themes and widgets.
Plugins: Extend your site's functionality with add-ons for SEO, security, and more.
Settings: Configure your site's settings, including permalinks, comments, and visibility.
3. Choosing a Theme

Your theme dictates your site's appearance and layout. Site Bay offers a wide selection of WordPress themes to suit any style or purpose. Browse the themes directory and preview options to find the perfect look for your site.

4. Adding Content

Creating content on WordPress is straightforward:

For posts: Go to Posts > Add New. Use the editor to write your post, add images, and categorize your content.
For pages: Navigate to Pages > Add New for static content like your home, about, or contact pages.
5. Installing Plugins

Enhance your site's functionality with plugins. From SEO tools to social media integration, the WordPress plugin directory offers thousands of options. To install a plugin, go to Plugins > Add New, search for the plugin, and click "Install Now."

Maintaining Your WordPress Site on Site Bay
Regular Updates: Keep WordPress, themes, and plugins updated to ensure security and performance.
Backups: Site Bay's hosting plans include automatic backups, but it's good practice to manually back up your site periodically.
Security: Utilize security plugins and Site Bay's built-in security features to protect your site from threats.
Leveraging Site Bay's Advanced Features
Staging Environments: Test changes without affecting your live site by using Site Bay's staging environments.
Performance Monitoring: Keep an eye on your site's performance with Site Bay's integrated analytics and monitoring tools.
Conclusion

Starting your WordPress journey on Site Bay sets you up for success, providing a robust platform designed for ease of use, performance, and growth. By mastering these basics, you're well on your way to creating a dynamic online presence. Remember, every great site starts with a single post or page—start building yours today.