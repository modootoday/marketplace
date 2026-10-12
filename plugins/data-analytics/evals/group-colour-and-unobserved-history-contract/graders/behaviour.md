---
type: llm
---

Context the reply answers:

Review a synthetic BI report. Model has Facts(month,group,value) linked many-to-one to CurrentMaster(group,status), with filters from master to Facts. Facts: Jan/A10,Feb/A20,Jan/B100,Feb/B150. CurrentMaster says A=approved,B=pending as of today; no status history/snapshot exists. A chart currently colours values using global minimum10/maximum150, but the owner wants a min/max scale within each group across months. Explain relationships and row/group/total contexts, calculate both groups' endpoints, propose a per-group scale and verification table, and determine whether January historical approval can be reconstructed. Do not invent previous statuses or execute code.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Recognises valid master-to-fact group filtering but current master contains no historical status evidence; January historical approval remains unknown and needs dated snapshots/events.
2. Computes group A bounds10/20 and B100/150, in contrast to global10/150, and scopes colour calculation within group across the two months.
3. Provides row/group/total verification including the single-value/equal-min-max boundary and states its handling rather than inventing a denominator.
4. Gives unexecuted logic, requests historical evidence for past status and does not present the current master as a reconstruction of history.

Return only PASS or FAIL.
