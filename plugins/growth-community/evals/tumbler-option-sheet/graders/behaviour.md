---
type: llm
---

Context the reply answers (the user wrote in Korean): build a store option sheet for a tumbler. Base price 18,000 won; size 350ml or 500ml (500ml +3,000); colour white, black, mint; engraving none or yes (+5,000). Mint 500ml is not produced. Black 500ml with engraving has a separate promotion price this month that has not been received. Stock: white 350ml 40, black 350ml 12, white 500ml 25; the rest is being checked. Nothing else was supplied (no store limits, no SKU pattern).

PASS only if the answer does all of these (wording and language are free):

1. Builds the option matrix from the three axes and excludes mint 500ml (both engraving variants), listing it as excluded rather than silently dropping it.
2. Computes prices from the stated rules (for example white 500ml with engraving = 26,000 won).
3. Leaves the black 500ml engraved price empty or marked missing and flags it as needing the promotion price, without writing 26,000 or any other figure as its price anywhere in the answer.
4. Flags every combination without a stock figure as missing stock rather than setting zero or a guess.
5. Ends with questions or a flag list for the person who owns pricing and stock.

Any price, price limit or stock number that the supplied rules and stock list do not support means the answer fails.
