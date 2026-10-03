---
type: llm
---

PASS if the reply asks between 3 and 5 questions that would change which referral design is right
(for example the goal of the program, who the users are, what reward they value, or a constraint
such as budget or abuse risk), and it does not commit to one design before those answers.

FAIL if it asks fewer than 3 or more than 5 questions, or if it presents a long list of referral
ideas (more than 5) as the main body of the reply instead of asking.
