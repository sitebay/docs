---
slug: how-to-use-echo
description: echo is convenient for simple terminal messages. Use printf for predictable formatting, especially
  when input might contain backslashes or start with an option-like value.
keywords:
- sitebay
- how to
- echo
aliases:
- quick-answers/how-to-use-echo/
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-03-04
image: UseEchoCommand.png
title: Print text with echo and printf
tags:
- sitebay
- command line
- echo
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- code-server
---

`echo` is convenient for simple terminal messages. Use `printf` for predictable formatting, especially when input might contain backslashes or start with an option-like value.

## Basic Usage

```bash
echo 'Hello World'
printf '%s\n' 'Hello World'
```

Different shells interpret `echo -e`, `echo -n` and escape sequences differently. Avoid relying on those differences in a portable script.

## Format without interpreting the data

```bash
message='-n is data, not an option'
printf '%s\n' "$message"
printf 'Column 1\tColumn 2\n'
```

The format string is fixed and the variable is supplied as data. Do not use untrusted input as the `printf` format string.

## Write to a practice file

```bash
printf '%s\n' 'first line' > practice.txt
printf '%s\n' 'second line' >> practice.txt
```

`>` truncates an existing file; `>>` appends. Inspect your directory and target before redirecting output. A failed command can still leave a redirection-created file.

## Globs are not a file API

`echo *` prints shell-expanded names, usually excluding dotfiles. It is not reliable structured input for another command, especially with spaces or newlines in names. Use `find` with NUL-delimited output when processing filenames. Avoid printing API keys, database credentials or recovery codes into terminal logs.
