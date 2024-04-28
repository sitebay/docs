---
slug: how-to-copy-files-and-directories
description: 'Copy files and folders in linux or code-server'
keywords: ["linux"]
tags: ["linux"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2024-04-04
modified_by:
  name: Site Bay
published: 2024-03-04
title: How to Copy Files and Directories
authors: ["Site Bay"]
---

## Copying Files and Directories in Site Bay

Whether you're new to managing a WordPress site on Site Bay or you've been at it for a while, knowing how to handle files is crucial. One basic task you'll find yourself doing often is copying files and directories. This guide will break down how to use the cp command on your Site Bay environment, ensuring you're prepared to copy anything from a single file to an entire directory with ease.

## Introduction to the cp Command

The cp command stands as the go-to method for copying files and directories within Linux-based systems like those Site Bay runs on. Unlike the mv command, which moves files, cp duplicates them, leaving the original file untouched. You can copy files within the same directory (giving them a new name), to a different location, or even duplicate entire directories recursively.

Before diving in, here are a few basics:

Regular users can copy most files, but copying protected files may require sudo privileges.
The -r option allows for recursive copying, which is necessary when duplicating directories.

## Getting Started

First up, you'll need to be logged into your Site Bay account and have access to your WordPress hosting environment.

## Copying Basics

The cp command is versatile, supporting multiple operational modes:

Same Directory Copy: Duplicate a file within its current directory.
Different Directory Copy: Move a copy to a different location.
Multiple Files: Copy several files at once to another directory.
Recursive Copy: Duplicate directories, including all subdirectories and files within.
Key Points to Remember
Overwrite Warning: By default, cp will overwrite files without asking. Use interactive mode (-i) to get prompted before such actions.
Combining with ls: Use ls to view files within your current directory, ensuring you know exactly what you're copying.
Important cp Options:
-i: Interactive mode; prompts before overwriting.
-p: Preserves file attributes like modification dates and permissions.
-R: Enables recursive copying, necessary for directories.
-v: Verbose mode; shows detailed information about the copying process.
Copying Examples

## Copy within the Same Directory:

To make a backup of example.txt named example_backup.txt:

cp example.txt example_backup.txt


## Copy to Another Directory:

To copy example.txt to a different directory:

cp example.txt /path/to/target/directory


## Copy Multiple Files:

To copy multiple files to a target directory:

cp example1.txt example2.txt /path/to/target/directory


## Recursive Directory Copy:

To copy an entire directory and its contents to another location:

cp -R /path/to/source/directory /path/to/target/directory
