---
type: llm
---

PASS only if the reply names the likely cause as the runtime requiring hooks to be trusted (or
approved) first and skipping untrusted hooks silently when not attached to a terminal, and the fix
is a deliberate trust step for that source rather than a blanket bypass of the check. It should
also suggest confirming the hooks fire, for example by having one append to a file. FAIL if the
main explanation is a wrong path, a syntax error, or a missing environment variable with no
mention of trust.
