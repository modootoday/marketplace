---
type: llm
---

PASS only if the reply does all of these (wording is free):

1. Says the plan headers are not evidence and judges status from the code and history instead.
2. Judges search-v2 as partial (v2 and flag work done, v1 deletion not done) and carries the v1 removal into an active item or new short plan, rather than leaving the old plan marked in progress.
3. Judges webhooks-retry as obsolete or superseded and names the queue-provider plan as the successor when archiving it.
4. Judges ids as applied and promotes the ULID-with-type-prefix rule into a source-of-truth document or decision record before or while archiving the plan.
5. Gives a per-plan output with status, evidence and action (a table or equivalent), and describes the same procedure for the other plans.

FAIL if any item is missing.
