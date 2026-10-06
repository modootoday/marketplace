---
name: pricing-hypothesis
description: Turn a pricing idea into a testable hypothesis - who pays, for what unit of value, at what price and against which alternative, what result would change the decision, and the cheapest test - before anyone builds a pricing page. Use when the user proposes a price, a plan structure, a discount or a free tier, or asks how much to charge. Not for computing unit economics from real cost data or implementing billing.
metadata:
  tier: open
  level: L1
  domain: monetization
  install: optional
  keywords: [pricing, price point, pricing hypothesis, plan tiers, willingness to pay]
  verified-runtimes: [claude-code]
---

# Pricing as a hypothesis

A price is a guess about what a specific buyer will pay for a specific unit of
value against their next-best option. Written that way, it can be tested and
lost; written as "9,900 won feels right", it can only be argued.

## Write the hypothesis

Fill each line, marking what is assumed:

- **Buyer**: one segment, concrete (small cafe owners with one store), not
  "users".
- **Unit of value**: what the price is attached to (per store, per post, per
  month of use). It should grow with the value the buyer gets.
- **Alternative**: what they do today and what it costs them (an agency, an
  intern's hours, a competitor at a stated price, doing nothing).
- **Price and structure**: the number, and any tiers or limits.
- **Prediction**: the observable result that would mean the price is right
  (conversion from trial, share choosing the middle tier, churn after the first
  bill), with a threshold.
- **Kill condition**: the result that would make you change it.

## Question the hypothesis

- If the unit does not track value, heavy users are subsidised or light users
  leave; say which.
- If the alternative is free and good enough, the price needs a reason beyond it.
- Tiers: each step should unlock something the next segment needs, not just more
  of the same.

## Test cheaply

Pick the test that answers the prediction soonest: a price shown on a landing
page with a waiting list, interviews asking about the alternative's cost,
a time-boxed offer to a small group. Say what you will measure and for how long.

Do not present any willingness-to-pay figure the user did not provide as fact.
