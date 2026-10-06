---
name: defect-triage-evidence
description: Decide whether a failing regression test is flaky or a product defect, and write the investigation note with confirmed facts apart from hypotheses - separate the symptom, the required behavior and the current behavior, collect rerun evidence, and label a cause as a hypothesis until it is reproduced. Use when a test fails intermittently, a pipeline fails and someone asks flaky or real bug, or a defect investigation note must be written. Not for writing new test cases, fixing the code, or incident postmortems for an outage.
metadata:
  tier: open
  level: L2
  domain: software-qa
  install: optional
  keywords: [flaky test, defect triage, regression failure, root cause, investigation note, reproduction]
  verified-runtimes: [claude-code]
---

# Defect triage with evidence

QA practitioners report two failure patterns: a failure is called flaky or a product bug on a
hunch, and an observed bug symptom is taken as the expected behavior. Judge only what the
evidence supports.

## Steps

1. Write three separate lines before judging: the observed symptom (what failed, with the
   exact value), the required behavior (from the requirement or the test's intent), and the
   current behavior of the product. Do not treat the symptom as the expected behavior.
2. List the evidence given: failure count out of total runs, which tests ran before it,
   timing, environment, seeds, and logs. Name what is missing.
3. Read the pattern. A failure that always follows one specific test points to shared
   state or ordering, not randomness. A failure on every run of a fixed input points to a
   product defect. Failures that track time, load or the environment point to those.
4. Propose the cheapest discriminating runs: the failing test alone, repeated N times; the
   test after the suspected predecessor; the pair in reverse order; a fresh environment.
   State what result would confirm each cause.
5. Classify as flaky or product defect only after a reproduction. Until then label the
   cause a hypothesis, including a shared-state cause, which can still be a product
   defect (state that leaks is a bug in the code under test or in the test setup).
6. Do not rerun until green and close the failure.

## Output

An investigation note with these sections: Symptom, Required behavior, Current behavior,
Confirmed (only what the runs showed), Suspected (hypotheses, each with the run that would
confirm it), Next step.
