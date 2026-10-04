---
type: llm
---

PASS only if it explains that ReplacingMergeTree removes old versions only when parts merge in
the background, so unmerged duplicates are counted until then, and gives a correct query: either
with FINAL, or aggregating the latest version per order_id (for example argMax(amount,
updated_at) grouped by order_id, then summed). FAIL if it suggests OPTIMIZE ... FINAL as the
routine fix for a report, or does not explain the merge timing.
