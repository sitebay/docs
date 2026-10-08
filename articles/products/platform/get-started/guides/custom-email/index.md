---
title: "Custom Domain Email on iMail Gmail for Free"
description: "Learn how to send email from your website's domain"
published: 2024-04-04
authors: ["SiteBay"]
contributors: ["SiteBay"]
keywords: ["SMTP", "iMail", "google", "icloud"]
modified_by:
  name: SiteBay
---

SiteBay focuses strictly on running fast, AI-native WordPress on Kubernetes. That means we don't handle email hosting. 

But if you want a custom email address (`you@yourdomain.com`) to look professional, it's pretty easy to set up using services you probably already have. Here's how to do it with Google Workspace (Gmail) or Apple iCloud+ (iMail).

## Option 1: Gmail (Google Workspace)

If you live in Google Docs and Google Calendar, this is the way to go.

1. **Sign Up:** Go grab a Google Workspace plan. They offer a 14-day trial to start.
2. **Verify Your Domain:** Google will give you a TXT record. Just drop that into your SiteBay DNS manager to prove you own the domain.
3. **Set Up the Address:** Follow their wizard to create your new custom email.
4. **Configure DNS:** Make sure you add Google's required SPF and DKIM records so your emails don't end up in people's spam folders.

## Option 2: iMail (Apple iCloud+)

If you're already paying for extra iCloud storage (even the cheap $0.99/month tier), you get custom email domains included for free.

1. **Subscribe:** Make sure you have an active iCloud+ subscription on your Apple ID.
2. **Add Your Domain:** Go to your iCloud settings, find the "Email" section, and hit "Manage" for Custom Email Domain.
3. **Verify:** Apple will give you some DNS records (TXT, MX, etc.). Drop those into SiteBay DNS.
4. **Create Addresses:** Set up whatever custom email addresses you want for the users on your family plan.

Keep your hosting and your email separate—it makes life much easier if you ever need to scale!