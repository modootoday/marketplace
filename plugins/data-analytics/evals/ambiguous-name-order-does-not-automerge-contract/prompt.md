---
description: Additional positive list-normalize-and-diff coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [list-normalize-and-diff, coverage-20261012]
---

Compare synthetic attendee lists under trim-only, case-sensitive normalization. Old:'Lee, Ana','Ana Lee','Kai',' Kai '. New:'Ana Lee','LEE, Ana','Kai','Jo'. Owner has not approved name-order or case equivalence; comma separators may be name content. Preserve originals, list all normalization changes/duplicates and exact bidirectional set differences/counts. Identify suspected aliases separately for owner decision rather than auto-merging them or claiming distinct human identities.
