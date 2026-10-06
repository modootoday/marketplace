---
name: mcp-server-design
description: Design or review an MCP server's tools - few tools with clear names and descriptions written for the model, input schemas that reject bad calls, stable ids instead of positions, read-only and destructive annotations, paging and size limits, errors the model can act on, and auth that keeps credentials out of the conversation. Use when building an MCP server, adding or renaming tools, or when models misuse a server's tools. Not for building an MCP client.
metadata:
  tier: open
  level: L3
  domain: agent-tooling
  install: optional
  keywords: [MCP server, tool design, model context protocol, tool schema, tool annotations]
  verified-runtimes: [codex-cli]
---

# Designing MCP tools

A model sees only names, descriptions and schemas. Tools that make sense to the
developer but not from those three are called wrongly, or not at all.

## The tool set

- Few tools, each a complete task a user would ask for, not a thin wrapper per
  endpoint. Overlapping tools make the model pick at random.
- Names are verbs on nouns in one style (`order_get`, `order_cancel`).
- Descriptions say when to use the tool, what it returns, and what not to use it
  for; mention the tool to call first when there is an order (search, then get).

## Inputs and outputs

- Schemas with types, enums, required fields and bounds; reject invalid input
  with a message saying what to change.
- Refer to things by stable ids the tools return, never by position in a list.
- Page large results and cap response size; say in the response how to get the
  next page.
- Return what the model needs next (ids, status), not raw dumps.

## Safety

- Annotate read-only and destructive tools; destructive ones need explicit
  arguments (the id to delete), never "all".
- Tools that cost money say so in the description and require clear intent.
- Credentials come from the server's configuration or OAuth, never from tool
  arguments the model fills.

## Errors

An error says what went wrong and what the model can do about it (retry later,
fix this field, call that tool first). Stack traces help no one.

## Review output

Per tool: name, purpose, schema issues, description issues, safety, and a
suggested rewrite that includes the new description text: when to use the tool,
what it returns, and what not to use it for. End with the test: run the rewritten
set with a model on three to five real tasks and read the calls it makes (wrong
tool, wrong argument, a retry loop), then adjust the descriptions.
