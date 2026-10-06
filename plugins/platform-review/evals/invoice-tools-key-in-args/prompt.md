---
description: What mcp-server-design should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [mcp-server-design]
---

Review the tool definitions of our billing MCP server before we ship it to customers.

1. `list_stuff(q: string, page: number)` returns up to 5,000 invoice rows as raw JSON, with no more information on how to get more.
2. `send_invoice(customer_email: string, amount: number, api_key: string)` creates and emails an invoice and charges the saved card immediately. Description: "Sends an invoice."
3. `refund(all: boolean)` refunds every invoice of the last 30 days when all is true.
4. On any failure every tool returns the stack trace.
5. There is also `get_invoice(id)` and `fetch_invoice(invoice_id)` that return nearly the same thing.
