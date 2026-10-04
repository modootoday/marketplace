---
type: llm
---

PASS only if all three hold:
1. Before sending, it reads the payment's current state from the provider (earlier cancels,
   balance still refundable) instead of trusting the ticket's account of the first refund.
2. It notes that a virtual-account (bank transfer) refund needs the customer's refund account
   details, or checks whether they are already on file.
3. The request cancels exactly 20,000 KRW as a partial amount and carries an idempotency key that
   is reused on retries.

FAIL if any of the three is missing.
