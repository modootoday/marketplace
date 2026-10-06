---
type: llm
---

Context the reply answers: a QA of a pasted investor-deck description with a handful of issues across slides 2, 3, 6, 7/8/12 and 9.

PASS only if the reply is built around a table whose columns cover slide, issue, evidence, severity and fix (names may differ slightly), with one row per issue, and the evidence cell shows both values wherever two values disagree. FAIL if the findings are only prose or bullets, or if there is no severity per row.
