---
type: llm
---

PASS only if all three hold:
1. It states one governing message for the deck (what investors should conclude and the ask).
2. Slide titles are full-sentence claims using the given facts (for example the 18% fewer no-shows
   or 2% churn), not topic labels like "Market" or "Team".
3. It lists evidence the outline needs that was not given (for example market size or the team's
   background) as missing, instead of inventing numbers.

Figures computed from the given facts (monthly revenue, retention implied by churn) are fine,
and placeholders such as [N] are fine. FAIL if any of the three is missing, or if a market size,
competitor figure or team fact that was not given is stated as true.
