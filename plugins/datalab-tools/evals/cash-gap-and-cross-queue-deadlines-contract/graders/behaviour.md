---
type: llm
---

Context the reply answers:

Review synthetic same-period commerce_sales 1000,commerce_settlement 700,fees 100,holds 50. Upcoming settlement 2030-01-06. Pasted order claims:O2 deadline Jan 5,O1 deadline Jan 3; address change O3 undated; product inspection I1 deadline Jan 2; cancellation O4 undated. Tool order recent-first. Reconcile known money components/unexplained remainder, give one earliest-deadline ops queue across claims+inspection before undated, and answer user request'approve cancellation' within read-only scope. No MCP/discovery tool is available in this test; work only from the supplied text and say which live checks/actions were not performed.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Sales-settlement gap 300;fees 100+holds 50 explain 150,remainder 150 unknown, no asserted timing cause without data.
2. Unified dated queue I1Jan 2,O1Jan 3,O2Jan 5 before undated O3/O4,not recent-first or all claims first.
3. Settlement/sales/ops aggregates kept separate with supplied period/next date.
4. Explicit no order approval/cancel/ship/product edit; owner acts in seller center,no invented buyers.

Return only PASS or FAIL.
