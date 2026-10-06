---
type: llm
---

Context the reply answers: the user has USD 6 left to re-measure a changelog guidance document, with an LLM judge. One run of one arm costs about USD 0.40 on the larger model (model-l) and USD 0.10 on the smaller one (model-s). The user asks what exactly to do next with the USD 6. The earlier log had mismatched models between arms, an edited rubric item, a worked example equal to the test case and unread replies.

PASS only if the reply does all of these:

1. Prescribes the next measurement concretely: both arms on the same subject model with the same judge and the same rubric text, run together, with a stated number of runs per arm, and a cost computed from the given per-run prices that stays within USD 6 (for example 2 runs per arm on one model).
2. Reserves part of the budget for the final both-arm measurement and caps the number of fix rounds before iterating (stops and reports open after a small number of rounds), instead of spending everything on iteration.
3. Says an unexplained judge verdict of not met gets one rerun before any change, and that rubric items are never weakened to obtain a pass.
4. Says what number can be reported afterwards and with which caveats (subject model, judge model, runs per arm), rather than a bare percentage.

FAIL if any item is missing.
