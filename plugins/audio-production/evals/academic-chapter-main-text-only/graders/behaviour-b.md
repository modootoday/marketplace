---
type: llm
---

Context the reply answers: a chapter text 'Dr. Kowalczyk paid $1,250 on 3/4/2019. [1] See Smith 2004, p. 33.' with footnote 1 'Smith, J. (2004). Methods. Oxford.' The audio transcript reads 'Doctor Kowalczyk paid twelve hundred fifty dollars on March fourth twenty nineteen. See Smith two thousand four page thirty three.' The user wants main text only (no footnotes or citations) and asks for text preparation and a proof of the output.

PASS only if the reply does all of these:
3. Raises the date ambiguity 3/4/2019 (March 4 or April 3) as a question, noting the transcript chose March fourth without confirmation.
4. Lists the transcript differences by span (for example Dr. to Doctor, the amount, the date, the citation) rather than a general statement.
5. Includes a chapter order check (and split-file sequence) and says the audio itself was not heard.
