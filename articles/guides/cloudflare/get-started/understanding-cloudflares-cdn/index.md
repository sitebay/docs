---
slug: understanding-cloudflares-cdn
description: 'Combine the capabilities of the Cloudflare and Site Bay platforms.'
keywords: ["microsite", "cdn", "high availability"]
tags: ["sitebay platform","cloudflare platform","web server","cdn"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-04-13
modified_by:
  name: Site Bay
published: 2024-04-13
title: Understanding Cloudflare's CDN
aliases: ['/guides/cloudflare/get-started/understanding-cloudflares-cdn/']
authors: ["Site Bay"]
---

This document provides a simple guide to understanding Cloudflare's Content Delivery Network (CDN) with WordPress.

Cloudflare’s CDN drastically improves website loading speed by caching a site’s content and distributing it across a network of servers worldwide. This ensures that users worldwide get faster access to the website, regardless of their location. 

## Cloudflare’s CDN on Site Bay WordPress Platform

Basically it speeds up your WordPress website. It automatically caches your website and serves it to your visitors from their nearest server location. 

## Advantages of Using Cloudflare’s CDN

By using Cloudflare's CDN your WordPress site can load faster and provide a better user experience. This can lead to higher visitor engagement and improved SEO ranking.

## Set up

### In Cloudflare
Start by signing up for a Cloudflare account, add your website and change your domain name servers to Cloudflare. Once your Domain Name Server propagates, you can enable CDN settings inside your Cloudflare dashboard.
Set your domain's CNAME to washington.sitebay.org

If you want to disable the CDN, turn on development mode. 
For big site updates, be sure to click clear cache.
### In My Site Bay
Create a new site with the domain you set up in Cloudflare. You are now using Cloudflare's free and fast CDN.