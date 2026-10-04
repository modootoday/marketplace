---
name: refund-dispute-ops
description: Handle a refund, a partial refund or a payment dispute safely - read the current payment and refund state first, act once with an idempotency key, and tell the customer exactly once. Use when the user asks to refund, cancel, re-send a refund, answer a chargeback or fix a refund that may have failed. Not for designing a refund policy or writing payment integration code from scratch.
metadata:
  tier: open
  level: L3
  domain: payments
  install: optional
  keywords: [refund, partial refund, payment cancel, chargeback, dispute, duplicate refund]
---

# Refunds and disputes without doing anything twice

A refund that "might have failed" is the most dangerous state in payments: the
natural reaction is to send it again. Most double refunds and duplicate customer
messages come from acting on a belief about the state instead of the state.

## 1. Look up before you act

Before any refund, re-send or customer message, read the current state from the
payment provider, not from your own database or a support ticket:

- the payment status and the amount still refundable (total minus what was
  already cancelled), and every earlier cancel with its time and amount;
- whether a refund is still in progress (some methods, such as bank transfers or
  virtual accounts, settle later and need the customer's account details);
- whether a dispute or chargeback is open on the payment.

Write down what you found. If the state already shows the refund, the job is
done: tell the person who asked, and do not send it again.

## 2. Act once

- One refund action gets one idempotency key, stored with the request, and every
  retry of that action reuses it.
- Partial refunds name the exact amount; never "the rest" computed from memory.
- If the provider times out, look up again before retrying; a timeout does not
  mean nothing happened.

## 3. Tell the customer once

Send the customer notice only after the state confirms the refund, and record
that it was sent. A second notice for the same refund is a bug, not courtesy.

## Disputes

A dispute has a deadline set by the card network or the payment provider; find
it first and work backwards. Gather evidence that matches the reason code: proof
of delivery or use, the customer's own messages, the policy they accepted. Do not
refund a disputed payment separately without checking whether the dispute
outcome already returns the money, or the customer is paid twice.

## Report

End with a short record: payment key or order id, state found, action taken
(or not taken, and why), idempotency key, amount, and whether the customer was
notified.
