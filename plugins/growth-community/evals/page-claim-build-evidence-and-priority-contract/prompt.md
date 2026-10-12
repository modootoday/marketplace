---
description: Corrected positive site-content-grounding-check coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [site-content-grounding-check, coverage-20261012, corrected-fixture]
---

Audit generated synthetic page vs supplied source. Source L1:'Records source passages';L2:'Exports CSV';L3 owner contact owner@example.invalid. Page claims C1 records sources,C2 AI fact verification,C3 trusted by 1000,C4 exports CSV, contact link mail to:other@example.invalid, download href'#'. No screenshot/build file/live access. Ledger all four claims/counts, flag unsupported/filler and wrong links, corrected grounded claims and unrun link checks. No automatic page edits. Prioritize unsupported claims before link defects and explicitly request the missing build evidence as well as the actual download destination before verification.
