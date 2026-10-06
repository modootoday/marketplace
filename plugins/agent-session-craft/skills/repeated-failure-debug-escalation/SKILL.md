---
name: repeated-failure-debug-escalation
description: Stop a coding session that keeps retrying the same failing approach - log every attempt with its approach and error, count attempts per approach, stop at three, run a separate diagnostic pass that reproduces the failure and lists hypotheses before any new fix, and hand only verified findings back into the retry. Use when a fix has failed two or three times, the user says the agent is looping, or the same test or error returns after repeated changes. Not for planning remaining work (followup-wave-loop) or a first failed attempt.
metadata:
  tier: open
  level: L3
  domain: agent-workflow
  install: optional
  keywords: [debugging, retry loop, failed fix, escalation, reproduction, hypotheses, diagnosis]
---

# Repeated-failure debug escalation

Read `references/escalation-template.md` first and answer in its four sections.

A fourth identical retry rarely works. The cost is in the loop, so set a limit and change mode
when it is reached.

## Steps

1. **Attempt log.** Open the reply with this table, before anything about the code: attempt number, approach in one phrase, change made, exact
   error or test output after it. Group attempts by approach, not by wording: renaming a
   variable and retrying the same fix is the same approach.
2. **Limit.** When one approach has failed three times, stop. Say it in these words: approach
   X has failed 3 of 3 attempts, so there will be no fourth attempt of it. Name the approach
   and the count. Two different approaches count separately.
3. **Diagnostic pass.** Switch to diagnosis only, no fix. Reproduce the failure with the
   smallest command or input, record what you observe, then write two or three hypotheses
   for why every attempt failed, each with the observation that would confirm or kill it.
   Prefer an isolated context or subagent so the failed approach does not frame it.
4. **Verify.** Run the check for each hypothesis and mark it confirmed, rejected or not
   tested, with the output. A guess that was not run is not a finding.
5. **Hand back.** Pass only confirmed findings into the next fix, plus the list of approaches
   already ruled out. If nothing was confirmed, report that and ask the user for the missing
   fact instead of trying again.

When no code or shell is reachable, do steps 1 and 2 from what the user pasted, then write the
reproduction as an exact command or input for the user to run and the hypotheses as untested.
Do not stop at "cannot access the repo": the attempt log, the count and the stop come first.

## Output

The attempt table with approach counts, the stop statement, the reproduction command and its
output, the hypothesis table with status, and the verified findings carried into the next
attempt. A fix is proposed only after this.
