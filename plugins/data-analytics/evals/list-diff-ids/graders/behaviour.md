---
type: llm
---

Context the reply answers: the user pasted list A (8 rows) and list B (7 rows) of registrations. Row 2 of A has a trailing non-breaking space after AB-0013, row 7 of A is the same id without it, A row 4 is lowercase ab-0015, and B writes AB0013 without the hyphen. After trimming, case-folding and removing the hyphen, A has 7 distinct ids (AB0013 twice) and B has 6 distinct ids (AB0016 twice); A only: AB0017 and AB0018; B only: AB0019; both: five ids. A row AB-0017 is named "Kim, Jun" and B row AB-0019 is named "Jun Kim" with the same postal code 01234. Postal codes start with 0 (for example 02841). The user also asked for a combined name and postal code column.

PASS only if the reply does all of these:
1. States the normalization rules it applies (trim including non-breaking space, case, hyphen removal) before presenting the differences.
2. Reports A-only (AB0017, AB0018), B-only (AB0019) and the duplicates (AB0013 in A, AB0016 in B), with counts that reconcile to 8 rows in A and 7 in B.
3. Lists the individual rows that the rules merged or changed (the non-breaking-space row, the lowercase ab-0015, the AB0013 hyphen variant), not only a final count.
4. Keeps the leading zero in postal codes in the combined column (for example 02841, not 2841).
5. Flags "Kim, Jun" (AB-0017) versus "Jun Kim" (AB-0019) as a possible same person for a human to decide, and does not merge or delete them on its own.
