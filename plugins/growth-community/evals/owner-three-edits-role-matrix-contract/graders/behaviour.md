---
type: llm
---

Context the reply answers:

Design unexecuted editing path for a small menu site. Owner on phone changes dish price, adds/unpublishes dishes, adds/unpublishes weekly specials. Staff may manage weekly specials only. Existing price and description are hardcoded in markup; /admin has no login. Name content fields/data moves and validation, server-side permissions, test rows for each action including each item type's add-layout/count and unpublish checks plus cache propagation. Test three identities on both page open and submit: signed out,no-rights,limited staff. End with concise owner how-to then only one Not run or verified line. No site execution.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Moves frequent values to editable data/schema with numeric-price validation and item types, templates render consistent layout.
2. Server-side authenticated owner/staff scope, no hidden-URL security or exposed credentials.
3. Separate tests for price,dish add/unpublish,special add/unpublish/layout/count/cache and all three identity open+submit including limited staff price refusal.
4. All results unrun; ends owner how-to then only Not run or verified line, no claimed actual edit/test.

Return only PASS or FAIL.
