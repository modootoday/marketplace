---
type: llm
---

Context the reply answers: a user wants a novel manuscript copyedited to the Chicago Manual of Style, 17th edition. Three excerpts: Ch1 "Mara waited twelve minutes and sent 3 emails before the 9 guests arrived." Ch2 "By noon she had sent 14 e-mails and waited 40 minutes. Everyone found their own seat, and nobody forgot their coat." Ch3 "Later, forty guests wrote email replies, and the host answered each e-mail twice." The user asked for the style sheet, the edited text and the change log.

PASS only if the reply does all of these:
1. The edited text spells out 3, 9, 14 and 40 as words and uses one form of email or e-mail in every occurrence across all three chapters, with no instance of the other form left.
2. The change log lists each change with its chapter, the text before, the text after and the rule id or house-choice label from the style sheet.
3. Leaves "their" in "Everyone found their own seat" and "nobody forgot their coat" unchanged, or raises it only as a query to the author without changing it.
4. Does not change anything that is not on the style sheet (no rewording, no added commas or cuts), and says the edited text was re-scanned or how to re-scan it to confirm no variant remains.
