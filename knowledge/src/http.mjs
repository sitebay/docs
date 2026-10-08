import http from "node:http";
import { timingSafeEqual } from "node:crypto";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  createServer,
  tools,
  capabilities,
  instructions,
  callTool,
  resourceList,
  resourceRead,
} from "./service.mjs";
const equal = (a, b) =>
  Buffer.byteLength(a) === Buffer.byteLength(b) &&
  timingSafeEqual(Buffer.from(a), Buffer.from(b));
const send = (res, status, value) => {
  res.writeHead(status, {
    "content-type": "application/json",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(JSON.stringify(value));
};
async function readBody(req) {
  if (!String(req.headers["content-type"] || "").startsWith("application/json"))
    throw new Error("JSON required");
  if (Number(req.headers["content-length"] || 0) > 65536)
    throw new Error("Request exceeds limit");
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 65536) throw new Error("Request exceeds limit");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString());
}
async function byoRequest(store, message) {
  if (
    !message ||
    message.jsonrpc !== "2.0" ||
    typeof message.method !== "string" ||
    Array.isArray(message)
  )
    throw new Error("Invalid JSON-RPC request");
  const p = message.params ?? {};
  switch (message.method) {
    case "initialize":
      return {
        protocolVersion: "2025-11-25",
        capabilities: { tools: {}, resources: {} },
        serverInfo: { name: "sitebay-docs", version: "1.0.0" },
        instructions,
      };
    case "ping":
      return {};
    case "tools/list":
      return { tools };
    case "tools/call":
      return callTool(store, p.name, p.arguments ?? {});
    case "resources/list":
      return resourceList(store, p.cursor);
    case "resources/read":
      return resourceRead(store, p.uri);
    default:
      throw new Error("Method not allowed; reference reads only");
  }
}
export async function listen(
  store,
  {
    port = 0,
    host = "127.0.0.1",
    token,
    allowedHosts = [],
    allowedOrigins = [],
  } = {},
) {
  if (typeof token !== "string" || Buffer.byteLength(token) < 32)
    throw new Error("HTTP requires a token of at least 32 bytes");
  if (!["127.0.0.1", "0.0.0.0"].includes(host))
    throw new Error("Unsupported bind address");
  if (
    !Array.isArray(allowedHosts) ||
    allowedHosts.some((v) => typeof v !== "string" || !v || /[\s/*]/.test(v))
  )
    throw new Error("Use exact allowed host names");
  if (host === "0.0.0.0" && !allowedHosts.length)
    throw new Error(
      "Non-loopback HTTP binding requires explicit allowed hosts",
    );
  if (!Number.isInteger(port) || port < 0 || port > 65535)
    throw new Error("Invalid HTTP port");
  let readiness = null,
    readinessAt = 0;
  let active = 0;
  const server = http.createServer(async (req, res) => {
    const actualPort = server.address()?.port;
    if (
      !new Set([
        `127.0.0.1:${actualPort}`,
        `localhost:${actualPort}`,
        ...allowedHosts,
      ]).has(req.headers.host ?? "")
    ) {
      send(res, 403, { error: "Unapproved host" });
      return;
    }
    const origin = req.headers.origin;
    if (
      origin &&
      !new Set([
        `http://127.0.0.1:${actualPort}`,
        `http://localhost:${actualPort}`,
        ...allowedOrigins,
      ]).has(origin)
    ) {
      send(res, 403, { error: "Unapproved origin" });
      return;
    }
    let url;
    try {
      url = new URL(req.url, "http://127.0.0.1");
    } catch {
      send(res, 400, { error: "Invalid URL" });
      return;
    }
    if (url.pathname === "/healthz" && req.method === "GET") {
      send(res, 200, { status: "ready", revision: store.revision });
      return;
    }
    if (url.pathname === "/readyz" && req.method === "GET") {
      // Coalesce probes; never expose database or credential-bearing exceptions.
      if (!readiness || Date.now() - readinessAt > 5000) {
        readinessAt = Date.now();
        readiness = Promise.resolve()
          .then(() => store.check?.())
          .then(
            () => true,
            () => false,
          );
      }
      const ready = await readiness;
      send(res, ready ? 200 : 503, {
        status: ready ? "ready" : "unavailable",
        revision: store.revision,
      });
      return;
    }
    if (!equal(req.headers.authorization || "", `Bearer ${token}`)) {
      send(res, 401, { error: "Authorization required" });
      return;
    }
    if (active >= 16) {
      send(res, 429, { error: "Too many concurrent reads" });
      return;
    }
    active++;
    let finished = false;
    const finish = () => {
      if (!finished) {
        finished = true;
        active--;
      }
    };
    res.once("close", finish);
    try {
      if (
        req.method === "GET" &&
        url.pathname === "/.well-known/byo-mcp/capabilities.json"
      ) {
        send(res, 200, capabilities);
        return;
      }
      if (
        req.method === "GET" &&
        url.pathname === "/.well-known/mcp/server-card.json"
      ) {
        send(res, 200, {
          name: "sitebay-docs",
          version: "1.0.0",
          description: instructions,
          tools,
        });
        return;
      }
      if (!["/mcp", "/byo/mcp"].includes(url.pathname)) {
        send(res, 404, { error: "Unknown endpoint" });
        return;
      }
      if (req.method !== "POST") {
        send(res, 405, { error: "POST required" });
        return;
      }
      const parsed = await readBody(req);
      if (url.pathname === "/byo/mcp") {
        // Sorti's BYO wire currently skips session negotiation. Only the same
        // bounded reference handlers are exposed through this compatibility path.
        if (
          parsed?.method === "notifications/initialized" &&
          parsed.id === undefined
        ) {
          res.writeHead(202).end();
          return;
        }
        try {
          send(res, 200, {
            jsonrpc: "2.0",
            id: parsed?.id ?? null,
            result: await byoRequest(store, parsed),
          });
        } catch (error) {
          send(res, 200, {
            jsonrpc: "2.0",
            id: parsed?.id ?? null,
            error: { code: -32602, message: error.message },
          });
        }
        return;
      }
      const mcp = createServer(store),
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
          enableJsonResponse: true,
        });
      res.once("close", () => {
        transport.close().catch(() => {});
        mcp.close().catch(() => {});
      });
      await mcp.connect(transport);
      await transport.handleRequest(req, res, parsed);
    } catch {
      if (!res.headersSent)
        send(res, 400, { error: "Invalid or failed documentation request" });
    } finally {
      if (res.writableEnded) finish();
    }
  });
  server.requestTimeout = 45000;
  server.headersTimeout = 10000;
  server.maxHeadersCount = 40;
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, resolve);
  });
  return server;
}
