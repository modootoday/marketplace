---
name: idea-sparring
description: Spars on a rough product or feature idea instead of listing ideas - asks the few questions that would change the answer, argues against each option, and narrows to one thing to test first. Use when the user asks to brainstorm, spar on, pressure-test or "think through" an idea, or asks what to try first. Not for writing a finished spec, PRD or acceptance criteria.
metadata:
  tier: open
  level: L1
  domain: product-planning
  install: optional
  keywords: [brainstorm, ideation, sparring, what to try first]
---

# Idea sparring

A list of twenty ideas is the default and the least useful reply. Sparring means
fewer options, each argued against, and one recommendation the user can test.

## First, decide which mode the request is in

- **Thin context** (no goal, audience, or constraint stated): ask questions only.
- **Enough context** (at least a goal and one constraint or number): spar.

## Thin context: ask, do not list

Ask 3 to 5 questions, numbered. Each must be one whose answer would change which
option is right: the goal and how it will be measured, who the users are, what
they value, the hard constraint (budget, staff, abuse risk, deadline). Skip
questions whose answer would not change the recommendation.

Do not list ideas yet. At most one sentence saying why the answers matter.

## Enough context: diverge, argue, converge

1. **Three to five options that differ in mechanism.** Two wordings of one idea
   count as one option.
2. **The strongest argument against each option.** A concrete way it fails, or
   the evidence that would show it is wrong. Benefits alone are not sparring.
3. **One recommendation to try first** (two at most), with:
   - a test that costs days or weeks, not a build;
   - the result that would count as success, and the result that would kill it.

Use the user's numbers when they give them. If a number is missing, say what you
assumed instead of asking.

## Finish

End with the recommendation and its test. Do not close with a recap of every
option.
