---
type: llm
---

Context the reply answers: the user measured a guidance document for changelog writing with an LLM judge and wants to report "0% to 100%". The log: baseline on model-s, judge model-xs, one run, rubric not met; with-guidance on model-l, same judge, one run, rubric met; a rerun of the with arm on model-l did not meet the rubric and had no explanation, then the user edited rubric item 2 from "lists every breaking change" to "mentions breaking changes" and reran to a met rubric; the guidance has a worked example with the same facts as the test prompt (v2.3.0, 4 breaking changes, 2 fixes); the user only looked at the judge's verdicts, not the replies. The user has USD 6; one run of one arm costs about USD 0.40 on the larger model and USD 0.10 on the smaller one.

PASS only if the reply does all of these:

1. Says the 0% to 100% claim cannot be reported, and names the model mismatch (with arm on model-l, baseline on model-s) as invalidating the comparison.
2. Says the rubric edit (weakening item 2) invalidates the later result and the earlier baseline, so the rubric must be restored and both arms rerun.
3. Treats the unexplained unmet rerun of the with arm as evidence that the guidance does not reliably meet the rubric (about one of two runs on the original rubric), not as noise to discard.
4. Says the worked example restates the test case (same version, counts) so a result can measure a copied answer; the example must be rewritten with different facts and remeasured.
5. Notes that the small judge may not be strong enough and was never shown to reject a known-bad answer, and recommends checking the judge on a known-bad reply.
6. Notes that the replies were never read and recommends reading a sample of them, passes included.

FAIL if any item is missing.
