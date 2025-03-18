---
title: Grant a Developer Access a WordPress Site or SiteBay Account
description: Shows how to create an account with access restrictions for developers and maintainers.
keywords: ["accounts", "passwords", "sitebay manager", "manager", "security"]
tags: ["ssh","sitebay platform","drupal","security","mysql","wordpress"]
published: 2024-04-26
modified: 2024-03-14
modified_by:
  name: SiteBay
aliases: ['/platform/create-limited-developer-account/','/guides/create-limited-developer-account/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

One of the most powerful features of SiteBay's unmanaged service is the amount of control SiteBay users have over their account and the software installed on their systems. If you're a business owner that does not have expertise with installing or maintaining software on Linux, or if you do have experience with Linux but don't have the time to set up a new server, then contracting with a developer or administrator is a popular way to get your services up and running.

## What to Keep Track of when Hiring a Developer

When you hire someone to work on your SiteBay, there are a variety of ways to grant access to your SiteBay account, the WordPress Sites on it, and the system and applications on those instances. Recording which of these credentials you've shared is important in the event that you need to end your contract with your developer.

This guide explains and answers some of the most frequently asked questions about account access. The sections are separated in order of granularity, starting with service-level access at the top, and working towards application-specific access.

For security and privacy, [SiteBay Support](/docs/products/platform/get-started/guides/support/) is not able to troubleshoot issues related to users and application access. 

{{< note >}}
The following sections include commands that show how to manipulate credentials on your WordPress Sites, and these commands use `exampleUser` in place of your users' names. Replace `exampleUser` with whatever you would like to name your users.
{{< /note >}}

## My SiteBay Access

Access to the My SiteBay provides high-level methods for controlling your WordPress Sites and SiteBay billing, including but not limited to: powering WordPress Sites down, powering them on, removing services, and adding services. The My SiteBay does not have interfaces for manipulating the files and software on your systems--instead, that access is governed by service-specific credentials outlined in the next sections.

### Who Has Access to My SiteBay Account?

Log in to the My SiteBay and navigate to the [**Users and Permissions**](https://my.sitebay.org/account/users) section of the **Account** tab. You may be prompted to reauthenticate your password. This section will display all of your SiteBay account's users.

If you're not sure whether you're logged in as the account administrator, look for a `No` in the **Restricted** column of your username's row in the User Manager.

### Add a User to the SiteBay Account

Keep your account administrator credentials secret. When hiring an external individual or agency to work on your site or application, create a *restricted* user and assign specific access to the account. Learn more about how to manage users and permissions and how to recover a lost username in our [Accounts and Passwords](/docs/products/platform/accounts/guides/manage-users/#users-and-permissions) guide.


### Revoke a User's Access to the SiteBay Account

1. If you suspect that the user may have access to the My SiteBay password, [change that first](/docs/products/platform/accounts/guides/manage-users/#changing-your-sitebay-manager-password).

1. Log in to the [My SiteBay](https://my.sitebay.org/) and click [**Users and Permissions**](https://my.sitebay.org/account/users) in the **Account** tab. You may be prompted to reauthenticate your password.

1. Locate the user in the Username column, and click the three dots and select **Delete** to remove the user. Click **Delete** to confirm deletion.

