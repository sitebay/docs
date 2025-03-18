---
slug: fix-content-security-policy-web-worker-error
author:
 name: SiteBay 
 email: support@sitebay.org
description: 'How to fix "Refused to create a worker from blob or data URL" Content Security Policy errors'
keywords: ["CSP", "Content Security Policy", "worker-src", "script-src", "web worker", "blob url", "data url"]
tags: ["security", "CSP", "web development", "web worker"]
license: 'CC BY-ND 4.0'
modified: 2025-03-16
modified_by: 
  name: SiteBay
published: 2025-03-16 
title: How to Fix Content Security Policy Web Worker Errors
---

How to Fix Content Security Policy Web Worker Errors
Encountering the error:
Refused to create a worker from 'blob:...' because it violates the following Content Security Policy directive: "script-src 'self' ...". Note that 'worker-src' was not explicitly set, so 'script-src' is used as a fallback.
can be frustrating, especially when implementing Web Workers or similar features that rely on blob or data URLs. This article explains why this error occurs and provides a clear solution to quickly fix it.

Why Does This Error Occur?
Content Security Policy (CSP) helps protect your website from malicious scripts by specifying which sources of scripts and resources the browser can execute or load.

When your CSP policy does not explicitly define a worker-src directive, browsers use the script-src directive by default. If the script-src directive doesn’t allow blob: or data: URLs, the browser blocks Web Workers created with such URLs, causing this common error:


Refused to create a worker from 'blob:...' because it violates the Content Security Policy directive.
How to Fix This CSP Web Worker Error
To fix this issue, explicitly add a worker-src directive in your CSP header, allowing the required URLs (blob: or data:):

Example of a CSP Header That Allows Web Workers from Blob or Data URLs:

Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' *.yourdomain.com;
  worker-src 'self' blob: data:;
Example Configuration (Netlify or similar platform):
If you are configuring CSP through headers, here's how it might look:

this was out netlify.toml file
[[headers]]
  for = "/*"

  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer"
    Content-Security-Policy = """
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.cloudflareinsights.com *.trustarc.com *.weglot.com *.sitebay.org;
      worker-src 'self' blob: data:;
      connect-src 'self' https://my.sitebay.org;
      frame-ancestors https://my.sitebay.org;
    """
Understanding the CSP Directives
Here's what each directive does:

default-src: Provides the default policy for loading resources if a more specific directive is not defined.
script-src: Specifies which domains or sources are allowed for JavaScript execution.
worker-src: Defines allowed sources for Web Worker scripts.
connect-src: Defines allowed domains for network requests like Fetch, AJAX, WebSockets, etc.
frame-ancestors: Specifies valid parent domains that can embed your page in an iframe.
Security Considerations
Allowing 'unsafe-inline' and 'unsafe-eval' simplifies development but reduces security by permitting inline scripts and JavaScript evaluation (eval). Ideally, migrate your code to use external scripts and nonces or hashes for inline scripts to enhance security.

Permitting blob: or data: URLs for Web Workers is common, but restrict their usage to trusted contexts to maintain maximum security.

Alternative Solution: Serving Workers from Static Files
Instead of using blob: or data: URLs, another robust method is hosting the worker scripts as separate JavaScript files on your domain. This approach aligns with restrictive CSP policies:


// Instead of this:
const workerCode = 'self.onmessage = () => console.log("Hello!");';
const blob = new Blob([workerCode], { type: 'text/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

// Use this:
const worker = new Worker('/scripts/my-worker.js');
Your CSP becomes simpler and more secure:

Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  worker-src 'self';

#Summary
To quickly fix the "Refused to create worker" CSP errors:

Explicitly set worker-src to allow blob: or data: URLs.
Or serve Web Workers from separate static files hosted on your domain.
