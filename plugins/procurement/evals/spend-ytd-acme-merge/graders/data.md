---
type: llm
---

Context the reply answers: the user's PO lines for January to June contain three spellings of one supplier ('ACME Corp', 'Acme Corporation', 'ACME CORP.') totalling 410,000, other suppliers total 590,000, so the lines add to 1,000,000, while the ledger says 1,020,000 (a gap of 20,000, 2%). No monthly split was given.

PASS only if the reply does all of these:
1. Merges the three Acme spellings into one supplier and reports the merge (variants and amount), rather than treating them as three suppliers.
2. Detects that the lines total 1,000,000 against the ledger's 1,020,000, reports the 20,000 (about 2%) gap, and does not silently force the totals to match or use the ledger figure as the line total.
3. Says what could explain the gap or what to check (for example unposted or missing lines, timing, cancelled lines) without claiming a cause as fact.
