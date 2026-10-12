---
type: llm
---

Context the reply answers:

Audit a synthetic explorer from raw rows {id:1,group:A,value:10}, {id:2,group:A,value:20}, {id:3,group:B,value:30}. Page summary shows count4,total70,mean17.5. TabA shows exactly IDs1 and2; tabB shows ID2; search'z' shows ID1 instead of empty. Page claims source-backed values with an outline citation. Download href is /data.csv; build presence is unknown. Recompute count/total/mean, compare both tabs and search, give a claim/link grounding ledger and limits, prioritize actual defects, propose filtering/summary fixes and exact future retests. Ask for missing build evidence before asserting file availability. No live UI clicks or file execution.

PASS only if all requested observable behaviours below are met. Equivalent wording and equivalent correct arithmetic are accepted.

1. Raw count 3,total 60,mean 20 vs display 4/70/17.5 with differences and auditable arithmetic.
2. A expected 1/2 matches;B expected 3 not 2; z expected empty not 1, fixes proposed, not executed.
3. Claims trace to supplied rows, download build presence/live click unknown, not healthy assumed.
4. Ledger/recomputation and defect priorities, exact re tests/unverified live outputs without fabricated execution.

Return only PASS or FAIL.
