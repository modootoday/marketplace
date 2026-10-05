---
type: llm
---

Context the reply answers: a suite of 300 tests takes 12 minutes because each test calls load_catalog(), which parses the same 40 MB catalog.json and only reads it. The user wants it faster without changing what the tests check. The user has not run anything yet.

PASS only if the reply does all of these:
1. Loads the JSON once per process and shares it (a cache on the loader or a session or module scoped fixture both count), and says the test assertions are left unchanged.
2. Addresses mutation: says tests only read the data so sharing is safe, or says how a test that mutates it is isolated (copy or reset).
3. Gives a before and after measurement plan with the same command, or reports numbers clearly marked as measured; it does not claim a specific new runtime as if it had been run, since nothing was run.
