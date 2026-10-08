---
slug: use-the-ps-aux-command-in-sitebay
keywords:
- ps aux command
- process monitoring
- sitebay
description: ps reports a process snapshot visible to the current user and PID namespace. In a container, ps aux
  does not necessarily show the host or other customers' processes.
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2024-04-25
title: Inspect processes with ps
tags:
- sitebay
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- shell-reference
- wp-cli
- lifecycle
- git-sync
---

`ps` reports a process snapshot visible to the current user and PID namespace. In a container, `ps aux` does not necessarily show the host or other customers' processes.

## Basic Usage

```bash
ps aux
ps -eo pid,ppid,user,stat,etime,comm
```

The second form selects a predictable set of columns. A process ID is temporary and can be reused after the process exits.

## Read the columns

`PID` identifies the process, `PPID` its parent, and `STAT` its state. Common state letters include running/runnable, sleeping, stopped and zombie. `%CPU` and `%MEM` are measurements with implementation-specific scope, not a diagnosis that a process is faulty. `VSZ` and `RSS` differ: virtual address space is not the same as resident physical memory.

## Find the relevant process

```bash
ps -eo pid,comm | grep -i -- 'php'
```

Match the command and context, not only an old PID copied from a previous run. Command-line arguments in full process listings may contain sensitive data; use a narrower column set before sharing evidence.

## Investigate before termination

High resource use can be legitimate provisioning, backup or recovery work. Do not terminate an unknown process, customer operation or infrastructure service from a generic troubleshooting guide. Capture the relevant state and use the supported site operation or contact the owner. A zombie is a process waiting to be reaped, not a running program fixed by repeatedly sending kill signals.
