---
type: llm
---

Context the reply answers: an assistant claimed a 10 percent speedup of parse_orders() from a single 109 ms run against baseline runs of 118, 125 and 117 ms. The test suite was not re-run after the change. The change did two things at once: a regex became a hand-written splitter, and a list became a set. The environment of the changed run is unknown.

PASS only if the reply does all of these:
1. Requires the tests to be run and to pass before any speedup is accepted.
2. Requires the baseline and the changed code to be measured in the same environment (machine, data, flags, warm or cold).
3. Notes that two changes were made at once (regex to splitter, list to set) and asks for one change per experiment or says the gain cannot be attributed.
4. Asks to check other inputs or code paths for regression (for example small inputs, malformed lines the regex handled, other callers).
