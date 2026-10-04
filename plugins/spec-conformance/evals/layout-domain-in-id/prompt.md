---
description: A tidy-sounding rename proposal. Layout must refuse the domain in the id and treat the directory rename as optional.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [spec-layout]
---

A teammate proposes two changes to our design-doc folder: rename the `adr/` directory to
`decisions/`, and prefix every document id with its domain, so `20250311-search-reindex` becomes
`billing-20250311-search-reindex`. Ids are the filenames and other docs link to them by id. Should
we do both?
