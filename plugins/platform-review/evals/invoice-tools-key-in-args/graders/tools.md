---
type: llm
---

Context the reply answers: a review of an MCP server's billing tools. list_stuff(q, page) returns up to 5,000 raw invoice rows with no hint on how to get more; send_invoice(customer_email, amount, api_key) emails an invoice and charges the saved card at once with the description "Sends an invoice."; refund(all: boolean) refunds all invoices of the last 30 days; every failure returns a stack trace; get_invoice(id) and fetch_invoice(invoice_id) overlap.

PASS only if the reply:
1. Says api_key must not be a tool argument the model fills (credentials come from server configuration or OAuth).
2. Says refund must not offer "all" and needs an explicit id argument, and that destructive tools should be annotated; also that send_invoice charges money, says so in its description and needs clear intent.
3. Says to page and cap list results (a page limit, a next-page cursor or token in the response, and what the model needs next such as ids and status), and to merge or drop the overlapping get_invoice/fetch_invoice.
4. Says errors should say what went wrong and what the model can do about it instead of stack traces.
