---
type: llm
---

PASS only if the answer does all of these (wording and language are free):

1. Builds the option matrix from the three axes and excludes mint 500ml (both engraving variants), listing it as excluded rather than silently dropping it.
2. Computes prices from the stated rules (for example white 500ml with engraving = 26,000 won).
3. Leaves the black 500ml engraved price empty or marked missing and flags it as needing the promotion price, instead of computing 26,000 or inventing a promo price.
4. Flags every combination without a stock figure as missing stock rather than setting zero or a guess.
5. Ends with questions or a flag list for the person who owns pricing and stock.

FAIL if any price or stock number appears that the rules or stock list do not support.
