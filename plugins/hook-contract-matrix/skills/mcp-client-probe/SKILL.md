---
name: mcp-client-probe
description: Measure what each MCP client actually sends instead of trusting its docs - a logging stdio proxy that records every JSON-RPC message both ways, a wire and restore step for each client's config, and a headless runner that calls one tool per client with and without each permission flag - then report handshake, protocol version, capabilities and permission behaviour per client version. Use when an MCP server behaves differently across clients, when choosing which protocol version or capability to rely on, or when a headless MCP tool call is refused. Not for designing MCP tool schemas or writing the server itself.
metadata:
  tier: open
  level: L3
  domain: agent-tooling
  install: optional
  keywords: [MCP client, JSON-RPC, protocol version, stdio proxy, capabilities, headless permissions, client compatibility]
---

# Probing what MCP clients send

Client documentation describes intent; the wire shows behaviour. Clients differ in the protocol
version they request, the capabilities they declare, and which flag lets a tool call through in
a headless run. Decide from a recording, not from a changelog.

## 1. A logging stdio proxy

Write a small proxy the client launches in place of the server. It spawns the real server,
forwards stdin and stdout unchanged, and appends every JSON-RPC message to a log as one line:
timestamp, direction (client to server or back), and the parsed message. Forward bytes before
logging so the proxy cannot change timing-sensitive behaviour, and log stderr separately.

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

Fill cells only from the log. A client that never reached the server gets "no message", not a
guess. State the date of the run; the next client release can change every column.

## 5. Clean up

Confirm every client config is restored, and keep or delete the logs deliberately: they contain
tool arguments and may contain secrets.
