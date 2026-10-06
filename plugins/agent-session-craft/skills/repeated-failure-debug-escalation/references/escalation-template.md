# Escalation reply layout

Use these headings in this order. Fill the example values from the user's own attempts.

## 1. Attempt log

| # | Approach (one phrase) | Change made | Error or output after it (quoted) |
| --- | --- | --- | --- |
| 1 | wrap call in try/except | try/except around the call in the test helper | `ValueError: time data '2026-1-5' does not match format` |
| 2 | wrap call in try/except | same wrap, inside the helper | same error, quoted again |
| 3 | wrap call in try/except | wrap moved one level up | same error, quoted again |

Approach counts: `wrap call in try/except` 3 of 3. Quote the error for every row, even when it
repeats, and say that the three attempts are one approach, not three.

## 2. Limit

State it as one sentence: `The approach "wrap call in try/except" has failed 3 of 3 attempts, so I will not make a fourth
attempt of it.` Add the approaches now ruled out.

## 3. Diagnostic pass (no fix yet)

- Reproduction: the smallest command or input, written out, for example parsing the failing
  value alone. If you cannot run it, say so and give it for the user to run.
- Hypotheses table: hypothesis, what would confirm it, what would kill it, status
  (`confirmed`, `rejected`, `not tested`).

## 4. Hand-back

List only `confirmed` findings as input to the next fix, then the ruled-out approaches. If none
is confirmed, say so and ask for the one missing fact.
