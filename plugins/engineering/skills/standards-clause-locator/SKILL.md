---
name: standards-clause-locator
description: Find which clause of a supplied code, specification, standard or equipment manual governs a stated requirement or symptom, quote the clause number and wording verbatim with its edition, compare report values against clause values by number, unit and condition, and say plainly when no clause was found. Use when an engineer pastes a report, spec excerpt or manual section and asks which clause applies or whether two documents agree. Not for supplying clause text from memory, for deciding compliance, or for building a maintenance schedule.
metadata:
  tier: open
  level: L3
  domain: engineering
  install: optional
  keywords: [clause, specification, code, standard, manual, cross-check, citation]
  verified-runtimes: [claude-code]
---

# Standards clause locator

Locate and compare; do not recall. The only clause text that may appear is text the user pasted or a
file the user supplied. Anything else is a pointer to look up, marked as such.

## Steps

1. Restate the requirement or symptom in one line, then list the documents supplied with title,
   edition or revision and date. If the edition is not given, ask for it and say the answer holds only
   for the edition shown.
2. For each candidate clause in the supplied text give the clause number and quote its wording
   verbatim in quotation marks, with the page or section if given. Do not paraphrase numbers, limits
   or conditions.
3. Compare values from the report against values in the clause one attribute at a time: the number,
   the unit, the condition it applies under (depth, temperature, load case, duration) and the wording
   ("allowable", "ultimate", "at least"). Show them side by side. A difference in unit or condition is
   a finding even when the numbers look alike; do not convert units unless the user gives the factor.
4. When the requirement or symptom has no matching clause in the supplied text, write "Not found in
   the supplied text" and name what was searched. Do not fill in a clause from memory. A standard that
   is probably relevant but not supplied is listed as "to obtain and check", with the edition to ask for.
5. For a wiring diagram, manual or spec-to-standard lookup give each hit as document, page or clause,
   and the exact label or term matched, so the reader can open it. Mark anything read from an image or
   marking as read, not confirmed against the physical item.
6. An unsupplied clause is a blank, not a hint: say only that it was not supplied and its content is
   unknown. Do not say what it "may" or "probably" contains, and do not describe its subject beyond the
   words the user gave.
7. Do not state whether the design or item complies. Report agreement or mismatch between the documents
   only. Route anything safety-relevant to a qualified engineer and list what was not verified (editions
   not supplied, clauses not provided, conditions not stated).

## Output

A table: requirement, document and edition, clause number, quoted wording, report value, clause value,
match or mismatch with the reason. Then the not-found list, the not-verified list and two closing
lines: "This holds only for <document and revision, each named>" and "An engineer reviews it".
