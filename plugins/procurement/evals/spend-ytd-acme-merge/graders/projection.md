---
type: llm
---

Context the reply answers: PO lines for January to June total 1,000,000 (ledger says 1,020,000). One supplier, Acme (three spellings merged), is 410,000 of it and the other suppliers together 590,000. No monthly split was given. The user asked for year-to-date spend, a full-year projection and the supplier pattern.

PASS only if the reply does all of these:
1. Gives year-to-date actual spend and a full-year projection using a named method, such as run-rate (about 166,700 per month, about 2.0 million for the year) and says the method assumes flat months or that seasonality cannot be tested without monthly data.
2. Labels actual versus projected figures explicitly (in headers or labels), including the projected second half as a separate figure from the actual first half.
3. Shows concentration: Acme about 41% of the line total (or 40% of the ledger), and says the share of further suppliers or unusual months cannot be computed from the data given.
