---
name: worked-solution-step-audit
description: Audit a pasted worked solution one step at a time - rewrite it as numbered equivalences with the rule used and its conditions, find and quote the first incorrect step, show the corrected step, redo only what follows, and verify the final result by an independent method such as differentiating, substituting back or a numeric spot check; for a textbook-style explanation, tabulate the claims against the pasted text and mark causal claims it does not support. Use when a student pastes their own solution or an AI explanation and asks where it went wrong, whether it can be trusted, or wants every step shown. Not for solving a graded problem the student has not attempted, for writing answers to hand in or for judging a student.
metadata:
  tier: open
  level: L3
  domain: education
  install: optional
  keywords: [calculus, algebra, worked solution, error finding, first error, step check, verification, textbook]
---

# Worked solution step audit

Long error chains and skipped steps hide the one place a solution went wrong. Find that
place, fix it, and prove the fix by a second route.

## Steps

1. Work from the student's own attempt. If nothing is pasted and the problem looks like
   graded work, do not hand over the answer: ask for their attempt or offer a hint for the
   first step. If the attempt is pasted, continue.
2. Rewrite the solution as numbered lines, one equality or implication each, with the rule
   or theorem used and its conditions (for example integration by parts: choose u and dv,
   then du and v, and check v by differentiating it). Do not skip intermediate algebra,
   including the ones the student skipped.
3. Check each numbered line locally: does it follow from the line before? Differentiate or
   substitute small pieces when the rule has a factor that is easy to drop (a chain-rule
   factor, a sign, a constant of integration, a limit that changes under substitution).
4. Name the first incorrect line. Quote it, say why it fails, and show the corrected line.
   Mark every later line as "not checked, depends on line N" and stop propagating them. Then
   redo the remainder from the corrected line, every algebra step written out.
5. Verify the final result by an independent method, shown with its working: differentiate
   an antiderivative back to the integrand, substitute a root back, or evaluate numerically
   at one or two points and compare. Recompute any definite value from the corrected
   antiderivative.
6. For a textbook or pathway explanation: build a table with a row per claim (reactants,
   products, direction, conditions) beside the pasted text. Mark each claim supported by
   the text, contradicted, or not in the text. Mark causal claims ("this happens because")
   that the text does not state as needing a source, rather than repeating them.
7. If several errors exist, report the first one and list later suspects separately with
   the reason; a later line that only inherits the error is not a second error.

## Output

The numbered rewrite with the first wrong line marked, the corrected derivation, the
independent check, and a one-line list of what the student should redo themselves. Offer a
similar problem for the student to try unaided.
