---
title: Get Started
title_meta: "Getting Started with the Site Bay API"
description: "Get started with the Site Bay api. Learn to get an access token and learn about OpenAPI and swagger."
tab_group_main:
    weight: 60
published: 2024-04-23
modified: 2024-04-23
aliases: ['/products/tools/sitebay-api/get-started/','/platform/api/getting-started-with-the-sitebay-api-new-manager/','/platform/api/getting-started-with-the-sitebay-api/','/guides/getting-started-with-the-sitebay-api/','/products/tools/sitebay-api/guides/build-final-query/']
tags: ["managed hosting"]
---


# Getting Started with the Site Bay API: A Comprehensive Guide

The Site Bay API offers a wealth of options for developers looking to automate aspects of web hosting, site management, and integration of various online services. Whether you're running an agency or managing multiple websites, Site Bay's API can enhance your operational efficiency through automation. This article serves as an introduction to working with the Site Bay API, covering key functions, and providing guidance on how you can leverage this powerful tool.

### Overview of the Site Bay API

The Site Bay API provides endpoints covering a wide range of functionalities including site management, domain verification, user events, team collaboration, and payment processing. With thorough documentation available through swagger at [Site Bay API Docs](https://my.sitebay.org/docs) and an SDK available on [GitHub](https://github.com/sitebay/sitebay-sdk), developers have all the resources they need to start integrating the API quickly.

### Essential API Functions

Here's a breakdown of some essential categories and functions that you’ll frequently interact with when using the Site Bay API:

#### Site Management
- **Manage Live Sites**: Create, update, and delete live sites.
- **Backup and Restore**: Handle point-in-time restores, file backups, and manage external paths.
- **Staging Environments**: Set up and manage staging sites, including committing changes to live environments.

#### Team Collaboration
- **Team Management**: Create teams, manage members, and handle invites.
- **Ticketing System**: Issue and track support tickets within your team.

#### User and Account Management
- **User Profiles**: Access and edit details for the current user or other users within your account.
- **Shopify Store Integration**: Manage Shopify store details linked to your account.

#### Billing and Payments
- **Payment Processing**: Set up stripe checkout sessions for team purchases.
- **Customer Portal**: Manage billing details and payment methods through the customer portal.

#### Domain and Repository Management
- **Domain Verification**: Check and verify domain ownership and configurations.
- **Git Repository Integration**: Verify and manage git repository syncs related to your projects.

### Getting Started: API Authentication and Setup

Before you begin utilizing the Site Bay API, you'll have to set up authentication. Site Bay API uses Oauth2 for secure API access, which means you'll need to sign up for an agency plan.

### Example: Creating a New Site

To create a live site, you can use the `POST` method to `/f/api/v1/site_live`. Before making this request, ensure you are authorized with a valid access token.

Here’s an example using cURL:
```bash
curl -X POST https://my.sitebay.org/f/api/v1/site_live \
-H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
-d 'site_name=example' \
-d 'region_id=1'
```

### Documentation and Support

Comprehensive API documentation is available, facilitating easy integration and troubleshooting. For developers looking for guidance, the support team is accessible via the ticketing system in the API, ensuring you can get help when you need it.

### Conclusion

The Site Bay API offers robust capabilities for website and team management, making it invaluable for developers managing extensive web properties or deploying integrated services. With easy-to-follow documentation and robust endpoint security, you can start automating your workflows securely and efficiently. Begin by exploring the API, testing endpoints, and incorporating them into your projects to experience enhanced productivity and streamlined operations.