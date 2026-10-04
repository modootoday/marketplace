---
type: llm
---

PASS only if all three hold:
1. The document contains a concrete shell command (for example a grep or rg over packages/*/src
   for "export default") that would exit non-zero, or print findings, when the rule is broken. A
   sentence telling a reviewer to check is not enough.
2. It states the reason for the rule (the renamed default export a refactor missed).
3. It does not include a task list or a migration plan as part of the rule.

FAIL if there is no runnable command, or if the reason is missing.
