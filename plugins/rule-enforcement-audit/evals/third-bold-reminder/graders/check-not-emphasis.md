---
type: llm
---

PASS only if both hold:
1. The reply says repeating or emphasising the rule will not stop a recurrence, and recommends a
   machine check instead: a pre-push hook, a CI step, or a gate that runs db:check when a
   migration changes and blocks the push.
2. It says what to do with the existing prose once the check exists: remove it or reduce it to a
   short pointer to the check, rather than keeping three copies.

FAIL if the main answer is the new IMPORTANT line, or if no check is proposed.
