---
authors: ["SiteBay"]
contributors: ["SiteBay"]
modified_by:
  name: SiteBay
description: 'Use SiteBay''s Bi-directional Git Sync to develop locally.'
keywords: ['git-sync']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-26
title: Git Sync
show_in_lists: true
aliases: ['/platform/git-sync/']
---

Git Sync is a core feature on SiteBay, built to make your life way easier. If you prefer building and testing your WordPress sites locally before pushing them live to our Kubernetes infrastructure, this is exactly what you need. It's straightforward, fast, and takes the headache out of deployments.

### What is Git Sync?

Git Sync lets you link your WordPress site's themes, plugins, and custom code directly between your local setup and your live SiteBay environment. It's a bi-directional sync. This means when you push code from your local machine, it updates the live site. And if someone updates a plugin from the live WordPress admin panel, you can pull that change right back to your local repo.

### Getting Started with Git Sync

- **Enable Git Sync:** Head over to the SiteBay dashboard and flip Git Sync on. This lets our AI-native platform know you're ready to connect a repo.
- **Connect Your Repo:** Plug in your Git repository. We play nice with GitHub, GitLab, and Bitbucket. Just drop in your URL, approve the permissions, and you're linked.
- **Develop Locally:** Start coding. Add plugins, fix up your theme, or use the **SiteBay MCP Server** locally to speed up your workflow. Git tracks every change you make.
- **Push Changes to Live:** Happy with your code? Just run a `git push`. SiteBay catches it and instantly deploys your updates to your live site.
- **Pull Changes from Live:** If a client or teammate makes a change directly on the live site, just run a `git pull` locally to stay in sync.

### Why You Need Git Sync

- **Real Version Control:** No more "theme-final-v2-really-final.zip". Git tracks everything, so you can branch features and easily revert mistakes.
- **Smooth Collaboration:** Your whole team can work on the same site without accidentally wiping out someone else's code.
- **Built-in Backup:** Your Git repository acts as an automatic, versioned backup of your entire codebase. 

Git Sync is built for modern WordPress development. Connect your repo and experience a workflow that's actually built for developers.