---
name: prioritization-scoring
description: Ranks a backlog with an explicit scoring method (RICE unless the user names another), showing each item's arithmetic, labelling every estimated input, flagging ranks too close to trust, and naming the one assumption that would change the top pick. Use when the user asks to prioritize, rank or score a list of features, bets or backlog items. Not for explaining a framework or generating new ideas.
metadata:
  tier: open
  level: L1
  domain: product-planning
  install: optional
  keywords: [prioritization, RICE, backlog, ranking, roadmap, scoring]
---

# Prioritization scoring

## Rank, even with missing inputs

Do not refuse to rank for lack of data. Estimate each missing input, mark it
`(assumed)` with a one-line reason, and rank. The label applies to every number
the user did not give, including totals, sprint length and team capacity. The labels let the user correct
the inputs, and a ranking they can correct beats a list of questions.

## Method

- Use the user's method when they name one. Otherwise RICE:
  reach x impact x confidence / effort, units stated once.
- Show one line of arithmetic per item, so any score can be checked.
- Sort by score, highest first.

## Say where the ranking is fragile

- **Close ranks.** When two adjacent scores differ by less than their inputs'
  uncertainty (a 50% confidence input is uncertain), say they are too close to
  separate. Name the input that would flip them and the value at which it flips.
- **Swing assumption.** Name the single assumption that would most change the
  top pick if it were wrong, and the quickest way to check it (one customer
  call, one query, one log count).
- **Hard gates.** A contract that depends on an item, or a legal or security
  deadline, overrides the score; say so rather than scoring around it.

## Finish

End with the ranking, the close pairs, and the swing assumption to check first.
