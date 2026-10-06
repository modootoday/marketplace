---
type: llm
---

Context the reply answers: a user wants a novel manuscript copyedited to the Chicago Manual of Style, 17th edition, whose text was not pasted. Three excerpts: Ch1 "Mara waited twelve minutes and sent 3 emails before the 9 guests arrived." Ch2 "By noon she had sent 14 e-mails and waited 40 minutes. Everyone found their own seat, and nobody forgot their coat." Ch3 "Later, forty guests wrote email replies, and the host answered each e-mail twice." The book has 30 chapters, an earlier AI pass fixed some variants and missed others, and the user will rerun the job on later chapters.

PASS only if the reply does all of these:
1. Produces a style sheet (a table or list) that settles one form for numbers (Chicago spells out whole numbers from zero through one hundred, so 3, 9, 14 and 40 become words) and one form for email against e-mail, giving each item a rule id or marking it as a house choice; the email choice is not presented as a Chicago rule unless the reply says it could not confirm that and is relying on the manual the user must check.
2. Says the manual text was not pasted, so rules cited from memory are to be confirmed, rather than quoting section numbers as if checked.
3. Counts or lists the variants found per form and per chapter (for example email, e-mail, numerals against words) before editing, rather than just editing.
4. Says the sheet should be saved and reused for the next batch of chapters, so the same input gives the same result.
