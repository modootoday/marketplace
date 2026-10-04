---
type: llm
---

PASS only if all three hold:
1. export-api and audit-log are judged complete (or superseded / archived), not "waiting" or "in
   progress", because the roadmap's change register records them as shipped; export-api names
   docs/api/export-v2.md as its successor.
2. Each decision cites its evidence (the register line, or the header), not a general impression.
3. rate-limits is left undecided, or flagged as needing a person, because the register does not
   mention it; it is not guessed from its age or header alone.

FAIL if the stale headers are trusted over the register, or if rate-limits gets a confident status.
