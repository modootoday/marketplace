---
type: llm
---

PASS only if all three hold:
1. One source file is edited and the three names become links (symlinks or equivalent
   projections) to it, rather than three maintained copies.
2. The always-loaded file keeps rules only; the progress notes, changelog and runbook move out to
   a document read on demand or to version control.
3. Something checks the projections mechanically (a hook, lint or CI step), so a broken or
   diverged link is caught.

FAIL if any of the three is missing.
