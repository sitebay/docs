---
slug: using-xargs-with-examples
description: xargs builds command arguments from input.
keywords:
- xargs examples
- WordPress
- SiteBay
- command line
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
published: 2024-04-17
modified: 2026-10-08
modified_by:
  name: SiteBay
title: Process filenames safely with xargs
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- code-server
---

`xargs` builds command arguments from input. Its default whitespace splitting is unsafe for arbitrary filenames, so use null-delimited input when processing paths.

## Preserve filenames

```bash
find ./practice -type f -name '*.txt' -print0 | xargs -0 -r -n 1 printf '%s\n'
```

Create a `practice` directory first. `-print0` and `-0` preserve spaces, quotes and newlines between arguments. This GNU `xargs` example uses `-r` to avoid running the command for empty input. Portability differs; check the installed implementation.

## Prefer find for a simple per-file operation

```bash
find ./practice -type f -name '*.txt' -exec wc -c -- {} +
```

This batches filename arguments without reparsing whitespace. Review the selected paths before substituting a command that changes files.

## Parallelism is a resource decision

`-P` controls concurrent invocations. Parallel image processing or compression can exhaust a small site's CPU, memory or storage. Start with serial execution on copies and measure before increasing concurrency. Do not resize the original uploads in place without a recovery copy.

## Placeholder semantics

With `-I{}`, each input record becomes one replacement; a line containing `file1 file2` is not automatically two distinct files. Avoid feeding untrusted names into `sh -c` command text. Pass them as arguments, and never use `xargs` as a reason to bypass a confirmation required for deletion.
