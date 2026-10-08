---
title: Get Started
title_meta: "Getting Started with the SiteBay API"
description: "Get started with the SiteBay api. Learn to get an access token and learn about OpenAPI and swagger."
tab_group_main:
    weight: 60
published: 2024-04-23
modified: 2024-04-23
aliases: ['/products/tools/sitebay-api/get-started/','/platform/api/getting-started-with-the-sitebay-api-new-manager/','/platform/api/getting-started-with-the-sitebay-api/','/guides/getting-started-with-the-sitebay-api/','/products/tools/sitebay-api/guides/build-final-query/']
tags: ["managed hosting"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
modified_by:
  name: SiteBay
---

# Getting Started with the SiteBay API

Want to script your way through SiteBay? The SiteBay API gives you complete programmatic control over your AI-native WordPress platform. Since we run on Kubernetes, spinning up and managing sites is lightning fast, and our API lets you wire all that power directly into your own tools.

Whether you're building custom dashboards, automating agency workflows, or hooking into the SiteBay MCP Server to let AI agents manage your infrastructure, our API is your front door.

### The Basics

The SiteBay API covers everything you need:
- **Site Management**: Spin up, scale, and delete WordPress sites on our Kubernetes clusters.
- **Backups & Restores**: Trigger point-in-time restores or grab file backups.
- **Staging**: Push changes back and forth between staging and production without breaking a sweat.
- **Team Ops**: Manage access, send invites, and handle support tickets.

You can check out the full Swagger documentation at [my.sitebay.org/docs](https://my.sitebay.org/docs) or grab our SDK over on [GitHub](https://github.com/sitebay/sitebay-sdk).

### Authentication

We use OAuth2 for API access. To get started, you'll need to generate an access token from your SiteBay dashboard. Just grab your token, and you're ready to make requests.

### Quick Example: Spin Up a Site

Ready to launch a new live site? Just hit the `/f/api/v1/site_live` endpoint. 

Here's how you do it with cURL:

```bash
curl -X POST https://my.sitebay.org/f/api/v1/site_live \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -d 'site_name=my-awesome-site' \
  -d 'region_id=1'
```

Boom. Your new WordPress site is provisioning on Kubernetes.

### Hooking up AI with SiteBay MCP Server

If you're using Claude or other AI agents, don't miss the SiteBay MCP Server. It bridges the gap between your AI assistant and the SiteBay API, letting you just *tell* the AI to manage your sites, run updates, or check logs. It's the ultimate way to experience an AI-native platform.

Dive into the docs, grab your token, and start building!
