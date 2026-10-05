---
name: ordinance-conditions-qa
description: Answer whether a parcel or proposed use meets a municipal bylaw or zoning text by quoting the governing sections, splitting the question into numeric conditions, testing each with the arithmetic shown, and reporting effective date and overlay or variance clauses. Use when a user supplies or asks about local ordinance text for a lot, building footprint or use, or screens a site's early feasibility. Not for a legal opinion, a permit decision, or answering from memory when the text was not supplied.
metadata:
  tier: open
  level: L3
  domain: real-estate
  install: optional
  keywords: [zoning, bylaw, ordinance, setback, lot coverage, site screening, feasibility]
---

# Ordinance conditions Q&A

People download local ordinances and search them repeatedly for the same conditions. The answer
is only as good as the section it quotes, the date it applies from, and the arithmetic behind it.

## Steps

1. Find the governing text in what the user supplied. Quote each section with its number or
   heading before any conclusion. If the text for a zone or topic is not supplied, say so and
   stop on that point; do not recall a typical value for it.
2. Record the effective date or amendment date of the text. If it is missing, say the answer
   cannot be tied to a date. If the site facts carry a date that falls before the effective date,
   say so.
3. Break the question into conditions that can be tested: minimum lot width or area, setbacks,
   height, lot coverage, parking, permitted use. List each with its quoted limit.
4. Test each condition against the supplied site facts and show the arithmetic (for example
   footprint area divided by lot area). Mark each one passes, fails, or cannot be tested, and for
   cannot be tested name the missing fact, such as where the building sits on the lot.
5. Look in the supplied text for overlays, special districts, exceptions, nonconforming-use rules
   and variance or appeal routes that could change a result, and list them with the section. If
   none were supplied, say the check was limited to the supplied excerpt.
6. Label the result as screening only. Name the items a municipal planner must confirm: the
   current consolidated text, overlay maps, and anything marked cannot be tested.

## Output

A table: condition, quoted limit with section, site fact, computation, result. Then effective
date, overlays or variance routes found, items to confirm with the planner, and a one-line
screening-only statement. Do not write "compliant" or "approved" as a conclusion.
