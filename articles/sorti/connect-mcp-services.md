---
title: Choose the right MCP connection
description: Distinguish documentation reads, external applications, and SiteBay operations before connecting
  a service.
slug: connect-mcp-services
published: 2026-10-08
modified: 2026-10-08
authors:
- SiteBay
contributors:
- SiteBay
keywords:
- choose the right mcp connection
- sorti
- sitebay documentation
tags:
- sorti
- guides
license: '[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)'
doc_sources:
- sorti-byo
- sorti-current-app
- docs-knowledge
- mcp-standard
weight: 55
---

MCP connections expose a service's tools and resources to an assistant. The documentation reader, a SiteBay site, and a third-party application are different services. Connecting one does not configure the others.

## Decide what the connection is for

| Need | Service | What it owns |
| --- | --- | --- |
| Read procedures and source citations | Documentation reader | The generated documentation corpus |
| Inspect or change a SiteBay site | SiteBay's authenticated product service | Site identity, permissions, operation state, and results |
| Use another application's tools or panels | That application's MCP server | Its own credentials, tools, resources, and data |

The documentation reader has no site-write tools. Giving it database access for search does not make it a deployment service. Likewise, connecting a site does not give Sorti the separate documentation corpus automatically.

## Connect the documentation reader

First build the documentation checkout and choose the corpus. The public corpus contains SiteBay references. A separately generated combined corpus can also contain the original Linode library.

For a standard local MCP client, generate a configuration using `node knowledge/src/client-config.mjs`. The client starts `knowledge/src/server.mjs --stdio`. This requires no persistent HTTP listener and no documentation bearer token.

For Sorti's current BYO client, start the reader's HTTP mode with a separate `DOCS_MCP_TOKEN`. A same-host session entry uses:

```json
{
  "mcpServers": [
    {
      "name": "sitebay_docs",
      "url": "http://127.0.0.1:8788/byo",
      "authToken": "SET_FROM_YOUR_SECRET_STORE"
    }
  ]
}
```

The example token is a placeholder, not a credential. Set the real value through the client or session's secret configuration. The BYO client uses `/byo/mcp` for tool requests and discovers capabilities at `/.well-known/byo-mcp/capabilities.json` on the origin. A standard Streamable HTTP client instead connects to `/mcp`.

A remote Sorti agent cannot reach another machine through its own `127.0.0.1`. Use an authenticated HTTPS proxy on a reachable host. Route the discovery endpoint as well as the tool endpoint, and configure the reader's allowed host and origin values. Keep the service's default loopback bind behind that proxy.

## Verify before relying on a connection

Discover the service and list its actual tools. For the reader, the roster is `search_docs`, `read_doc`, `list_docs`, and `docs_topics`. Search for a known task, read one returned document ID, and confirm the source path and revision.

For another application, inspect the advertised capability and resource contract. A server can expose tools without a panel; a listed panel is not permission to invoke every tool. An unavailable, untrusted, or unauthorized connection needs its own configuration or approval, not a guessed replacement tool name.

## Keep authentication separate

The reader accepts its configured bearer token. It does not implement the SiteBay account login or an OAuth enrollment flow. The SiteBay source also includes a separate optional Sorti MCP OAuth integration; deploying or enabling that integration is not a prerequisite for a local documentation reader.

Do not copy a SiteBay account token into the docs database configuration, put database credentials in a session entry, or reuse one application's token for another origin. See [service ownership]({{< relref "knowledge/service-ownership.md" >}}) for the exact configuration boundaries.
