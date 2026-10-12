---
type: llm
---

Context the reply answers:

Read a synthetic retrieval test with same corpus/permissions, deduplicated top3 and binary labels. EN q1 relevant{a,b},results[a,x,b]; EN q2 relevant{c},results[x,y,c]; KO q3 relevant{d},results[d,x,y]; KO q4 relevant{},results[x,y,z]. Define per-query Recall@3 and reciprocal rank truncated@3, then macro report EN/KO with denominators and the no-positive query separate. Provide overall eligible-query values, warn about tiny N and distinguish this truncated metric from an untruncated MRR. No live benchmark.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. q1Recall1,RR1;q2Recall1,RR1/3;q3Recall1,RR1; q4recall/RR excluded or explicitly undefined with no-positive reason.
2. EN meansRecall1,RR2/3 over2;KORecall1,RR1 over1eligible plus1no-positive;overallRecall1,RR7/9 over3eligible.
3. States k3/dedup/corpus/permission/label parity and uses same eligible denominator policy instead of scoring q4 as successfulzero.
4. Labels reciprocal rank as truncated@3, tiny sample descriptive only and no executed benchmark/robust language superiority claim.

Return only PASS or FAIL.
