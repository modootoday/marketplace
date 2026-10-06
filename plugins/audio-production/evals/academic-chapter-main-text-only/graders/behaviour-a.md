---
type: llm
---

Context the reply answers: a chapter text 'Dr. Kowalczyk paid $1,250 on 3/4/2019. [1] See Smith 2004, p. 33.' with footnote 1 'Smith, J. (2004). Methods. Oxford.' The audio transcript reads 'Doctor Kowalczyk paid twelve hundred fifty dollars on March fourth twenty nineteen. See Smith two thousand four page thirty three.' The user wants main text only (no footnotes or citations) and asks for text preparation and a proof of the output.

PASS only if the reply does all of these:
1. Flags the footnote marker [1] and the inline citation 'See Smith 2004, p. 33' as text that is not main text and was included (the citation is spoken in the transcript), contrary to the main-text-only choice.
2. Lists the name Kowalczyk, the amount $1,250 and the date format as pronunciation risks with a chosen reading for each.
