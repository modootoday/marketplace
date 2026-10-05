---
name: list-normalize-and-diff
description: Compare two lists or clean identifier, name and address columns before a hand-off - state the normalization first, report differences in both directions with counts that reconcile, list every merged or dropped key, and keep postal codes and leading zeros. Use when asked what is in one list but not the other, to combine address columns, or to clean registration, asset or test identifiers before an upload. Not for fuzzy record linkage at scale or database deduplication in SQL.
metadata:
  tier: open
  level: L3
  domain: data-analytics
  install: optional
  keywords: [list comparison, set difference, normalization, deduplication, identifiers, address columns]
---

# Normalize, then diff

Hidden spaces, case, symbols and formatting differences make two lists look unequal.
Cleaning them silently makes keys disappear. Do the cleaning in the open.

## Steps

1. State the normalization rules before comparing, as a short numbered list: trim, case,
   hidden characters (non-breaking space, zero-width), full-width to half-width,
   punctuation and separators. Apply only the rules you listed.
2. Normalize into a new column and keep the original value beside it. Never overwrite.
3. Diff on the normalized key: A not in B, B not in A, and in both. Report duplicates
   within each list with counts.
4. Reconcile the counts: rows in A = only A + both + duplicate extras, likewise for B.
   If the arithmetic does not close, say so and find the gap before reporting.
5. List every row that was merged, dropped or changed by a rule, with the original and the
   normalized value. A final count alone is not enough.
6. Preserve postal codes, phone numbers and identifiers with leading zeros as text. When
   combining address columns, say how a missing part is handled and check no postal code
   was lost.

## Data errors versus rule questions

Separate what is clearly the same record (trailing space, case) from what needs an owner's
decision: a name in a different order, a different separator that could be a different key,
a type or status the system rules may not allow. Never auto-merge the second group; list
them as pairs for a human to decide.

## Output

Rules used, the count table, the difference lists, the changed-row list, and the open
questions for the data owner.
