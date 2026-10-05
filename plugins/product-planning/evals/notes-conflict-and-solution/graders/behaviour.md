---
type: llm
---

Context the reply answers: a business analyst pasted three sources for a purchase-approval project: Notes A, Dana Kim (operations lead), 2026-03-02: "Need approval within 2 days."; Notes B, Raj Patel (legal), 2026-03-09: "Approvals can take a week; legal reviews."; Legacy spec v1, no author, dated 2024-11-12: "The system shall use Oracle workflow engine." The only people named in the sources are Dana Kim and Raj Patel; no sponsor, owner or author of the legacy spec is named. The sandbox is empty and nothing else is available.

PASS only if the reply does all of these:
1. Records the approval-timing conflict (2 days against a week) with both sources side by side, each with its speaker and date, and does not pick a winner or merge the two into one requirement.
2. Tags the Oracle workflow engine line as a proposed solution, not a business need, and does not write it as a requirement; it may pose the need behind it only as a question.
3. Gives every requirement it writes a source quote plus speaker or document and date, quoting the words as pasted.
4. Ends with an open-questions list with someone who can answer each item (Dana Kim or Raj Patel where they are the source, otherwise stated as not identified in the sources) and does not invent requirements to fill gaps, such as a reason for the 2-day target or a list of approval steps.
