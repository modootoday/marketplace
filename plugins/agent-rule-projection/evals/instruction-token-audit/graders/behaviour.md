---
type: llm
---

Context the reply answers: the user has a root AGENTS.md with a 12 KB budget and about 60 package AGENTS.md files with 4 KB budgets, many in Korean, and an API key in a local env file. The agent cannot see the repo, and the user asked only for a measurement plan and a script outline to run themselves. No measured numbers are expected; judge the plan and script.

PASS only if the reply does all of these:
1. Measures tokens with the provider's token-counting endpoint rather than estimating from bytes or a characters-per-token rule.
2. Reads the API key from an env file without printing it, checking presence by length only (or an equivalent no-echo approach).
3. Plans to report a distribution (min, median, p90, max or similar) and the bytes-per-token spread, noting that Korean and English differ.
4. Plans to convert the 12 KB and 4 KB byte budgets into token equivalents and to record the date and model of the measurement.

Wording does not matter, and extra correct advice is fine. Any item missing means the reply fails.
