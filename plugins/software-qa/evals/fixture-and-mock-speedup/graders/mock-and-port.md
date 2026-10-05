---
type: llm
---

Context the reply answers: the user also asked for a mock of GET /users whose spec lists 200 (a page of users with next_cursor), 404 and 429 (with Retry-After), and a pytest fixture that occupies TCP port 8081 to test the client's address-already-in-use handling. Nothing has been run.

PASS only if the reply does all of these:
1. The mock returns 404 and 429 (with a Retry-After header) as well as 200, and the 200 body has next_cursor with a last page that ends pagination.
2. The mock offers a latency setting or delay so timeout and retry paths can be exercised.
3. The port fixture releases the port in teardown that also runs when the test fails (finalizer, yield with try/finally or equivalent).
4. The fixture or a test proves recovery after release, for example that binding to 8081 succeeds again.
5. States what the mock cannot prove about the real service, or marks any behaviour not in the spec as an assumption.
