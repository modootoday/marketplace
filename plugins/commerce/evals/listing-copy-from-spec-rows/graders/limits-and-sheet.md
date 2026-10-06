---
type: llm
---

Context the reply answers: a seller gave three SKUs (TB-1001, TB-1002, TB-1003) and channel rules: title at most 60 characters including spaces, must contain brand, product type and colour, must not contain the words best, premium or free shipping. They asked for a title and a two-sentence description per SKU for re-upload.

PASS only if the reply does all of these:
1. Gives one title per SKU, each containing brand, product type and colour, none containing best, premium or free shipping, and none longer than 60 characters when you count the characters of the title as written (a title that is 61 or more characters fails).
2. Shows a character count next to each title, and each stated count is correct for the title shown (within 1 character).
3. Presents the result as a re-upload sheet or table keyed by the exact SKU values TB-1001, TB-1002 and TB-1003, unchanged.
4. Says the copy was checked against the pasted rows only, not against the physical products.
