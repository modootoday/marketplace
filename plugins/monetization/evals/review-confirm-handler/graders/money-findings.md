---
type: llm
---

PASS only if the review makes all three points:
1. The amount (and order) from the query string must be compared with the order stored on the
   server before confirming; trusting it lets a client pay less.
2. The retry loop sends the confirm request again without an Idempotency-Key header (or with no
   stable key), which risks a duplicate or an inconsistent result; a key generated once per order
   and reused on retries fixes it.
3. The order is marked PAID even when confirmation failed or returned an error; the status must
   come from a successful confirm response.

FAIL if any of the three is missing.
