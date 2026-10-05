---
type: llm
---

PASS only if the reply does all of these:
1. Keeps only the constraints (masking, minor units, the refund rule) in AGENTS.md and moves the background, history and commands verbatim into PACKAGE.md rather than summarising or rewriting them.
2. Checks that PACKAGE.md stays within its 300-line cap after the move (240 lines plus what moves).
3. Settles the refund contradiction from the code shown (refundOrder enqueues, so the queue rule is current and PACKAGE.md's synchronous description is the stale one), not by trusting either document.
4. Leaves a link from AGENTS.md to the PACKAGE.md section that received the moved text, and re-measures AGENTS.md against the 4 KB budget.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
