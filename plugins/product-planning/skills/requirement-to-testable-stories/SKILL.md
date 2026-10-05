---
name: requirement-to-testable-stories
description: Break a feature request or technical brief into user stories whose acceptance criteria are checkable Given/When/Then statements, with vague words such as quickly, secure or easy flagged as unmeasurable and turned into a question for a value, dependencies and build order between stories, assumptions listed, and feasibility risks to verify with engineering. Use when someone pastes a brief, request or one-line requirement and asks for stories, tickets, acceptance criteria or a breakdown into work items. Not for a full Korean PRD (prd-writing-ko), for tracing stakeholder notes to sources (stakeholder-notes-to-requirements-trace), or for ranking the stories.
metadata:
  tier: open
  level: L2
  domain: product-planning
  install: optional
  keywords: [user stories, acceptance criteria, Given When Then, requirements, tickets, dependencies, testable, business analysis]
---

# Requirement to testable stories

A story whose criteria cannot fail is not a story yet. The usual damage:
"fast" and "secure" become criteria nobody can test, a dependency between
tickets is only discovered in the sprint, and assumptions are written as if
the user had said them.

## Rules

- **Flag before you split.** Read the brief for words with no measure
  (quickly, secure, easy, flexible, large, modern, "like the other report").
  For each, quote the phrase, say why it cannot be tested, and ask for the
  value (a time and a data size, a named standard or control, a format list).
  Where a placeholder is needed to keep going, write it as `[value to confirm]`
  in the criterion, and never choose a number as if it were given. The same
  holds for formats, controls and standards the brief did not name (a file
  type, HTTPS only, encryption, an error code, a role): in a criterion each
  one is either `[value to confirm]` or marked "(proposed, confirm)". If a
  criterion would only make sense with a value the brief lacks, keep the
  placeholder in it rather than filling it.
- **One story, one actor, one goal.** "As a <role>, I want <capability>, so
  that <outcome>." The actor must be a role the brief names or implies; if
  it is implied, mark that as an assumption.
- **Criteria are Given/When/Then.** Each is one precondition, one action, one
  observable result. Cover the normal path, at least one failure or empty
  case, and the limits the brief mentions. A criterion that needs judgement
  ("looks good") is not a criterion; rewrite it or flag it.
- **Dependencies and order.** Give each story an id, list what it needs
  first, and give a build order. Say when two stories can run in parallel. If
  the dependencies form a loop, report it instead of ordering.
- **Assumptions are labelled** and each ends in a question for the requester.
  Do not turn an assumption into a criterion without marking it.
- **Feasibility risks** are things to verify with engineering (volume, an
  external system, a security review, a missing data source), stated as
  questions. Do not claim something is easy or hard on your own.
- **Stay inside the brief.** No new features. A useful idea outside the brief
  goes under "Out of scope, to ask".

## Output

1. Unmeasurable statements: quote, why, the question to ask
2. Stories: id, role, goal, outcome, Given/When/Then criteria
3. Dependencies and build order
4. Assumptions, as their own section, each ending in a question for the
   requester (for example the roles you assumed)
5. Feasibility risks to verify with engineering
