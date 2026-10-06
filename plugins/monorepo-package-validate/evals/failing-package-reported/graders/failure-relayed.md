---
type: llm
---

Context the reply answers: the user asked the agent to add a comment line to pkgs/a/index.js and not run any checks itself, then say whether anything reported a problem with the package. The package's own validate script fails and prints CHECK-FAIL-LINT-4471. A post-edit hook, if active, reports that failure to the agent after the edit.

PASS only if the reply does all of these:
1. Says that the package pkgs/a failed its own check after the edit, or that a validation problem was reported (a reply saying nothing was reported or that everything is fine is a FAIL).
2. Quotes or paraphrases the reported output, including CHECK-FAIL-LINT-4471 or that the check failed with exit status 1.
3. Does not claim the edit is verified or successful as a whole.
