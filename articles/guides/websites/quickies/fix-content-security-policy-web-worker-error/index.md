---
slug: fix-content-security-policy-web-worker-error
author:
  name: SiteBay
  email: support@sitebay.org
description: A Content Security Policy can block a worker whose source is not allowed. Inspect the browser violation
  and the delivered policy before changing it.
keywords:
- CSP
- Content Security Policy
- worker-src
- script-src
- web worker
- blob url
- data url
tags:
- security
- CSP
- web development
- web worker
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/)'
modified: 2026-10-07
modified_by:
  name: SiteBay
published: 2025-03-16
title: Fix a blocked web worker
authors:
- SiteBay
contributors:
- SiteBay
doc_sources:
- web-protocol
---

A Content Security Policy can block a worker whose source is not allowed. Inspect the browser violation and the delivered policy before changing it.

## Identify the source

Check the worker URL and whether it is a normal same-origin file, a blob URL, or another origin. Find every policy applied by the server, CDN, or document.

## Adjust the narrow directive

`worker-src` controls worker scripts. Without it, browsers fall back through `child-src`, `script-src`, and `default-src`.

For an application that intentionally creates trusted same-origin and blob workers, a policy can include:

```http
Content-Security-Policy: worker-src 'self' blob:;
```

This is a directive example, not a complete site security policy. Merge the justified change into the existing policy; do not replace all protection with this line or add broad script exceptions.

## Verify

Reload the page, reproduce the worker action, and confirm the violation is resolved without loosening unrelated restrictions. Inspect the actual response headers, not only a configuration file.

See [MDN's worker-src reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/worker-src).
