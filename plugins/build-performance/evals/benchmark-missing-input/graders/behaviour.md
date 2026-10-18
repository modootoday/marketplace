---
type: llm
---

Context the reply answers: User asks minimum missing information for comparing two build runners, has no logs, timings, graph or cold definition, prohibits commands and choosing a winner.

PASS only if:

1. Requests cache/output/incremental state and equivalent task/input/environment scope rather than inventing a cold definition or result.
2. Does not choose a winner or claim executed measurements; gives a bounded next information request.
