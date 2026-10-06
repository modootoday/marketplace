---
name: subagent-claim-verification
description: Use when the user pastes a subagent's or worker's report claiming results (all tests pass, 5 of 5 cases at 1.00, fixed, only touched one file) together with its output, and asks you to draft the announcement, say whether it is safe to accept, merge or ship, or verify it first. Do not take the report at its word - list the claims that matter, re-check each against the pasted artifacts (result tables, git status, timestamps, models used), look for shortcuts such as edited tests or graders, and answer with verified, refuted and unverified claims kept apart. Not for designing an evaluation or comparison.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [verification, subagent report, claims, evidence, re-measure, shortcuts, refuter, hand-back]
  verified-runtimes: [claude-code, gemini-cli]
---

# Subagent claim verification

A report says what the agent believes or wants you to believe. Agents stop when work looks done, mark
tasks complete late or early, and sometimes edit the check instead of fixing the work. Verification
that only re-reads the report catches nothing.

## 1. List the load-bearing claims

Extract each claim you would act on: files changed, tests pass, a score or count, items done, "no
other changes". Skip the narrative. One claim per line.

## 2. Re-measure from artifacts

For each claim, name the artifact and the check, then do it:

- Changed files: read the diff or the file list, not the summary.
- Tests or checks pass: rerun the command, or read the raw output file with its exit status.
- Scores and counts: recompute from the result files; if the prose number differs, the files win.
  A rounded or averaged number hides a failing run.
- Items done: open the items and check the done-state from the brief.

If you cannot run or read the artifact, the claim is unverified, not true. Say in the reply what you
have not re-run yourself (you only read the pasted data) and what you need to recompute it: the result
files, the diff, the check output. Check the diff for changes outside the write set the brief assigned
even when the report says there were none.

## 3. Check for shortcuts

- Tests, graders, rubric items, fixtures or thresholds edited, deleted or skipped.
- Anything modified outside the write set the brief assigned.
- Examples or fixtures that restate the test case, so the result measures memory.
- A treatment run under different conditions (model, grader text, environment) than its baseline.

A changed grader after a baseline was taken invalidates that baseline. Name what must be rerun.

## 4. Independent refutation of findings

For lists of findings, give each to a fresh-context reviewer with only the stated criteria and the
evidence, and ask it to try to refute the finding. Bound the reviewer to correctness and the stated
requirements so it does not invent style objections. Keep "could not check" separate from "refuted".

## 5. Report in three bins

If you are asked to announce or relay the result, write the message from the verified bin only, and
put the rest in it as open work with what is being rerun.

Verified (with the artifact and command), refuted (with what the artifact shows), unverified (with
what is needed). Deduplicate and rank in one pass. Do not relay the agent's numbers in the bin of
verified until recomputed.

## 6. Spend verification where it pays

Verify at merge points and on claims you will act on. Do not stack self-check prompts on a model that
already checks itself, and do not spawn a verifier for a claim you can confirm with one command.

Read `references/claims-audit-example.md` for an audited report.

## 7. Every answer states these

1. Which claims hold, which do not and which are unverified, as three separate groups, each with the artifact it rests on.
2. For every score, the recomputed value from the result files next to the claimed one; rounded or averaged claims are broken out per item.
3. Which comparisons are invalid and why (different model, edited grader or test, sample table, single run), and the exact rerun that would settle each.
4. That you have not rerun anything yourself and only read what was pasted, unless you did; what you need to see to verify.
5. That the diff must be checked for changes outside the assigned write set, whatever the report says.
6. A message you can send now that contains only the verified part and names what is being rerun.
