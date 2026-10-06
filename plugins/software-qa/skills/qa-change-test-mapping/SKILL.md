---
name: qa-change-test-mapping
description: Update test cases or a test strategy after a story, design or code change - build a requirement to change to case trace table, list changed behaviors with no case and cases with no behavior, flag duplicates, and propose manual versus automated per case for QA approval. Use when a story, diff or design changes and the existing cases must be revised or reviewed for gaps and redundancy. Not for writing test code or choosing a test framework.
metadata:
  tier: open
  level: L2
  domain: software-qa
  install: optional
  keywords: [test cases, test strategy, traceability, regression, test gaps, automation candidates]
  verified-runtimes: [claude-code]
---

# Change to test mapping

QA practitioners report that each repository change leaves the strategy and cases behind:
behaviors added in code have no case, old cases test behavior that is gone, and duplicates pile up.

## Steps

1. List the inputs you were given: requirement or story, design, code diff, existing cases.
   Anything not given is not assumed.
2. Extract each changed behavior from the diff and the requirement, including boundary
   changes (a limit moving from over to at-or-over) and new interactions (two rules
   combined).
3. Build a trace table: requirement, changed behavior, case id. Every row needs a case;
   every case needs a row.
4. Report separately: changed behaviors with no case, cases tied to no current behavior,
   and duplicate or overlapping cases (same input class and expected result).
5. Write the missing cases with preconditions, steps, input and expected result. Put a case
   on each side of a changed boundary, including the exact value.
6. Treat facts taken from a design or screenshot as to be verified on the real screen.
7. Classify each case manual or automated by stability, run frequency and cost. This is a
   proposal; mark it for the QA owner to approve.

## Output

The trace table, the gap and duplicate lists, the new or changed cases, and the
manual-versus-automated proposal with its reason.
