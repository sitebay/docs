---
slug: get-started-code-server
description: "Develop directly on your WordPress servers with SiteBay's integrated Code Server (VS Code in the browser)."
keywords: ['code server', 'vs code', 'ide', 'development', 'browser ide', 'sitebay features']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "Integrated IDE: Code Server"
bible: true
tags: ["sitebay", "development", "ide", "tools"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Integrated IDE: Code Server

Traditional WordPress development often requires a complex local environment (like Docker, XAMPP, or Local by Flywheel), followed by pushing changes over FTP or Git. 

SiteBay streamlines this by providing a fully-featured, cloud-based IDE natively attached to every WordPress site: **Code Server**.

Code Server is essentially Microsoft's Visual Studio Code running securely on your SiteBay Kubernetes infrastructure, accessible directly through your web browser.

## The Cloud-Native Development Experience

By moving the IDE to the cloud, you eliminate the "it works on my machine" problem. 

*   **Zero Setup:** Click a button in the SiteBay Dashboard, and within seconds, you have a VS Code instance loaded with your site's exact file system, PHP version, and environment variables.
*   **Direct Access:** Edit your theme files, tweak custom plugins, or modify `wp-config.php` securely, knowing you are working on the actual environment.
*   **Integrated Terminal:** Code Server includes a fully functional Linux terminal. You can run WP-CLI commands (`wp plugin install ...`), Composer (`composer require ...`), or npm scripts directly on your server.

## Features

Since it's built on VS Code, you get the features you expect from a modern IDE:
*   IntelliSense syntax highlighting and auto-completion for PHP, JavaScript, CSS, and HTML.
*   A robust extension ecosystem (install linters, Git tools, and theme formatters).
*   Global search and replace across your entire `wp-content` directory.
*   Built-in Git interface for managing commits and pushes via SiteBay's Git Sync integration.

## Secure by Default

Security is paramount when exposing a file system to the web. 
*   **Isolated Environments:** Your Code Server instance runs in its own secure, sandboxed container, attached only to your specific site's volume.
*   **Ephemeral:** The IDE container spins down when not in use to save resources and reduce the attack surface.
*   **Authentication:** Access to Code Server is heavily protected behind SiteBay's primary authentication layer and requires explicit launch permissions from the dashboard.

## Mobile and Agent Workflows

The Code Server isn't just for desktop browsers.

*   **SiteClaw Mobile Integration:** The SiteClaw app includes an embedded Code Server WebView, allowing you to make emergency code edits directly from your phone while on the go.
*   **Agent Parity:** The same underlying access that powers Code Server is exposed to the **SiteBay MCP Server**. If an AI agent struggles to edit a file via the standard MCP API, a human developer can instantly open Code Server, view the exact file state, and correct the agent's work seamlessly.
