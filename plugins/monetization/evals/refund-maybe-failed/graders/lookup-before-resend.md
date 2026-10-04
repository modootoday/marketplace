---
type: llm
---

PASS only if all three hold:
1. It does not resend the refund straight away: it first looks up the payment at the provider
   (status, cancels, refundable balance) because the timed-out call may have succeeded.
2. If a retry is needed, it reuses the original idempotency key (or says a stable key per refund
   must be used), so the retry cannot refund twice.
3. The customer email is sent only after the refund state is confirmed, not before.

FAIL if it resends immediately, or emails the customer that it is done before checking.
