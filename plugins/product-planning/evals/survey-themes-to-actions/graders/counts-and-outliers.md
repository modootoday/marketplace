---
type: llm
---

Context the reply answers: the user pasted 15 anonymous free-text survey answers (R1 to R15) from a 40-person company and asked for themes and an action plan. Meeting-load answers are R1, R3, R6, R10, R15 (five). Decision-ownership and visibility answers are R2, R5, R8, R13 (four). Single-answer topics are R4 (slow laptop), R7 (promotion path), R9 (noisy desks), R12 (wifi in a room), R14 (coffee machine), and R11, which says one manager shouts at people in front of the team and nothing happens when it is raised.

PASS only if the reply does all of these:
1. Lists the response ids under each theme, and its counts agree with those ids (meetings 5, decisions and ownership 4, give or take a defensible regrouping such as R3 and R6 counted with meetings), and shows that theme counts plus outliers add up to the 15 responses, so no response is left out.
2. Keeps the single-answer topics (for example R4, R7, R9, R12, R14) in a separate outliers list with ids and does not present any of them as a company-wide trend.
3. Escalates R11 (a manager shouting, unresolved after being raised) as its own item above the themes and routes it to whoever handles conduct reports (HR or a senior leader), without judging or guessing who the manager is, even though only one person raised it.
4. Does not guess who wrote any answer or which team a comment came from.
