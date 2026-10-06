---
name: eval-comparison-hygiene
description: Keep a with-versus-without measurement honest when the change is a skill, prompt or agent and the graders are models - hold subject model, judge, grader text, prompt and environment constant across both arms run in the same batch, invalidate old baselines after any grader or prompt edit, keep references independent of the test case, use a judge strong enough to reject a known-bad answer, rerun an unexplained negative verdict once, cap fix rounds and reserve the final run budget. Use when reading, reviewing or planning an eval log, a before-after score or an uplift claim. Not for production monitoring dashboards or for verifying a single subagent report.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [evals, baseline, llm judge, uplift, confound, rubric, reruns, budget, grader]
  verified-runtimes: [claude-code]
---

# Eval comparison hygiene

An uplift number is only as good as the match between its two arms. Most bad results come from a
difference nobody wrote down.

## 1. Hold everything but the treatment constant

Both arms use the same subject model, the same judge, the same grader text, the same prompt and a
clean environment, and run in the same batch. Any edit to a grader, prompt or context paragraph
invalidates earlier baselines: rerun both arms, do not reuse the old baseline. A with-arm on a stronger
model than the baseline measures the model, not the change.

## 2. Keep references independent of the case

Worked examples, fixtures and few-shot text must use a different scenario (other names, facts,
numbers) from the test case. If an example restates the case, a pass measures a memorised answer.
Compare each reference against the prompt and rewrite overlaps, then remeasure. As the reference set
grows, keep a held-out case that no reference was written from.

## 3. Judge and rubric

- Use a judge strong enough to reject a known-bad answer. A small judge that passes the baseline shows no
  effect; confirm it rejects one.
- Split a compound rubric into several graders, each checking one thing, and give the judge the facts
  it needs in the rubric. Never weaken or delete an item to get a pass.
- Judges favour position, length and their own style; swap order where answers are compared and prefer
  a different judge family where you can.

## 4. Reruns, rounds, budget

- An unexplained negative verdict gets one rerun before any change. Record runs per arm; one run is a
  sample, not a rate.
- Cap fix rounds per case (for example two), then report it open and reinforce the skill with
  references or scripts instead of rewording.
- Reserve the final both-arm measurement budget before iterating; sum the cost from every result file
  after each run and stop at the cap.

Budget arithmetic goes in the answer: arms times runs per arm times the price per run, plus the judge
check, plus the reserve, summed against the money left. Show the sum and keep it under the cap. When
there is a result to report, say it as counts with the subject model, the judge, the rubric version and
runs per arm, never as a bare percentage.

## 5. Read transcripts

Read a sample of passes as well as negative verdicts: a pass for the wrong reason is still a defect. Grade the
produced output, not the path, but check that the grader cannot be passed by a shortcut.

## 6. Every answer states these

1. Each confound found in the log (different subject model between arms, edited grader or rubric after a baseline, a reference equal to the case, a weak or unchecked judge, one run per arm, unread replies) and what it invalidates.
2. That a rubric item is never weakened to get a pass; the original is restored and both arms rerun.
3. That an unexplained negative verdict is rerun once and counted, not discarded.
4. The check that the judge rejects a known-bad answer, and that replies are read.
5. The next measurement as arms times runs times price, with the reserve and the fix-round cap, summed under the money left.
6. What can be reported afterwards, as counts with subject, judge, rubric version and runs per arm.

## 7. Report the comparison

State subject, judge, runs per arm, cost, which numbers are valid, which arms must be rerun and why.
Read `references/comparison-audit-example.md` for an audited log.
