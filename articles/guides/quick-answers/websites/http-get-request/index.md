---
slug: http-get-request
title: Inspect an HTTP GET response
description: A GET request retrieves a representation of a resource. Check the status, headers, and body rather
  than assuming a successful connection means the expected content was returned.
keywords:
- http get request
- http request
- http post
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
authors:
- SiteBay
contributors:
- SiteBay
published: 2024-04-04
modified: 2026-10-07
modified_by:
  name: SiteBay
doc_sources:
- web-protocol
---

A GET request retrieves a representation of a resource. Check the status, headers, and body rather than assuming a successful connection means the expected content was returned.

```sh
curl --silent --show-error --dump-header headers.txt   --output body.html https://example.com/
```

This writes the response headers and body to local files. Use a URL you are permitted to access. Inspect redirects before following them with credentials.

A `200` response may still contain an error page or unexpected content. A GET request should not be designed as a data-changing action, but an unsafe server implementation can still have side effects.

Read [GET semantics](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET). Keep secrets out of query strings and shared request logs.
