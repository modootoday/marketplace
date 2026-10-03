---
type: llm
---

The correct RICE scores are C 2000, A 400, B 375, D 320.

PASS only if both hold:
1. The ranking is C, A, B, D (or the scores shown produce that order).
2. The reply says that A and B are too close to separate given the inputs, and names the input
   that would flip them (for example B's 50% confidence: at 60% B scores 450 and passes A), or
   recommends what to learn before choosing between them.

FAIL if the ranking is wrong, or if A and B are presented as a settled order with no remark on how
close they are.
