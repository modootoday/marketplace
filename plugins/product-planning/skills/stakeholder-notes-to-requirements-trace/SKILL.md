---
name: stakeholder-notes-to-requirements-trace
description: Consolidate scattered stakeholder notes, meeting transcripts and legacy solution-centric documents into business requirements that each carry a source quote, speaker or document and date, with business needs separated from proposed solutions, conflicts and duplicates across sources recorded, and gaps left as open questions instead of filled. Use when someone pastes meeting notes, transcripts or an old spec and asks for requirements, a requirements list, a process extraction or a traceable summary of what stakeholders said. Not for writing a PRD, interviewing customers, or prioritizing a backlog.
metadata:
  tier: open
  level: L2
  domain: product-planning
  install: optional
  keywords: [business analysis, requirements, traceability, stakeholder notes, transcript, legacy documents, open questions]
---

# Stakeholder notes to requirements, with a trace

Notes, transcripts and legacy specs mix needs, wishes and solutions, and a tidy requirements
list hides which stakeholder said what. The value is the trace: anyone can follow each
requirement back to words someone actually said, and see where the sources disagree.

## Steps

1. **Inventory the sources.** List each note, transcript or document with its speaker or author
   and date. Give each a short id (N1, N2, D1). If a date or speaker is missing, write
   "unknown"; do not guess.
2. **Extract statements, then classify.** For each statement pull the exact quote and classify
   it: business need (what must be achieved and why), constraint (policy, law, budget, time),
   or proposed solution (a named product, technology, screen or implementation). A
   solution-ish line is recorded and tagged as a solution. Turn the underlying need into a
   question only ("what need does using X serve?") with no examples of possible answers,
   never as a requirement.
3. **Write requirements.** Each requirement is one testable sentence about the business need,
   with its source rows: quote, speaker or document, date. Stay inside the quote: do not add
   scope, steps or causes the speaker did not state (a note about how long approval takes is
   not a requirement that a review step exists). A requirement with no quote is not written.
   Never merge two stakeholders' wording into one quote.
4. **Find conflicts and duplicates.** Compare across sources, including the same topic in
   different words (for example "sign-off" and "approval"). List conflicts with both sources
   side by side and do not pick a winner; list duplicates once with all their sources.
5. **From a transcript, process steps.** When asked for a process, list actors, activities,
   branches and exceptions in order, marking each step as stated or inferred, and what the
   attendees still have to confirm.
6. **From a legacy document or code.** Tag each implementation statement "proposed solution"
   in those words, and ask the business owner what purpose or constraint it serves. State no
   purpose yourself, not even as an assumption, unless the document states it.
7. **Open questions.** Everything missing, unclear or in conflict becomes a question with an
   owner (who can answer it): a stakeholder or author named in the sources where there is one,
   otherwise "owner not identified in the sources", never a role you made up. Do not fill gaps
   with plausible requirements, and do not list guessed answers to the questions.

## Output

1. Sources table (id, speaker or document, date).
2. Requirements table: id, requirement, source quote, speaker or document by name, date.
3. Solution-tagged statements, each with the need it might serve as a question only.
4. Conflicts and duplicates, sources side by side.
5. Open questions with owners, as the last section; add nothing after it.
