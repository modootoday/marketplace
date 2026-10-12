---
type: llm
---

Context the reply answers:

Build a draft option matrix, no upload. Sizes S/L, colours Red/Blue, bundles Single/Pair. Base 100 rule P1, L+20 rule P2, Pair+80 rule P3, but Blue/L/Pair has named exception P4 with price missing: do not calculate an ordinary price even in notes for that exception. Red/L/Pair excluded. Stock dated 2030-01-02 is grouped by colour/size only: Red/S10,Red/L4,Blue/S8,Blue/L6; no bundle allocation. SKU pattern colour-size-bundle. Store limit 6 sellable combinations, price difference<=100 from base. Expand combinations, exclusions, prices/rules, group stock once, flags and owner questions.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Expands 8 combinations, excludes Red/L/Pair leaving 7, flags 6-option limit rather than silently dropping another.
2. Normal prices SS ingle 100,LS ingle 120,SP air 180; Blue/L/Pair price remains empty and no ordinary fallback 200 any where.
3. Preserves dated grouped stock once per colour/size, leaves bundle division unknown instead of allocating/duplicating group stock as sellable inventory.
4. SKU/rule provenance, missing-exception and store-limit questions for owner; no upload/price repair claim.

Return only PASS or FAIL.
