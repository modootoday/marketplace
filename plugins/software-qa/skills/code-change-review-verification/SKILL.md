---
name: code-change-review-verification
description: Verify each finding of an AI or human code review against the diff and the code that would run, mark it confirmed, refuted or unverified with the call path or test that settles it, and list the docs, config keys and examples the diff made wrong with both lines quoted. Use when a review lists claimed bugs that must be checked before acting, when a review sounds plausible but cites code you cannot find, or when docs must be checked after a behaviour change. Not for writing a first review, style feedback, or mapping changes to test cases.
metadata:
  tier: open
  level: L3
  domain: software-qa
  install: optional
  keywords: [code review, review findings, hallucinated finding, diff, stale docs, call path, verification]
  verified-runtimes: [claude-code]
---

# Code change review verification

Developers report reviews that read well but cite problems that do not exist, and docs left
stale after a change. Check each claim against the code; do not add a new review.

## Steps

1. Restate each finding as a falsifiable claim: given this input or state, this code path
   runs and produces this wrong result. If the finding cannot be stated that way, it is
   too vague; mark it unverified and say what is missing.
2. Trace the claim. Follow the call path from the caller to the line cited, quoting the
   lines that run. A claim about a value (null, undefined, empty) needs the line where the
   value is read and the evidence that it can arrive there. If the code that would
   run is not in the material given, the claim is unverified, not refuted and not confirmed.
3. Mark each finding confirmed (the path is shown and the result follows), refuted (the
   code shown makes it impossible or already handled; quote the guard) or unverified. For
   every unverified finding name the test or run that would settle it, with the input. For a
   confirmed behaviour change also name the test that pins the intended behaviour (input and
   expected result), so every row of the table carries a path and a test.
4. Check behaviour changes at call sites too. When the diff changes how a function fails or
   returns (throws before, returns now), read each caller for what it did with the old
   behaviour and say what happens now. A caller that relied on the exception is a
   regression only if the code shows it. When a claim mixes a behaviour change with a
   consequence, give two verdicts: the behaviour change (confirmed when the code shows it)
   and the consequence as worded (refuted when the code does not support it).
5. List what the diff made wrong outside the code: README text, comments, config keys,
   examples and error messages. Quote the stale line and the line of the diff that
   contradicts it.
6. Add no findings of your own. Style, preference and new suspected bugs outside the
   claims given are not part of this output: do not list them, not even as "related" notes.
   The scope is the findings the reviewer made and the docs the diff made wrong.

## Output

Before writing the table, read `references/verdict-table.md` for the worked example and the
scope check to run on the finished reply.

A table: finding, claim restated, verdict, evidence (path and quoted lines) or the test that
would settle it. Then a list of stale docs with both lines quoted.
