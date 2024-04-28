---
title: "Get Started"
title_meta: "Getting Started with the Site Bay Bi-directional Git-Sync"
description: "Git for people who hate git. Harness git with minimal tech knowlege. Simple."
image: GitSync.png
tab_group_main:
    weight: 20
published: 2024-04-04
---

## Introduction

**Every minute, the Site Bay bi-directional Git-Sync synchronizes your WordPress website's changes with a remote Git repository.** This allows an effortless backup of website content and a seamless restoration or deployment process. It ensures that every change made on your live website can be tracked and managed through Github's version control.


Works with:
- GitHub
- GitLab
- Bitbucket (app password)

## How It Works

1. **Automatic Tracking:** When you make updates to your WordPress site, such as adding new posts, updating themes, or configuring plugins, these changes are automatically detected.

2. **Commit Changes:** Detected changes are then automatically committed to a local Git repository. This includes all relevant files and database changes.

3. **Push to Remote Repository:** After committing the changes locally, they are pushed to a specified remote Git repository. This keeps your remote backup up-to-date with your live site.

4. **Pull from Remote Repository:** If there are any updates or changes made directly in the remote Git repository, they can be pulled back into the live website, ensuring that both the live site and the Git repository remain in sync.

5. **Recovery:** In case of mishaps or the need to revert to previous states, your website can be restored to any previously committed version from the Git repository.

## Setting Up Site Bay Git-Sync

### Prerequisites
- A remote Git repository (GitHub, GitLab, or Bitbucket).
- A Site Bay Account

You need the following folders in your git's **root directory** 
- themes
- plugins
- uploads

Look here for an example https://github.com/sitebay/git-sync-demo

### Steps

1. **Create a new Git Repo:** Go to GitHub and create a new repo with a plugins, themes, and uploads folder.
1. **Link your Github account:** Go to your User settings page and navigate to the Git-Sync section. Link our app to your Github or Gitlab account.
1. **Create a new Git-Sync Enabled site:** In the Git Sync section of your User settings page, find the repo you want to use and click on Create Site.

Now, any changes you make will auto sync to the repo, and any repo changes will automatically sync to your site's storage.

Using the Site Bay bi-directional Git-Sync not only ensures that your website data is backed up but also enhances disaster recovery capabilities and facilitates easy content migration and deployment across different environments. Enjoy peace of mind knowing that your website changes are being safely managed and versioned through Git.