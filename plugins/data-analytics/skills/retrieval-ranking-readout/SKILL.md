---
name: retrieval-ranking-readout
description: Read a retrieval ranking experiment from labelled queries and ranked results - calculate Recall at k and MRR, separate language slices, audit the candidate corpus and latency measurement, and reject a misleading aggregate win. Use when comparing lexical and embedding search, choosing a multilingual retriever, or asked whether better average retrieval scores justify a switch. Not for evaluating generated answers or implementing a search engine.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [retrieval evaluation, ranking, Recall at k, MRR, multilingual search]
---

# Retrieval ranking readout

## Establish what was compared

Record the corpus revision, labels, query languages, filters, tie handling, k,
model revision and whether missing relevant items were excluded. Compare both
arms on the same eligible queries and corpus. An item removed by a permission
filter is an eligibility issue, not a ranking miss; do not compare an unfiltered
candidate with a filtered baseline. Mark unknown comparability as unverified.

## Recount before judging

For each query, deduplicate document IDs and report:

- Recall@k = relevant retrieved IDs among the first k divided by all eligible
  relevant IDs. With one relevant ID this equals hit@k; with several it does not.
- RR@k = reciprocal of the first relevant rank if it is at most k, otherwise
  zero. Average it as MRR@k. Untruncated MRR needs the first relevant rank even
  beyond k; never silently mix these definitions.
- A query with no eligible positive label has undefined recall and RR, not
  evidence of a perfect match. Count it separately and disclose exclusions.

Show per-query rows, then means by language and the full query set. Use identical
denominators in both arms. Report query counts and do not let a majority language
hide a minority-language regression. Macro language averages and traffic-weighted
averages answer different questions; label weights rather than inventing them.

## Bound the decision

Separate ranking quality from corpus coverage, label errors and access leaks.
Compare cold and warm end-to-end latency separately, including query embedding,
filtering and retrieval. A warm kernel timing is not a cold request p95. Do not
infer RAM, cost, confidence intervals or production gains from missing data.

Apply the user's per-language floors, latency budget and permitted regressions
before aggregate improvement. If these were not supplied, report the observed
tradeoff and request them before recommending a rollout. With a tiny sample,
recommend a larger labelled holdout rather than claiming statistical certainty.

## Output and stop conditions

Return the metric definitions, per-query and language tables, comparability
unknowns, latency evidence, decision and the next measurement. Stop short of a
rollout when labels or corpus eligibility differ, required slices regress, or
the latency budget was measured on a different path.
