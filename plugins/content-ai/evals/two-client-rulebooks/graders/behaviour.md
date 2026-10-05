---
type: llm
---

PASS only if the review does all of these (wording and language are free):

1. Uses only client A's rulebook (v3) and says so; applies no B rule (it does not require the "individual results may vary" line and does not flag words under B-B1).
2. Flags "싸다" under A-B1, the missing "한정 수량" line under A-R1, and the casual ending "느껴봐" under A-T1, each with its rule id.
3. Proposes a revised banner that fixes all three without breaking another A rule.

FAIL if any finding has no rule id, or if a B rule is applied to the A banner.
