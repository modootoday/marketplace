---
name: eval-iteration
description: Read a skill eval result table and decide what to change next - description first when the skill never fired, re-measure both arms when with-only graders inflate scores, rerun before editing on a single judge failure, keep worked examples independent of the eval prompt, and stop after two fix rounds. Use when a skill's eval scores are given, when a score is 0 with the skill, when without and with are both 1.00, or when a worked example may mirror the eval case. Not for writing a skill from scratch or for installing a plugin.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [skill eval, plugin eval, ablation, with without, fired, judge variance, baseline, regression]
  verified-runtimes: [codex-cli]
---

# Iterating on an eval result

Read the table in this order, and change one thing per round.

1. Fired. If fired is below n of n, nothing else matters yet. Fix the description
   first: add a "Use when" clause with the words users type and a "Not for" clause.
   Do not add body rules.
2. Both arms. A with-only grader (a "skill fired" check) can make a score look
   high when the behaviour checks were never measured without the skill. Score
   both arms for every recorded row; a row measured with only one arm is not a delta.
3. Baseline already 1.00. The case is a regression check, not evidence that the
   skill helps. Keep it and add a harder case where a plain model fails.
4. Fired but no lift. Open the judge's failed items. If the body does not ask
   for the checked behaviour, put it in a numbered step; if the case asks for
   something the prompt or sandbox cannot supply, fix the case or its context
   paragraph without loosening an item.
5. One judge FAIL among three votes, or a FAIL with no reason: rerun the case
   once before editing anything. Variance is not a skill defect.
6. Worked examples. A reference whose scenario repeats the eval prompt (same
   names, numbers, facts) turns the score into a memory test. Rewrite it with a
   different scenario; re-measure both arms after.
7. Runs. Record two runs per arm for the final row and say which model was the
   subject and which the judge; a different judge is a different scale.
8. Stop rule. Two fix-and-rerun rounds per case. If still below 1.00, add a
   reference with a different scenario, then one final run on the stronger model.
   Report anything still open with its cause.
9. Never remove or weaken a rubric item to get a pass.

See `references/decisions.md` for worked readings.
