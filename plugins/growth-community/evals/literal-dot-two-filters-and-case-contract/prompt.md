---
description: Additional positive search-query-regex-filter coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [search-query-regex-filter, coverage-20261012]
---

Use supplied synthetic RE2 query tool with case-sensitive exact-string matching allowed; no lookaround/backrefs. Include exactly'note.io' or'note io', exclude queries containing'jobs'via separate filter. Ten queries expected match:note.io,note io; expected exclude:note Xio,note.io jobs,jobs note.io,NOTE.IO,note.iob,anote.io,note io,note.io guide. Show rules before patterns, escape dot/end anchors, all 10 hand checks and risks. No actual engine execution or URL rewrite.
