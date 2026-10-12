---
type: llm
---

Context the reply answers:

Write filter for synthetic analytics tool declared RE2, case-sensitive, lowercase input, no lookaround/backrefs, with separate include and exclude filters. Include standalone word'birch' any where, exclude standalone'jobs'. Must include:birch,birch notes,buy birch,red birch notes,birch guide. Must exclude:birch jobs,jobs birch,birchwood,pbirch,oak. Give include/exclude lists before pattern, anchor/boundary reasoning, table all 10 expected/hand results, risks and export recheck. No engine execution/current vendor claim.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Uses RE2-safe standalone word boundaries or equivalent (^|\s)birch(\s|$), separate exclusion for jobs, no lookaround/backrefs.
2. All 10 queries and specified expectations traced consistently; birchwood/pbirch substring and job combinations excluded.
3. States supplied case/lowercase/dialect and anchors deliberately; examples lists precede patterns.
4. Hand checked/unexecuted qualification plus unknown variants/scripts/word order risks and real-export recheck.

Return only PASS or FAIL.
