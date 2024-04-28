---
slug: delete-file-command-line
description: "Learn how to confidently delete files, directories, and more on your Site Bay WordPress hosting using the command line, ensuring a clean and organized site."
keywords: ["remove files", "delete files", "Site Bay rm"]
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-03
modified: 2024-04-14
modified_by:
  name: Site Bay
title: "File Management from the linux command line in Code Server: "
tags: ["sitebay"]
authors: ["Site Bay"]
---

# Beginner File Removal in WordPress tips

{{< note respectIndent=false >}}
For safety, our examples utilize filename.txt variations. Tailor these commands to your needs, replacing filename.txt with the specific file names you intend to delete.
{{< /note >}}

## Basics of rm for File Deletion

Delete a Single File: Simplify your space by removing individual files.
rm filename.txt


Bulk File Deletion: Efficiently clear out multiple files at once.

rm filename1.txt filename2.txt


Wipe All .txt Files: Remove every .txt file within your current directory for a clean sweep.
rm *.txt

## rm Options for Enhanced Control
Interactive Mode -i
Ensure accuracy by confirming each file deletion.
rm -i filename.txt

Force Deletion -f
Streamline removals without prompts, ideal for scripts.
rm -f filename.txt

Verbose Output -v
Gain insights with a detailed report of each deletion.
rm -v filename*.txt

Directory Deletion -d
Remove empty directories 
rm -d directoryname/


Note: This works only for empty directories. For non-empty directories, incorporate the r flag.

## Recursive Removal -r

Clear a directory and its contents, for major cleanups.

rm -r directoryname/

Combining Options

Mix options for tailored operations, like deleting all .png files with confirmation and a progress report.

rm -iv *.png


{{< output >}}
remove filename01.png? y
filename01.png removed
remove filename02.png? y
filename02.png removed
...
{{< /output >}}

## Forceful Recursive Removal -rf

Use this to bypass prompts when deleting non-empty directories

rm -rf directoryname/

## Pairing rm with Other Commands
Clearing Out Old Files

Combine find with rm to locate and delete files older than a specific period, displaying each file as it's removed.

find directoryname* -type f -mtime +28 -exec rm '{}' ';' -print


This command identifies all files matching your criteria, replacing {} with each found file. The semicolon ; concludes the command sequence for -exec, and -print is a find option, not part of the executed rm. 

Summary

Remember to be careful with options like -rf, to avoid unintended deletions.
You can use PIT machine to restore unintentionally deleted files