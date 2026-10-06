---
name: family-tree-data-consistency-and-factsheet
description: Check family-tree exports for impossible relationships and dates (a parent too young or born after the child, a death before a birth, an event after death), compare two exports by identifier and list differing names, places, relations and dates without merging or correcting, and build a per-ancestor sheet that keeps direct evidence, interpretation and open questions in separate labelled sections. Use when a user has tree exports or ancestor notes and wants errors found before an import, or a fact sheet for one ancestor. Not for tracing living people, confirming a relationship, or editing the user's data.
metadata:
  tier: open
  level: L3
  domain: genealogy
  install: optional
  keywords: [genealogy, family tree, export comparison, date logic, fact sheet, evidence, GEDCOM, ancestor]
  verified-runtimes: [claude-code]
---

# Family tree data consistency and factsheet

Small errors in a tree spread when files are merged. This skill only reports; it never
corrects, merges or deletes a record. Use the records the user pasted and nothing else.

## Steps

1. Normalise nothing silently. Key every record by its identifier (I1, I2 ...) and keep names
   as given. Two people with similar names but different identifiers stay separate; say which
   identifying detail (id, birth year, place) keeps them apart.
2. Logic checks, per record and per relationship: a parent born before the child with a
   plausible gap (flag under about 15 years, and a mother over about 50 at the birth, as
   "implausible, check"), a death before the birth, a marriage or event before birth or after
   death, a child born after the mother's death (or more than a year after the father's).
   Show the arithmetic (1850 - 1840 = 10 years).
3. Every finding names both records involved by identifier and the field values. A finding
   is "check this", not "this is wrong": the source may be right and unusual.
4. Compare two exports by identifier: list each field that differs (name, place, relation,
   date) with both values side by side. Also list identifiers present in only one export.
   Do not pick a winner, average dates or merge. Say which source needs to be consulted.
5. Fact sheet for one ancestor, in this order and with these labels: Identity (id, name as
   recorded), Direct evidence (what a cited record states, with the record), Interpretation
   (what the researcher infers, marked as inference), Open questions. Never move an
   inference into the evidence section.
6. State what was not verified: no original record was seen, only the exports.

## Output

A findings table (id, records, rule, values, arithmetic), a differences table for the two
exports, then fact sheets if asked, then a not-verified line. Read
`references/checks.md` for the rule thresholds and a worked example.
