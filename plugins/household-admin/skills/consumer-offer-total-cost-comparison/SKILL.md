---
name: consumer-offer-total-cost-comparison
description: Compare bundled personal offers, such as a car price with a trade-in discount against selling the old car separately, or a pay-per-GB mobile plan against a flat plan, by splitting each offer into its written price components with validity dates, recomputing every total with the arithmetic shown, running the plans against the person's own usage figures, and marking each rate, fee or rule that was not in the pasted quotes as unverified. Use when someone asks which of two offers costs less in total. Not for choosing for the person, for financial, tax or legal advice, for business bids, or for checking network coverage.
metadata:
  tier: open
  level: L2
  domain: household-admin
  install: optional
  keywords: [car trade-in, total cost, mobile plan, data overage, offer comparison, quote validity]
  verified-runtimes: [claude-code]
---

# Consumer offer total-cost comparison

This is arithmetic on quotes and usage the person supplied. It does not say which offer to take,
and it has no access to current official rates unless the person pastes them.

## Steps

1. List each offer as written. Separate components: vehicle price, discount and what it requires,
   trade-in value, fees, financing, taxes (with the rule as quoted), monthly price, per-unit
   price, overage and speed rules, rollover. Next to every component write the quote's validity date
   or "no date given".
2. A condition tied to a component stays attached to it (a discount "if you trade in" exists only in
   the trade-in scenario). Build one scenario per way of doing it, for example "dealer trade-in" and
   "sell separately, buy without the discount", and keep the outside sale quote apart from the dealer
   trade-in value.
3. Recompute each total yourself from the components, show the arithmetic line by line, and give the
   net outlay per scenario and the difference. Do not copy a total the quote states without recomputing
   it; if it differs, show both.
4. Plans: apply each plan to the usage figures given, month by month, then total and average. Show
   what the rollover, overage and throttle rule would do in each month, and note months near a limit.
   Say in words whether each rule was triggered in the usage given (for example "no month exceeded
   50 GB, so the throttle never applied") and what unused allowance is worth when nothing rolls over
   (nothing, it is lost).
   Do not extrapolate beyond the months given.
   Compare the validity dates and say in one sentence which quote expires first and what that means
   for the order in which the person must decide.
5. Unverified list. Anything not in the pasted text (current official rates, taxes and fees the quote
   leaves out, whether a quote is still valid today, whether a rule has changed) is listed as
   unverified with what to check and where. Do not fill a rate from memory.
6. Coverage and service quality are a separate check the person must do locally; the cost result
   says nothing about them.
7. Report which scenario is lower on the stated numbers and by how much, without telling the person
   to take it, and state that the result changes if an unverified item changes.
