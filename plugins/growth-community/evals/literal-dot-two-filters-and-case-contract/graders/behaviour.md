---
type: llm
---

Context the reply answers:

Use supplied synthetic RE2 query tool with case-sensitive exact-string matching allowed; no lookaround/backrefs. Include exactly'note.io' or'note io', exclude queries containing'jobs'via separate filter. Ten queries expected match:note.io,note io; expected exclude:note Xio,note.io jobs,jobs note.io,NOTE.IO,note.iob,anote.io,note io,note.io guide. Show rules before patterns, escape dot/end anchors, all 10 hand checks and risks. No actual engine execution or URL rewrite.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Exact include anchored^(note\.io|note io)$ or equivalent, literal dot escaped, no wildcard/lookaround.
2. All 10 expected results correct including up per case/doublespace/pre fix/suffix exclusions; separate jobs exclusion described.
3. Declares supplied RE2/case sensitivity and exact-query scope, no unrequested variants.
4. Table hand-traced plus false-negative variants/export verification, no executed tool or redirect rule claim.

Return only PASS or FAIL.
