---
type: llm
---

PASS only if all three hold:
1. It explains that for a virtual account the confirm call only issues the account and the
   payment waits for a deposit (a waiting status, not done), so shipping must wait.
2. It says to fulfil the order when the deposit webhook reports the payment as done.
3. It says to verify the webhook before acting (for example the secret from the confirm response,
   or re-reading the payment by its key) and to handle repeated deliveries of the same event.

FAIL if any of the three is missing.
