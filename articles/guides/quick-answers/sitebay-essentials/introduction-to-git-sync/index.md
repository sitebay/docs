---
slug: introduction-to-git-sync
description: "Learn how to use Site Bay's git sync feature to easily sync your WordPress site without needing to run git commands."
keywords: ['git sync', 'Site Bay', 'WordPress hosting', 'automatic syncing']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-04
modified: 2024-03-04
modified_by:
  name: Site Bay
title: "Git Sync: Automating Your Site Syncing on Site Bay"
tags: ["sitebay", "git", "WordPress hosting", "site syncing"]
aliases: ['/quick-answers/sitebay-essentials/introduction-to-git-sync/']
authors: ["Site Bay"]
---
What is Git Sync?

At Site Bay, we know managing your WordPress site's version control should be as smooth as surfing the web. That's why we introduced Git Sync, a feature that automatically synchronizes your site's files and databases between your git repository and your Site Bay hosted environment. This means you can keep your site updated without touching a git command line.

Why Use Git Sync?
Efficiency: Automate the synchronization process, saving time and reducing manual errors.
Version Control: Easily track changes, roll back updates, and manage your site's development lifecycle.
Collaboration: Facilitate teamwork by allowing multiple developers to work on different features simultaneously, merging changes without hassle.
How Does It Work?

Site Bay's Git Sync leverages the power of Kubernetes and integrates seamlessly with popular git repositories like GitHub, GitLab, and Bitbucket. Here’s a simple overview:

Connect Your Repository: Link your Site Bay WordPress site to your git repository.
Automate Syncing: Configure Git Sync to monitor your repository for changes.
Bidirectional Sync: Whether you push changes to your git repository or make updates directly on your Site Bay site, Git Sync ensures both sides stay in sync.
Setting Up Git Sync
Log into My Site Bay Dashboard: Navigate to your site's settings.
Repository Details: Enter the URL of your git repository and your access credentials.
Sync Configuration: Choose the branches you want to sync and set up the synchronization frequency.
Apply Changes: Save your settings, and Git Sync will start working its magic.
Best Practices for Git Sync
Use Branches Wisely: Keep your production site on a stable branch, like main, and use other branches for development and testing.
Commit Often: Regular commits help track changes more effectively and simplify rollback if needed.
Review Changes: Before merging branches, review changes to ensure stability and compatibility with your WordPress environment.
Need Help?

If you're new to git or need a refresher, check out the Git Documentation for more details. And if you run into any snags setting up Git Sync with your Site Bay WordPress site, our support team is here to help. Visit our support page for assistance.

Git Sync is just one of the many features Site Bay offers to streamline your WordPress hosting experience. By removing the complexity of manual syncs and leveraging the power of git, you can focus more on creating content and less on the technicalities of website management.