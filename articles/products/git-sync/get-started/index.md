---
slug: get-started-git-sync
description: "Master Git Sync on SiteBay: Bi-directional code synchronization between your WordPress environments and your Git repositories."
keywords: ['git sync', 'github', 'gitlab', 'bitbucket', 'version control', 'ci/cd', 'deployments']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-13
modified: 2026-03-12
modified_by:
  name: SiteBay
title: "Git Sync: Version Control for WordPress"
bible: true
tags: ["sitebay", "git", "deployments", "ci-cd"]
aliases: ['/quick-answers/sitebay-essentials/introduction-to-git-sync/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# Git Sync: Version Control for WordPress

**Git Sync** is a core SiteBay feature that revolutionizes how developers build and maintain WordPress sites. It provides seamless, bi-directional synchronization between your WordPress site's `wp-content` directory and your preferred Git repository (GitHub, GitLab, or Bitbucket).

With Git Sync, your codebase is always tracked, versioned, and easily deployable across multiple environments.

## How Git Sync Works

SiteBay's Git Sync operates differently from traditional FTP or basic deployment scripts. It runs as a sidecar container alongside your WordPress environment, constantly monitoring for changes.

### Bi-Directional Synchronization

1.  **Code to Cloud (Push):** When you commit and push changes to your linked Git branch (e.g., `main`), SiteBay instantly detects the webhook and pulls the latest code into your WordPress site.
2.  **Cloud to Code (Commit via Dashboard/MCP):** When you make changes directly on the server—such as installing a plugin via the WordPress admin, editing a file in Code Server, or using the SiteBay MCP—you can commit and push those changes back to your Git repository directly from the SiteBay Dashboard or via an AI agent command.

## Supported Providers

SiteBay integrates deeply with the major Git platforms, handling authentication via secure OAuth apps:

*   **GitHub:** Full support for personal repositories and organizations.
*   **GitLab:** Support for GitLab.com and self-hosted GitLab instances.
*   **Bitbucket:** Complete integration with Bitbucket workspaces.

## Setting Up Git Sync

1.  **Link Your Provider:** Navigate to your User Profile > **Linked Accounts** and authorize SiteBay to access your GitHub, GitLab, or Bitbucket account.
2.  **Attach to a Site:** Go to your site's dashboard, select **Settings > Git Sync**, and choose the repository and branch you want to link.
3.  **Initial Sync:** SiteBay will perform an initial sync. If your repository is empty, SiteBay will commit your current `wp-content` directory to the repo. If the repo has code, SiteBay will pull it down to your site.

## The `.gitignore` Strategy

Git Sync focuses exclusively on the `wp-content` directory (themes, plugins, mu-plugins). Core WordPress files and sensitive environment variables (`wp-config.php`) are managed by the platform and are deliberately excluded from Git tracking to ensure security and stability.

SiteBay automatically provides an optimized `.gitignore` file that excludes things like the `uploads/` directory (which should be handled by our object storage and backup systems, not Git) and caching directories.

## Advanced Workflows

### Staging Environments
The most powerful use of Git Sync is combining it with SiteBay's Staging Sites.
1.  Link your Production site to the `main` branch.
2.  Link your Staging site to a `staging` or `development` branch.
3.  Develop locally or on staging, commit to `staging`, test your changes, and then open a Pull Request to `main`. Merging the PR automatically deploys to Production.

### AI Agent Integration
Because Git Sync turns your infrastructure into code, AI agents thrive here. Using the **SiteBay MCP Server**, an agent can:
*   Make targeted file edits to a theme.
*   Run tests.
*   Execute `git commit` and `git push` on your behalf, complete with a beautifully formatted commit message summarizing its changes.
