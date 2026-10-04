---
name: prd-writing-ko
description: Write a product requirements document in Korean - problem, goal and metric, users, scope and non-goals, requirements with testable acceptance criteria, screen copy and open questions - with every assumption marked. Use when the user asks for a PRD, a planning document or a requirements specification in Korean, or for acceptance criteria written in Korean. Not for brainstorming options or framing a problem that is still unclear.
metadata:
  tier: open
  level: L2
  domain: product-planning
  install: optional
  keywords: [PRD, product requirements, acceptance criteria, Korean spec]
  locales: [ko]
---

# Korean PRD

A PRD is the document an engineer, a designer and a reviewer all build from. It
fails when each of them can read a different product into it. The structure
below exists to remove that room. A complete Korean example is in
`references/prd-template.ko.md`.

## Write in Korean, in the register of a document

Body text uses the plain written form (-da endings). Screen copy quoted in the
PRD is the exception: it is what the user will read, so it follows the product's
UI register (polite -yo form for Toss-style products) and is marked as copy.

## Sections, in order

1. **Problem** - who is stuck, where, and the evidence. No solution named here.
2. **Goal and success metric** - one metric with a direction and a time window.
   If the current value is unknown, say it must be measured first; never invent
   a baseline.
3. **Users and situations** - the specific user types this release serves.
4. **Scope and non-goals** - what this release does, and at least two things it
   deliberately does not do.
5. **Requirements** - numbered. Each requirement has acceptance criteria in a
   form a tester can check without asking: given a state, when an action, then
   an observable result, with numbers where there are limits.
6. **Screen copy** - the strings the requirements need, in the UI register. A
   button names the action that happens, as a verb phrase (the reference shows
   the form), never a bare noun or a generic confirm. An error says what to do
   next. A notification informs; it does not push with scarcity or urgency. The
   ux-writing-toss skill holds the full rules when it is installed.
7. **Open questions** - each with who decides and by when.
8. **Assumptions** - every fact the user did not give, marked as assumed.

## Rules that keep it honest

- **Mark assumptions inline** as well as in section 8, so a reader of one
  requirement sees what it rests on.
- **No unmeasurable criteria.** "Fast", "easy" and "intuitive" become a number or
  an observable behaviour, or move to open questions.
- **Edge cases are requirements.** Empty input, failure of an external service,
  permission refused, duplicate submission: write what happens.
- **Draft first.** When context is thin, write the full draft with assumptions
  marked, then ask at most three questions whose answers would change it.
