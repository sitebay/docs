---
slug: how-to-use-git
description: 'Master Git for your Site Bay WordPress hosting: a step-by-step guide to initializing repositories, staging commits, and pushing updates.'
aliases: ['/quick-answers/sitebay/how-to-use-git/','/quick-answers/how-to-use-git/']
keywords: ["Linux", "how to use Git", "github", "create git repo"]
tags: ["version control system","sitebay"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-04-17
modified_by:
  name: Site Bay
published: 2024-04-19
title: "Harnessing Git for Site Bay: A Comprehensive Guide"
authors: ["Site Bay"]
---

For our bi-directional Git Sync, you don't actually need to manage and a git repo on your computer.
You can develop locally without any of the below, but if you want to learn the basics, read on.

Git is a cornerstone for managing software projects, offering powerful version control capabilities. Whether you're launching your first WordPress site on Site Bay or managing a complex project, understanding Git is key. Follow these six steps to kickstart your journey with Git, from creating a repository to making your first commit and pushing it online. For a deeper dive, check out our extensive guide on Git Source Control Management.

Initialize Your Git Repository:
Begin by setting up a dedicated folder for your project files, then initialize a Git repository within it:

mkdir myproject
cd myproject
git init


Create and Track Files:
Generate some files for your project and add content to one as a starting point:

touch index.html style.css script.js
echo "Hello Site Bay!" >> index.html


Check Your Repository Status:
Use git status to see which files Git is aware of and their status:
git status


You'll see something like:
On branch master

Initial commit

Untracked files:
(use "git add <file>..." to include in what will be committed)

index.html
style.css
script.js

nothing added to commit but untracked files present (use "git add" to track)


Stage Files for Commit:
Add index.html to Git's tracking scope to monitor any future changes:

git add index.html
git status


This shows Git is now tracking index.html:

On branch master

Initial commit

Changes to be committed:
(use "git rm --cached <file>..." to unstage)

new file:   index.html

Untracked files:
(use "git add <file>..." to include in what will be committed)

style.css
script.js


Commit Your Changes:
Commit your changes to the version control system with a meaningful message:

git commit -am "Initial commit with index.html"


Confirmation of your commit will appear:

[master (root-commit) e8cc496] Initial commit with index.html
1 file changed, 1 insertion(+)
create mode 100644 index.html


Track and Commit Remaining Files:
Add all remaining files and commit them with a message describing the changes:

git add -A
git commit -am "Added CSS and JS files"


Confirm the successful commit:

[master 52a9240] Added CSS and JS files
3 files changed, 1 insertion(+)
create mode 100644 style.css
create mode 100644 script.js


{{< note respectIndent=false >}}
git add -A, git add ., and git add -u all prepare files for a commit. git add -A stages all changes, git add . stages new and modified files (excluding deleted), while git add -u stages modifications and deletions (excluding new files).
{{< /note >}}
