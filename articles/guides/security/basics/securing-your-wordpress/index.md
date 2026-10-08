---
slug: securing-your-wordpress
description: "How SiteBay secures your WordPress infrastructure at the edge, server, and application layers."
keywords: ['security', 'firewall', 'waf', 'malware', 'ssl', 'kubernetes security']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "Security on SiteBay"
bible: true
tags: ["sitebay", "security", "infrastructure"]
aliases: ['/guides/security/basics/securing-your-wordpress/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Security on SiteBay: Defense in Depth

WordPress powers over 40% of the web, making it a primary target for automated botnets and malicious actors. At SiteBay, we believe security should not rely on installing bloatware plugins. Instead, we implement a **defense-in-depth** strategy at the infrastructure level.

## Layer 1: Edge Security (Cloudflare)

Before traffic even reaches our servers, it must pass through our enterprise-grade edge network, powered by Cloudflare.

*   **DDoS Protection:** Our network automatically detects and mitigates massive Distributed Denial of Service attacks, absorbing the traffic at the edge so your origin server never notices a spike in load.
*   **Web Application Firewall (WAF):** We deploy custom firewall rules specifically designed to block common WordPress vulnerabilities (like SQL injections, cross-site scripting, and xmlrpc.php abuse) before they touch your application.
*   **Automated SSL:** All traffic is encrypted in transit. SSL certificates are provisioned automatically via Let's Encrypt and renewed indefinitely.

## Layer 2: Kubernetes Isolation

Traditional shared hosting puts hundreds of websites on a single server, meaning if one site gets hacked, the entire server is compromised. SiteBay eliminates this vector.

*   **Container Sandboxing:** Every SiteBay WordPress site runs in its own tightly isolated Kubernetes pod. It has its own dedicated filesystem and processes.
*   **Read-Only Core:** The core WordPress files and the infrastructure configuration files are marked as read-only. Even if an attacker exploits a vulnerability in a theme, they cannot modify the core system or install persistent backdoors.
*   **Database Isolation:** Databases are run on separate, dedicated infrastructure and are not accessible from the public internet—only your specific WordPress pod can connect to its corresponding database.

## Layer 3: Application & AI Security

We secure the day-to-day operations and application management.

*   **Single Sign-On (SSO):** Access to your WP Admin, phpMyAdmin, and Code Server is protected by SiteBay's primary authentication layer. We recommend enforcing Multi-Factor Authentication (MFA) on your SiteBay account.
*   **Malware Scanning:** Our systems actively scan `wp-content` for known malware signatures and suspicious file modifications.
*   **Point-in-Time Recovery:** True security means resilience against failure. If an attack does occur (e.g., via a zero-day exploit in a plugin), our continuous Point-in-Time Machine allows you to instantly revert the site to the minute before the breach occurred.

## Security for AI Agents

With the introduction of the **SiteBay MCP Server** and **SiteClaw**, AI agents can interact directly with your infrastructure.

*   **Scope Limitation:** Agents inherit the strict permissions of the user API key they are authenticated with. They cannot bypass Kubernetes isolation.
*   **Audit Trails:** Every command executed by an AI agent (whether running WP-CLI commands, editing files via search/replace, or managing backups) is logged and visible within the SiteBay dashboard and the SiteClaw timeline.
