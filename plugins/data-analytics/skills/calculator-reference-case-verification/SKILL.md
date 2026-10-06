---
name: calculator-reference-case-verification
description: Prove a generated calculator, converter or numeric tool correct against known reference cases before anyone uses it - state the formula, domain and unit definitions first, build a reference table of at least 5 cases with boundaries and out-of-range inputs, test round trips and dimensions, reject duplicate options and rounding that hides errors, and check extreme inputs. Use when an AI-generated or hand-written calculator, unit converter, pace or load tool, pricing or total calculator, or numeric engine must be trusted, or a user reports a wrong result from one. Not for defining business metrics or writing unit tests for application code.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [calculator, unit conversion, reference cases, round trip, boundary values, numeric precision]
  verified-runtimes: [claude-code]
---

# Calculator reference-case verification

Generated calculators fail in recurring ways: a one-rep-max below the weight lifted, a pace
computed as the inverse of what it should be, a storage list with the same unit twice and
decimal and binary units mixed up. A plausible-looking number is not a test.

## Steps

1. Before checking code, state the formula, its valid domain and the unit definitions
   (for example 1 GB = 1000 MB but 1 GiB = 1024 MiB, or the named rep-max formula and its
   rep range). If the tool does not say which it uses, that is a finding.
2. Build a reference table of at least 5 cases with inputs and the expected result worked by
   hand: ordinary values, boundaries (zero, one, the largest supported), and out-of-range
   inputs with the expected behavior (error or clamp). Show the arithmetic for each.
3. Compare each tool output with its row. A result that violates a sanity bound is a defect
   by itself (a maximum below the lifted weight, a speed slower than a walk for a race).
4. Check dimension and direction: distance over time versus time over distance, and
   convert there and back; the round trip must return the input within the stated rounding.
5. Reject duplicate options in unit or mode lists, and compare displayed rounded values
   against unrounded ones, since rounding can hide a wrong value.
6. For extreme inputs (very large, very small, very deep zoom) check precision and run time
   against a stated limit, and state what the tool does past the limit.
7. When totals are produced, reconcile them against a hand total from the same inputs.

## Output

The formula and unit statement, the reference table with expected and actual values and
pass or fail, the defects found each tied to a row, and the round-trip and out-of-range
cases still to run.
