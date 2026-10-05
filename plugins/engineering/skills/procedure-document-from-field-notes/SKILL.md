---
name: procedure-document-from-field-notes
description: Turn field steps, inspection notes, a technician report or a migration plan into a work instruction, process flow or cutover plan that keeps every step and branch as stated, gives each step an owner and prerequisites, marks gaps as questions and lists what the performer and safety owner must verify. Use when someone pastes rough operating steps and asks for a work instruction, procedure, flow or runbook draft. Not for inventing safety steps or values, for a live incident runbook (see operator-runbook) or for approving a procedure, which stays with the responsible engineer.
metadata:
  tier: open
  level: L3
  domain: engineering
  install: optional
  keywords: [work instruction, procedure, process flow, cutover, field notes, handover]
---

# Procedure document from field notes

A work instruction written from notes is only as good as the notes. The draft must add structure and
questions, never content. A qualified engineer or the equipment maker's manual governs the real
procedure; this draft is for them to review.

## Steps

1. Number every action in the notes in the order given, one action per line, quoting the source words.
   Keep every branch ("if clogged, swap the whole cartridge") as its own labelled path with its
   condition, and every hand-off ("then ops confirms") as a step with the receiving party.
2. Keep every value exactly as written, with its unit and the step it belongs to (a pressure, a time,
   a count). Do not round, convert or restate a value. Do not add torque, PPE, lockout, isolation,
   cure time or any other safety content the notes do not state. Do not name example measures (such as
   isolation or PPE) even as suggestions: write "the notes state no safety steps; the safety owner
   defines them". Questions ask what is missing; they never propose the answer.
3. Give each step these fields: owner (a name or role from the notes, else "owner: not stated"),
   prerequisites (only what the notes state, else "not stated"; write order as "follows step N", never
   as a prerequisite), the action, the expected check and
   its value, and rollback or stop condition. A field the notes do not support is written as an open
   question, never filled in.
4. Build the flow from the numbered steps: start, each step, each branch with its condition, the join
   point, end. For a migration or cutover add the order of dependencies and the point after which
   rollback is no longer possible, but only if the notes say where that is; otherwise ask.
5. When the source is a support case, a technician report with only "done" wording, a click
   recording or a lab SOP, convert each outcome into something observable (what was seen, measured or
   changed). A step an expert performs without writing it down shows up as a gap between two steps:
   list it as a question for that expert, not as a step.
6. When drawings or attachments are part of the document, list each with its sheet or page, order and
   orientation, and mark any that were not supplied.
7. Finish with two lists: Open questions (every missing field, in step order) and Needs review before
   use (items the performer and the safety owner must confirm, including that the draft states no
   safety step beyond the notes). State that the draft is not approved for use.

Before writing the steps table, read `references/layout.md` for the table layout and wording rules.

## Output

The numbered steps with their fields, the flow as a short text diagram, the two closing lists, and one
line saying a qualified engineer approves the procedure and the maker's manual governs.
