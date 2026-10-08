---
slug: how-to-use-basic-commands-for-wordpress-linux
description: "Master the basics of navigating your WordPress site's server with these essential Linux commands."
keywords: ["sitebay", "WordPress", "Linux commands", "navigate directories"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-04-23
modified_by:
  name: SiteBay
published: 2024-04-22
title: "Navigating Your WordPress Code Server with Linux Commands"
title_meta: "Master Linux Commands for WordPress Hosting on SiteBay"
tags: ["sitebay", "WordPress", "Linux"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

## Understanding the cd Command

On Linux systems,     cd stands as a fundamental command that alters your current directory within the terminal. This command is crucial for WordPress site management on SiteBay's Kubernetes-based hosting platform, offering several shortcuts and two main options for efficient directory navigation.

## Executing the cd Command

To traverse directories with     cd, the syntax is straightforward:
    cd [option] [directory]


For instance, navigating to /usr/local requires:

    cd /usr/local


This example utilizes an absolute path. Yet, relative paths, based on your present location, are equally viable. If your current directory is /usr/local and you aim to move to /usr/local/share, simply use:

    cd share

    cd Shortcuts

    cd comes with several shortcuts to expedite directory navigation:

Parent Directory: Move up one level with ..:

    cd ..


Multiple Levels Up: Stack .. to ascend multiple levels:

    cd ../../..


Root Directory: Navigate to the root from any location with /:

    cd /


Home Directory: Reach your home directory from anywhere with ~ or just     cd:

    cd ~
    cd


Previous Location: Switch back to the last directory with -:

    cd -


This last shortcut toggles between two locations, revealing the absolute path of the last directory.

    cd Options

    cd includes two options, -L and -P, to manage how symbolic links are treated:

-L Option: Follows symbolic links to the directory they point to. This is the default action:

    cd -L /var/example.com


-P Option: Ignores symbolic links, navigating to the physical directory structure:

    cd -P /var/example.com


If both -L and -P are specified, -P takes precedence, focusing on physical directories and bypassing symbolic links.

By mastering these commands and options, managing your WordPress site's server on SiteBay becomes a streamlined process, ensuring efficient site administration and maintenance.