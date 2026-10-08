---
slug: using-xargs-with-examples
description: 'Use xargs to pass command output as arguments to other commands.'
keywords: ['xargs examples', 'WordPress', 'SiteBay', 'command line']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-17
modified: 2024-12-04
modified_by:
  name: SiteBay
title: "xargs Command"
authors: ["SiteBay"]
contributors: ["SiteBay"]
---

Convert piped input into command arguments.

## Basic Usage

```bash
find /path -name '*.txt' | xargs rm
```

## Common Options

| Option | Purpose |
|--------|---------|
| `-0` | Handle null-delimited input (for filenames with spaces) |
| `-I{}` | Replace `{}` with input item |
| `-P` | Number of parallel processes |
| `-n` | Max arguments per command |

## Examples

### Delete files from find

```bash
find wp-content/themes -name 'unused-theme' -type d | xargs rm -r
```

### Handle filenames with spaces

```bash
find . -name '*.jpg' -print0 | xargs -0 rm
```

### Parallel image compression

```bash
find wp-content/uploads -name '*.jpg' | xargs -P4 -I{} mogrify -resize 800x800 {}
```

### Compress backup files

```bash
find /backups -name '*.sql' | xargs -P4 -I{} gzip {}
```

### Custom placeholder

```bash
echo "file1 file2" | xargs -I{} cp {} /backup/
```
