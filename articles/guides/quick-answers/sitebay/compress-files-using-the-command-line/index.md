---
slug: compress-files-using-the-command-line
description: "Discover how to efficiently manage file sizes on your SiteBay WordPress hosting environment by using tar and gzip for archiving and compression."
og_description: "Master file compression and extraction using tar and gzip on your SiteBay WordPress hosting, saving disk space and optimizing resource usage."
keywords: ["tar", "gzip", "file compression", "archive files", "SiteBay hosting"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-04
modified: 2024-04-04
modified_by:
  name: SiteBay
title: "Efficient File Management on SiteBay Hosting with Command Line Tools"
title_meta: "Archiving, Compressing & Extracting Files on SiteBay with Linux Commands"
tags: ["SiteBay"]
aliases: ['/quick-answers/sitebay/compress-files-using-the-command-line/']
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Utilizing tar and gzip commands, you can streamline file management within your SiteBay WordPress hosting environment. These tools allow you to compile multiple files into a single archive and compress them to reduce disk space usage. While tar groups files together, gzip minimizes the archive's size. Together, they produce a compressed file, often referred to as a "tarball", with the .tar.gz extension.

Archive a Directory

Create a directory in your SiteBay environment and add a file:
    mkdir myfolder && touch myfolder/sample.txt


Archive the directory using tar:
    tar -cvf myfolder.tar myfolder/


Verify the creation of the archived file:
    ls

{{< output >}}
myfolder myfolder.tar
{{< /output >}}

Compression with gzip

Compress the archived file with gzip:

gzip myfolder.tar


The presence of a new file should be confirmed:
ls


{{< output >}}
myfolder myfolder.tar.gz
{{< /output >}}

Observing the file sizes, the compressed archive (myfolder.tar.gz) occupies less disk space:
ls -l --block-size=KB


{{< output >}}
total 8kB
drwxrwxr-x 2 sitebay sitebay 4kB Jan 30 13:13 myfolder
-rw-rw-r-- 1 sitebay sitebay 2kB Jan 30 13:29 myfolder.tar.gz
{{</ output >}}

Extracting a Tarball

Extract the directory and its contents:

tar -xzvf myfolder.tar.gz


{{< output >}}
myfolder/
myfolder/sample.txt
{{</ output >}}

Explanation of the flags used:

-c: Creates a new archive.
-v: Verbose mode, displays the process output.
-z: Utilizes gzip for compression or decompression.
-x: Extracts files from the archive.
-f: Specifies the filename of the archive.
Additional tar Command Options

Here are more flags that enhance tar usage:

Flag	Function
-A	Appends tar files to an existing archive.
-d	Displays differences between an archive and the filesystem.
-delete	Removes files from the archive.
-r	Adds files to the end of an archive.
-t	Lists the contents of an archive.
-u	Updates the archive, avoiding overwrites.

For comprehensive information on these and other options, consult the manual pages with man tar. This guide equips you with basic knowledge for managing archives and compressed files within your SiteBay WordPress hosting setup, using the command line for efficient file handling.