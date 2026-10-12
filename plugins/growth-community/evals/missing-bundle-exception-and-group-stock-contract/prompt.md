---
description: Additional positive catalog-listing-with-options coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [catalog-listing-with-options, coverage-20261012]
---

Build a draft option matrix, no upload. Sizes S/L, colours Red/Blue, bundles Single/Pair. Base 100 rule P1, L+20 rule P2, Pair+80 rule P3, but Blue/L/Pair has named exception P4 with price missing: do not calculate an ordinary price even in notes for that exception. Red/L/Pair excluded. Stock dated 2030-01-02 is grouped by colour/size only: Red/S10,Red/L4,Blue/S8,Blue/L6; no bundle allocation. SKU pattern colour-size-bundle. Store limit 6 sellable combinations, price difference<=100 from base. Expand combinations, exclusions, prices/rules, group stock once, flags and owner questions.
