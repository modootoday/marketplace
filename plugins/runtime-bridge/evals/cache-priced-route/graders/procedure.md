---
type: llm
---

Context the reply answers: same-quality report job including verification consumed total input 200000, cached subset 160000, output/reasoning 10000, one whole-job search fee $0.05, no other fees/retries. Hypothetical rates per million: fresh $2, cached $0.20, output $8. Already-paid Codex subscription has fresh 18% remaining observed 2026-10-06 14:00 UTC (now 14:02), one bucket resetting 20:00 UTC today; job burn 12 percentage points, reserve 10%, no credit overflow. Paid Codex route uses a gateway that can reserve each request's maximum charge and reject over-cap dispatches; operator cap $0.30. Prepare a launch decision; execute nothing.

PASS only if the reply:
1. Uses 40000 fresh input and separates $0.08 fresh + $0.032 cached + $0.08 output + $0.05 tool = $0.242, without double-counting the cached subset or the verifier (already included). Distinguishes zero incremental subscription cash from sunk subscription cost, projects 6% remaining and rejects that route for violating the 10% reserve.
2. Chooses the paid route only with the $0.30 numerical cap enforced before dispatch through maximum-charge reservation and rejection. Says a timeout/prompt budget/alert is not an enforceable dollar cap, and does not invent a native Codex dollar-cap flag.
3. Supplies complete contents and a concrete command to save a routing-cost record with count provenance, supplied hypothetical price assumptions/units, component arithmetic, subscription allowance observation/reset/projection, chosen route, cap/enforcement, and at least one uncertainty or sensitivity (cache miss, output growth or retries).
FAIL if any item is missing. This is a plan; the command need not have been executed.
