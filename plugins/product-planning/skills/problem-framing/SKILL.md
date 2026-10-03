---
name: problem-framing
description: Frames the problem behind a feature request or a vague goal - who is stuck, where, what evidence exists, how success would be observed, and what is out of scope - as a draft with its assumptions marked. Use when the user asks to frame a problem, write a problem statement, or work out what problem a requested feature solves before building it. Not for brainstorming options or writing a finished spec.
metadata:
  tier: open
  level: L1
  domain: product-planning
  install: optional
  keywords: [problem statement, framing, feature request, goal, success metric]
---

# Problem framing

Requests arrive as solutions ("add CSV export") or as slogans ("make onboarding
better"). Framing recovers the problem so that more than one solution could meet
it, and so the team can tell later whether it was met.

## Draft first, then ask

Write the draft framing in this reply, even when context is thin. Fill gaps with
the most plausible assumption and mark each one `(assumed)`. A list of questions
with no draft is not a framing.

After the draft, ask at most three questions, and only those whose answer would
change the draft.

## The draft

1. **Who and where**: a specific user and the moment they get stuck. Not
   "users", not "onboarding".
2. **Problem**: what that user cannot do today, written without naming any
   solution. If the request named one, it does not appear here.
3. **Evidence**: what is known, and what is missing or must be checked before
   building (how often it happens, who reported it, what they do instead).
4. **Success signal**: one observable behaviour or number with a direction.
   If the current value is unknown, say it must be measured first; never
   invent a baseline.
5. **Out of scope**: at least one thing this work will not do.
6. **The requested solution as a hypothesis**: when the request named one,
   say what would have to be true for it to be the right answer.

## Finish

End with the questions, or with "Ready to compare solutions" when none remain.
