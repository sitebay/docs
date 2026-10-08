---
slug: http-get-request
title: "HTTP Requests"
description: 'HTTP request methods: GET, POST, and request structure.'
keywords: ['http get request','http request','http post']
license: '[CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0)'
authors: ["SiteBay"]
contributors: ["SiteBay"]
published: 2024-04-04
modified: 2024-12-04
modified_by:
  name: SiteBay
---

HTTP requests enable data exchange between browsers and servers.

## Request Methods

| Method | Purpose |
|--------|---------|
| GET | Retrieve data (view a page) |
| POST | Submit data (forms, uploads) |
| PUT | Update existing resource |
| DELETE | Remove resource |

## GET Request

Requests to view content without modifying it.

```
GET /page HTTP/1.1
Host: example.com
```

## POST Request

Submits data to the server.

```
POST /signup HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded

username=user&password=pass
```

## Request Structure

1. **Request line** - Method, path, HTTP version
2. **Headers** - Metadata (Host, Content-Type, etc.)
3. **Body** - Data payload (POST/PUT only)

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 301 | Moved permanently |
| 404 | Not found |
| 500 | Server error |
