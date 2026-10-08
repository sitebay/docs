---
slug: how-to-use-grep
description: "Search text in files with grep."
keywords: ["grep", "text search"]
aliases: ['/quick-answers/sitebay/how-to-use-grep/', '/quick-answers/how-to-use-grep/']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2025-12-04
modified_by:
  name: SiteBay
published: 2024-04-04
title: "grep"
tags: ["SiteBay", "Development"]
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

# grep

Search for text in files. Use in Code Server terminal.

## Basic Usage

```bash
# Search for text in file
grep 'search-term' file.php

# Case-insensitive
grep -i 'error' file.php

# Show line numbers
grep -n 'define(' wp-config.php

# Recursive (all files in directory)
grep -r 'wp_enqueue_script' wp-content/themes/
```

## With Pipes

```bash
# Filter command output
cat file.php | grep 'specific-text'

# Monitor logs
tail -f /var/log/access.log | grep '404'
```

## Regex Search

```bash
# Find email addresses
grep -E "[[:alnum:]]+@[[:alnum:]]+\.[[:alpha:]]{2,}" wp-config.php
```

## Common Uses

- Find function definitions
- Search error logs
- Audit security issues
- Check configuration values
