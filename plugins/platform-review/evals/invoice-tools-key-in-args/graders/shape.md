---
type: llm
---

Context the reply answers: the same billing MCP server review of five tool problems.

PASS only if the reply:
1. Reviews per tool with name, purpose, schema issues, description issues, safety and a suggested rewrite (a rewritten name, schema or description for at least send_invoice, refund and list_stuff).
2. Renames list_stuff into the verb-noun style used by the rest (for example invoice_list) with a description saying when to use it, what it returns and what not to use it for.
3. Recommends testing the tool set with a model on real tasks and reading the calls it makes.
