---
name: legal-time-entry-client-rules
description: Convert a day's work notes into draft billing time entries that follow the client billing guidelines the user pastes (no block billing, minimum increments, banned words, required wording), keeping the stated total, citing which rule drives each change and listing the entries the guidelines would reject. Use when someone pastes work notes with hours plus the client's billing rules and wants entries ready for review. Not for legal advice, deciding what is billable, fee disputes, or reviewing OCR or transcript text.
metadata:
  tier: open
  level: L3
  domain: legal-ops
  install: optional
  keywords: [time entry, billing guidelines, block billing, billing rules, timekeeping, invoice narrative]
  verified-runtimes: [claude-code]
---

# Legal time entries under client billing rules

The notes say what was done and for how long. The client rules say how an entry may be written.
This skill rewrites form only. It never changes what was done or how long it took, and it leaves
the billing decision to the timekeeper and the responsible attorney.

## Steps

1. List the rules exactly as pasted, numbered R1, R2 and so on. Use only these. Do not add rules
   from general practice; if a common rule (task codes, a cap, a rounding direction) was not
   pasted, say it was not given and ask for it.
2. Split the notes into tasks. One entry has one task, one duration and one description. A line
   joining several tasks under one time is block billing and is split.
3. Durations. Never add a task that is not in the notes, and never change a stated duration. The
   entries for a line must sum to the line's stated hours. If the notes give no per-task time, the
   split is an estimate: show the proposed split, label it "estimate, confirm against your
   records", and keep every part a multiple of the minimum increment. Prefer an even split only
   when nothing in the notes says otherwise, and say that is what you did.
4. Descriptions. Write each as a short action phrase (verb, object, purpose only if the notes
   give it). Remove banned words and phrases by rewording, not by dropping the task. Do not add
   matter names, people, document titles or outcomes the notes do not state; use a bracketed
   placeholder such as `[document name]` when the rule asks for specifics the notes lack.
5. Cite the rule behind every change in a column: for example "split, R1" or "reworded, R3". An
   entry that needed no change says "none".
6. Check the arithmetic and show it: each line total, the grand total against the notes, and every
   duration against the increment.
7. Reject list. Name every original line or entry the guidelines would reject as written (block
   billed, wrong increment, banned wording, missing required element) and the rule it breaks, so
   the timekeeper sees what would have been bounced.
8. State what you did not check: whether the work is billable, rates, caps, task codes not pasted,
   and the accuracy of the times, which only the timekeeper knows.

## Output

A table of entries (date if given, task, hours, description, rule cited), a totals line, the reject
list, then the open items for the timekeeper. No legal advice and no view on whether the
client will pay.
