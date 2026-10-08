---
slug: how-git-sync-works-with-point-in-time-machine
authors: ["SiteBay"]
contributors: ["SiteBay"]
modified_by:
  name: SiteBay
description: 'Learn how SiteBay''s Point-in-Time Machine interacts with Git Sync'
keywords: ['git-sync', 'pit-machine']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-03-26
modified: 2024-03-26
title: "How Git Sync Works With PIT Machine"
h1_title: "Restoring your Git Sync Enabled Site"
tags: ["sitebay platform","development", "git sync"]
aliases: ['/platform/git-sync/how-git-sync-works-with-point-in-time-machine/']
---

Running your WordPress site with our Bi-Directional Git Sync? Awesome. The good news is that it works perfectly with our Point-in-Time (PIT) machine, allowing you to restore your database and files to any minute in the past without wrecking your repo. 

### How We Restore Your WordPress Files

When you use the PIT Machine in My SiteBay to restore a Git Sync-enabled site, we run a `git revert` on your repository behind the scenes.

This `revert` command creates a brand new commit that undoes the changes, rather than rewriting your Git history. Because we don't overwrite history, if you realize the restore was a mistake, you can just use the PIT machine again to jump right back to the moment before you restored. It's completely safe.

Here's exactly what happens when you pick a time to restore:
1. We track down the exact commit hash for your repo at that specific time.
2. We revert everything from your `HEAD` commit (where your site is right now) back to that target commit hash. Think of it as systematically walking back every change since that point.
3. We commit that restored tree. This creates a fresh commit that perfectly matches the state of your old files. 

Since SiteBay runs on Kubernetes, this process is isolated, fast, and ensures your data is always safe. 

{{< note >}}
Always use the Point-in-Time Machine in My SiteBay to restore your site. If you try to manually run `git revert` commands locally and push them up, your files will roll back but your database won't. This almost always leads to a broken site where the database and the files are completely out of sync.
{{< /note >}}