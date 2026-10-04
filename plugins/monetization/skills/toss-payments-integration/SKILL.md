---
name: toss-payments-integration
description: Implement or review a Toss Payments integration - payment confirmation, webhooks, virtual accounts, cancels and recurring billing - and cross-check every API detail against the official Toss Payments docs instead of memory. Use when the user builds, debugs or reviews checkout, payment confirmation, refunds or subscription billing with Toss Payments. Not for other payment gateways.
metadata:
  tier: open
  level: L3
  domain: payments
  install: optional
  keywords: [Toss Payments, payment confirm, webhook, virtual account, billing key, idempotency]
  requires:
    mcp: [tosspayments-integration-guide]
---

# Toss Payments integration

Payment code fails in ways that cost money and only show up in production:
an amount the client changed, a confirmation sent twice, a deposit nobody
noticed. Each check below closes one of them. Every API name, field and limit
you write must be confirmed in the official docs; when the
`tosspayments-integration-guide` MCP server is connected, look it up there
(`get-documents`, then `document-by-id`) and cite the document link. If it is not
connected, say which statements you could not check.

## The confirmation step is the whole security model

1. **The server owns the amount.** Before calling the confirm API, compare the
   `amount` and `orderId` that came back on the success redirect with the order
   stored on your server. A mismatch is not confirmed. The client can change
   anything it sends.
2. **Confirm from the server only,** with the secret key in a Basic auth header
   (the key followed by a colon, base64-encoded). The secret key never reaches
   the browser, the app bundle or the repository.
3. **Confirm in time.** The docs give a window after the payment request in
   which confirmation must happen; past it the payment session is gone. Do the
   confirm call in the redirect handler, not in a batch job.
4. **Store the paymentKey and the returned status** before telling the user it
   worked, so a crash between the two cannot lose a paid order.

## Asynchronous outcomes come by webhook

- A virtual account is issued at confirmation and paid later: the status waits
  for a deposit, and the deposit arrives as a webhook. Fulfil the order only
  when that webhook says the payment is done.
- Verify each webhook before acting on it: the docs describe how (for virtual
  accounts, a secret returned at confirmation that the event must match). Then
  re-read the payment by its key if the decision matters.
- Handlers are idempotent: the same event can arrive more than once.

## Retries never double-charge or double-refund

Send an `Idempotency-Key` header on confirm and cancel requests, generated once
per business action (a UUID stored with the order or the refund) and reused on
every retry of that action. A new key per retry defeats it.

## Recurring billing

Issuing a billing key and charging it are separate steps; the charge runs on
your schedule from your server. Store the billing key like a credential, charge
with an idempotency key per billing period, and handle a declined card as an
expected state with a retry policy and a customer notice, not as an exception.

## Review output

For a review, list each finding with the file and line, what can go wrong in
money terms, the fix, and the doc link that supports it. Separate what you
verified in the docs from what you assumed.
