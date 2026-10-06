# Comparison audit example

Scenario (synthetic): a team measures a "meeting-notes summariser" prompt with an LLM judge.

Log:

```
run A  without prompt  model m-large  judge m-small  runs 1  score 0.00
run B  with prompt     model m-xl     judge m-small  runs 1  score 1.00
run C  with prompt, rubric item 3 deleted after a negative verdict    runs 1  score 1.00
reference notes: use the Tuesday budget meeting (4 attendees, 3 decisions) as the worked example
eval case: a Tuesday budget meeting, 4 attendees, 3 decisions
```

Audit:

| Finding | Why it invalidates | Action |
| --- | --- | --- |
| A and B use different subject models | the gap may be the model | rerun both arms on one model in one batch |
| judge m-small | not shown to reject a known-bad summary | check it on a bad answer, or use a stronger judge |
| run C deleted an item | the pass is no longer the same test | restore the item, fix the prompt, rerun both arms |
| reference equals the case | the pass measures a copied answer | rewrite the example with other facts, remeasure |
| one run per arm | no rate | final run with two runs per arm |

Plan: restore the rubric, rewrite the reference, run both arms on the same model and judge, rerun any
unexplained negative verdict once, cap fixes at two rounds, hold the final run's budget back before starting.
