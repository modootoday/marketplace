---
type: llm
---

Context the reply answers: the user asked for a prompt for a subagent that does not see the conversation, and for a description of what it should send back. The task is to regenerate sample files for the invoices module so they pass `npm run validate:samples -- invoices`. Each sample file has a "severity" metadata field that a downstream dashboard reads, meaning how serious a validation problem in the file would be. Last time an agent kept rerunning the validator until the check passed.

PASS only if the reply does all of these:

1. Gives a value contract for the "severity" field: a closed list of allowed values (any list is fine) and says what must never go in it (for example confidence, evidence strength, free text or numbers outside the list), or says where such information goes instead.
2. Includes a stop rule with a number: a maximum count of validator reruns, fix rounds, turns or spend, and says what to do on reaching it (stop and report as open or partial, not keep iterating).
3. Specifies the hand-back format with separate parts for what was done, evidence (the validator command and its output), what was not verified, and open items, and asks for everything found to be reported.
4. Puts the objective, a done-state (the validator passing on the invoices module) and the context the subagent cannot see (paths, command, schema location) into the prompt itself rather than referring to "our discussion".

FAIL if any item is missing.
