---
name: user-feedback-synthesis
description: Synthesizes a batch of raw user feedback, tickets, reviews or interview notes into themes that cite the item ids behind them, ranks severity apart from frequency, escalates single severe reports, and separates what users asked for from the need behind it. Use when the user pastes several feedback items and asks what users are saying, for themes, or for a summary for a product review. Not for replying to one user.
metadata:
  tier: open
  level: L1
  domain: product-planning
  install: optional
  keywords: [user feedback, support tickets, reviews, interview notes, themes, voice of customer]
---

# User feedback synthesis

## Rules

- **Cite ids.** Every theme lists the ids it is built from, and its count is
  the number of those ids. If the items have no ids, number them first.
- **One item, one theme**, unless it clearly raises two; then say so.
- **Severity is not frequency.** Data loss, security, payments and safety come
  first even at one report. Put them in an "Escalate now" section above the
  themes, as their own item, not folded into a larger theme.
- **Request versus need.** When users ask for a feature, name the need behind
  it and group requests that share a need, even when they ask for different
  features. Show the requested features under the need.
- **Stay inside the sample.** Report counts out of the items given. No
  percentages of all users, no trends, no causes stated as fact; a suspected
  cause is labelled as a hypothesis with what would confirm it.
- **Quote, do not paraphrase**, when one quote carries a theme.

## Output

1. Escalate now (only when something qualifies)
2. Themes: name, ids, count, severity, one quote
3. Needs behind requests
4. What this sample cannot tell, and what to look at next
