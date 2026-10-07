---
name: mcp-client-probe
description: Diagnose MCP client behavior from recorded initialization, paginated tool discovery, client exposure and actual harmless calls. Use when a connected server exposes no tools, listed tools fail when called, clients differ, or headless permission behavior needs measurement. Not for designing tool schemas, implementing a server, or changing live authentication.
metadata:
  tier: open
  level: L3
  domain: agent-tooling
  install: optional
  keywords: [MCP client, JSON-RPC, protocol version, stdio proxy, capabilities, headless permissions, client compatibility]
  verified-runtimes: [codex-cli]
---

# Probing what MCP clients send

Client documentation describes intent; the wire shows behaviour. Clients differ in the protocol
version they request, the capabilities they declare, and which flag lets a tool call through in
a headless run. Decide from a recording, not from a changelog.

## Diagnose the missing stage

Separate transport connection, completed initialization, server discovery, client
exposure to the model, and execution. A connected indicator proves neither the
tool list nor callability; a discovered name proves neither client injection nor
successful execution.

Record the client version, transport, initialization response, and each
`tools/list` page, following `nextCursor` until exhausted. Preserve the actual
tool name and input schema; do not substitute a documentation example. Compare
the complete server list with the client's registered/exposed tools, including
filters, disabled-server settings, stale sessions, and client logs. Missing
evidence stays unverified rather than becoming a guessed permission fix.

For a listed tool, use a harmless call with arguments valid for its recorded
schema and the same endpoint/client identity as the problem. Distinguish a call
never sent, a JSON-RPC error, a tool result with `isError: true`, and successful
application content. A successful control tool isolates a failure to that path;
it does not prove every listed tool works. Do not log credentials or perform
login, token refresh, or permission changes without authorization.

Use a stdio proxy for stdio, or available transport/client logs for other
transports. Do not claim a stdio-only probe verifies remote HTTP behavior. See
the [MCP tool contract](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
for pagination and the two error layers.

## 1. A logging stdio proxy

Write a small proxy the client launches in place of the server. It spawns the real server,
forwards stdin and stdout unchanged, and appends redacted diagnostic copies as
timestamp, direction and parsed message. Omit credential-bearing fields and
redact sensitive arguments and stderr; never retain raw secrets. Forward the
original bytes before logging so instrumentation does not change the messages.

## 2. Wire and restore each client

A script per client that:

1. backs up the client's MCP config file;
2. points the server entry at the proxy, keeping the same name and arguments;
3. after the run, restores the backup and confirms the restored file is byte-identical to it.

Run restore even when the probe fails (a `finally` or trap). Leaving a client wired to a proxy
is the one way this measurement damages the user's setup.

## 3. A headless runner

For each client, call one harmless tool through a headless invocation, once with no permission
flag and once with each flag the client offers (allow-list, bypass, trust). Record whether the
tool call reached the server, from the proxy log, not from the client's output.

## 4. Report

Per client, a table dated and with the client's version:

| Client and version | Handshake method | protocolVersion sent | Capabilities and extensions declared | Flag that lets a headless call through |
| --- | --- | --- | --- | --- |

For discovery or call failures, add the last proven stage, the first failed or
unverified stage, nonsecret schema/error evidence, and the next discriminating
probe. Say whether it was executed or proposed, preserving caller and transport
identity when comparing controls.

Include captured required input field names/types and the redacted submitted
argument shape alongside the error. A bare "schema-valid" assertion does not
preserve reproducible request evidence; mark missing schema or arguments unknown.

Fill cells only from the log. A client that never reached the server gets "no message", not a
guess. State the date of the run; the next client release can change every column.

## 5. Clean up

Confirm every client config is restored. Deliberately retain or delete diagnostic
logs; even redacted logs may contain sensitive task information.
