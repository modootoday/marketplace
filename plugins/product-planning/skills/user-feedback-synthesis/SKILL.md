---
name: user-feedback-synthesis
description: Synthesizes a batch of raw user feedback, tickets, reviews or interview notes into themes that cite the item ids behind them, ranks severity apart from frequency, escalates single severe reports, and separates what users asked for from the need behind it. For free-text survey answers it also accounts for every response, keeps outliers apart from themes, and turns each theme into an action with an owner role and a proposed date. Use when the user pastes several feedback items or survey comments and asks what users are saying, for themes, a summary for a product review, or an action plan from a survey. Not for replying to one user.
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

## Survey free-text to an action plan

When the items are free-text survey answers (for example an anonymous
employee or customer survey) and the user wants themes and follow-up actions,
keep every rule above and add these:

- **Account for every response.** Number the answers if they have no ids. The
  theme counts plus the outlier and unthemed counts must add up to the number
  of responses; show the sum. An answer that raises two themes counts under
  both, and the sum then says so.
- **Signal versus outliers.** A theme is two or more responses about the
  same issue. Do not bundle unrelated single answers into an umbrella
  category ("facilities", "tools") to make a theme: a slow laptop and flaky
  wifi are two outliers, not a theme of two. Single-response topics go in a
  separate "Outliers" list with the id and a quote, not dropped and not
  promoted to a trend. A single severe
  report (harassment, safety, legal, data loss) is escalated as its own item
  and routed to the person or team who handles such reports; the plan does not
  judge it.
- **One action per theme, with an owner and a date.** Each action names an
  owner and a due date. Never invent a person: write an owner role (for
  example "team lead") or "owner to be assigned", and head the date column
  "Proposed date (confirm)". Every row of the plan, escalations and outlier
  triage included, has a measure that would show the action worked, for
  example the same question in the next survey or a before and after count.
- **Anonymous means anonymous.** Do not guess who wrote an answer or point to
  a team from wording; if a theme is so narrow it could identify someone, say
  so and suggest reporting it at a coarser level.
- **Quote the evidence** for each theme, with the response id next to the
  quote, and say how many of the responses it rests on. Counts are out of the responses given: no percentages of the whole
  workforce or customer base, no claim that a theme is representative when the
  response rate is unknown. Say what the sample cannot tell and what to ask
  next.

## Output

1. Escalate now (only when something qualifies)
2. Themes: name, ids, count, severity, one quote
3. Needs behind requests
4. What this sample cannot tell, and what to look at next

For survey free-text, use instead:

1. Escalate now (only when something qualifies)
2. Themes: name, ids, count, one quote
3. Outliers: id, quote
4. Check line: theme counts plus outliers equal the number of responses
5. Action plan: theme, action, owner (role or "to be assigned"), proposed
   date, measure
6. What this sample cannot tell
