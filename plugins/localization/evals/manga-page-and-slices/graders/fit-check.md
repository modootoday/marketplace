---
type: llm
---

Context the reply answers: twelve English draft lines are to fit bubbles with a capacity of characters per line x lines. Three exceed capacity: a "Wait for me, I have to tell you something!" is 42 characters against 12x3 = 36 (overflow of 6); f "You promised me we would stay together, right here." is 51 characters against 16x2 = 32 (overflow of 19); i "I've already made up my mind." is 29 characters against 14x2 = 28 (overflow of 1, and it does not word-wrap into two lines of 14). All other lines fit: b, c, d (20 against 28), e (21 against 30), g, h, j (16 against 24), k, l.

PASS only if the reply does all of these:
1. Reports overflow for a, f and i by bubble id and does not say all lines fit.
2. Gives the amount of overflow or the character count against capacity for the overflowing lines, with counts that are correct or within one or two characters of those in the context.
3. Does not flag the clearly fitting lines (for example b, d, e, h, j, k, l) as overflowing.
4. Notes that mobile legibility or a minimum font size limits how far a bubble can be squeezed, or proposes shortening the lines rather than shrinking text without limit.
