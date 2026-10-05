---
type: llm
---

Context the reply answers: a fixed same-corpus, same-filter four-query experiment at k=2 with one positive per query. English ranks are lexical [2,2,absent], embedding [1,1,1]; Korean ranks are lexical [1], embedding [3]. Reported 40ms p95 excludes embedding and is warm kernel-only; the budget is 100ms cold end-to-end. No regression tolerance or traffic weights were agreed.

PASS only if the reply does all of these:

1. Gives Recall@2 overall 0.75 to 0.75 and English 2/3 to 1, Korean 1 to 0.
2. Distinguishes MRR@2 (0.50 to 0.75 overall) from untruncated MRR (0.50 to 5/6 overall) and identifies the truncation rather than silently counting rank 3 in MRR@2.
3. Refuses a rollout based on the aggregate, explicitly citing the Korean regression and missing agreed tolerance, and requests a larger labelled holdout or per-language acceptance criteria.
4. Says the 40ms measurement does not prove the 100ms budget and asks for cold end-to-end p95 including embedding; does not invent traffic weights or measured certainty.
