---
name: financial-document-intake-tieout
description: Turn pasted bank statement text or a pile of uploaded client documents into structured rows and a file inventory with a tie-out - keep the original text, check opening plus the sum of rows against closing per statement, classify each file by type, period and entity with the header text as evidence, and mark unreadable digits instead of guessing. Use when a bookkeeper or tax preparer receives statements or scans with meaningless names and needs rows and a rename plan. Not for categorizing transactions into accounts, tax advice or filing, or a month-end rollforward.
metadata:
  tier: open
  level: L3
  domain: finance-ops
  install: optional
  keywords: [bank statement, tie-out, document intake, file naming, bookkeeping, extraction]
---

# Financial document intake and tie-out

Statement text and scanned documents arrive as a blob and names like IMG_2231.pdf. Rows
copied by eye drift from the statement, and a file named by guess lands in the wrong folder.
Extract, prove the arithmetic, and name only what the document itself shows. This skill
checks supplied figures; it gives no tax, accounting or filing advice.

## Steps

1. Extract every row into a table: date, description, debit, credit, balance, plus the
   original text of the row exactly as supplied. The rows table holds transactions only:
   show opening and closing balances on their own lines above and below it, never as rows.
   Keep signs as written; if a statement
   shows one signed column, say how you split it into debit and credit.
2. Tie out per statement: opening + sum of credits - sum of debits = closing. Show the
   arithmetic with every term, state matched or the difference, and if the statement lists
   running balances, check each row's balance too. A difference is reported, never
   absorbed into a row.
3. Never guess missing or smudged digits. Mark such a row low confidence with the exact
   unreadable part and say the tie-out is blocked until it is confirmed.
4. File inventory: one row per file with proposed name, document type, period, entity, the
   evidence (the header or form text that shows it) and confidence. Name from evidence
   only. A file whose content was not supplied, or whose header does not say, is
   unclassified; do not infer from the old file name.
5. Flag what stays open: unreadable rows, files without evidence, a period gap between
   statements, a closing that does not equal the next opening.
6. State what you did not verify (originals, other pages, other accounts). The preparer
   decides the treatment of each item.

## Output

The rows table, the tie-out arithmetic, the file inventory table with evidence, then the
open list and the not-verified list.
