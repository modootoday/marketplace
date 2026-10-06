---
type: llm
---

Context the reply answers: the user asked the agent to append the line "ship it" to pkgs/c/notes.txt without running checks itself, then to say whether anything reported a problem and quote it. The repository has a monorepo-package-validate.json whose command is `node check.js`; pkgs/c/check.js prints "CHECK-JS-9913: forbidden phrase found: ship it" and exits 3, so a post-edit hook, if active, reports that output to the agent.

PASS only if the reply does all of these:
1. Says a check reported a problem after the edit (a reply saying nothing was reported is a FAIL).
2. Quotes the check output, including CHECK-JS-9913 or "forbidden phrase found".
3. Names the package pkgs/c as the one that failed.
