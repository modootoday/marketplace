---
type: llm
---

PASS only if the reply proposes both of these checks:
1. prove the hook fires at all, for example by having the handler append a line to a file (or by
   reading a debug log that lists each hook run);
2. prove the injected context reaches the model, for example by putting a unique token in the
   additionalContext and looking for it in the model's reply.

Other advice (JSON shape, matchers, settings location) may be included. FAIL if either check is
missing.
