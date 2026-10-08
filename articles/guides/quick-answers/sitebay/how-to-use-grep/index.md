---
slug: how-to-use-grep
description: Search the specific files you need rather than dumping private configuration or recursively scanning
  an entire server.
keywords:
- grep
- text search
aliases:
- /quick-answers/sitebay/how-to-use-grep/
- /quick-answers/how-to-use-grep/
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-04
title: Find text with grep
tags:
- SiteBay
- Development
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- code-server
---

Search the specific files you need rather than dumping private configuration or recursively scanning an entire server.

## Literal text and line numbers

```bash
grep -nF -- 'wp_enqueue_script' functions.php
grep -ni -- 'error' example.log
```

`-F` treats the pattern as literal text. `-n` prints line numbers and `-i` ignores case. A pattern with regular-expression metacharacters needs either literal mode or intentional escaping.

## Restrict recursive search

```bash
grep -rnF --include='*.php' -- 'wp_enqueue_script' themes/
```

Run from the verified `wp-content` directory or adjust the path to your workspace. Limit the file type and scope so the result is useful and does not include binary uploads or credentials.

## Understand the result code

A match normally exits 0; no match exits 1; an error uses a different nonzero status. “No matching lines” is not the same as “the file could not be read.” In a shell script with strict error handling, handle that distinction deliberately.

## Logs and private data

Read logs through the site's supported view or an authorized terminal. Do not assume an access-log path exists inside code-server. Redact IP addresses or user information as appropriate before sharing logs, and never print all of `wp-config.php` merely to find a harmless setting. A regular-expression match alone is not a security audit.
