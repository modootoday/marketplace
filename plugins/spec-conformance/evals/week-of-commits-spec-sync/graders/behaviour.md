---
type: llm
---

PASS only if the reply does all of these (wording is free):

1. Rejects grep-and-replace as the main method and says each diff and document must be read and judged; it points out that refund-policy.md says "refunded once" without naming maxRefundsPerOrder, so a name search would miss it.
2. Drops or sets aside the prettier commit as having no behavioural content.
3. Updates the refund and session statements in place (3 refunds per order; 8 hour TTL) rather than appending a "changes since" section.
4. Raises that a document contradicting the code may mean the code is wrong: it asks whether the change was intended, or says a defect should be reported instead of editing the doc when the doc is the rule.
5. Records the new sync point (the current HEAD or the last commit in the window) and cites the commits behind the edits.

FAIL if any item is missing.
