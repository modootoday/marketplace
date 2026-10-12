---
type: llm
---

Context the reply answers:

Audit a retrieval rollout packet. Old results used corpusC1 with admin permissions; new usedC2 with user permissions, different labels and duplicate documents. Reported Recall@5 old.8,new.9 is not recomputed. New latency measurement is warm kernel20ms only; old is full request200ms including embedding/network/filter/rerank. Predeclared KO Recall floor.75; the only comparable fixed KO test reportsnew.70. Explain invalid comparisons, a corrected same-input evaluation plan and end-to-end cold/warm timing boundaries, plus rollout decision. Do not invent raw rankings or a corrected score.

PASS only if all requested observable behaviours below are met. Equivalent wording and equivalent correct arithmetic are accepted.

1. Rejects .8/.9 effect comparison due corpus/permissions/labels/dedup mismatch and specifies matched query/corpus/permissions/label/k policy.
2. Does not recompute unprovided rankings or assert improvement from aggregate claims. Defines the eligible relevance denominator and states underlying matched labels/rankings are required for recomputation; an explicit imperative request is not mandatory.
3. Rejects warm-kernel vs full-request latency comparison, defines cold/warm end-to-end including all listed stages.
4. Blocks unconditional rollout because comparableKO.70 isbelow.75floor, while distinguishing that valid regression from invalid aggregate comparison.

Return only PASS or FAIL.
