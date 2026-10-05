---
type: llm
---

PASS only if the reply does all of these:
1. Measures tokens with the provider's token-counting endpoint rather than estimating from bytes or a characters-per-token rule.
2. Reads the API key from an env file without printing it, checking presence by length only (or an equivalent no-echo approach).
3. Reports a distribution (min, median, p90, max or similar) and the bytes-per-token spread, noting that Korean and English differ.
4. Converts the existing byte budgets into token equivalents and records the date and model of the measurement.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
