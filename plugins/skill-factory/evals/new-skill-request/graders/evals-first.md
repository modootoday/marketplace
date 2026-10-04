---
type: llm
---

PASS only if all three hold:
1. It proposes eval cases (at least two positive cases and one negative near-miss case where the
   skill must not fire) or explicitly plans to test the skill with and without it, rather than
   only writing the file.
2. The description says when to use it with words a user would type and says what it is not for.
3. It asks or reasons about what a model gets wrong in commit messages without the skill, and the
   body focuses on that instead of restating generic commit advice at length.

FAIL if any of the three is missing.
