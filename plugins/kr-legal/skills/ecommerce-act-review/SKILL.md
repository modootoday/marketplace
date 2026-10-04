---
name: ecommerce-act-review
description: Review an online sales or subscription flow against Korea's Act on Consumer Protection in Electronic Commerce - seller information, pre-purchase disclosure, cancellation and withdrawal rights and their exceptions, automatic renewal and free-trial conversion notices, and refund timing - citing retrieved article text. Use when the user sells goods, digital content or subscriptions to Korean consumers and asks whether the checkout, refund policy or renewal flow is compliant. Not for business-to-business contracts.
metadata:
  tier: open
  level: L3
  domain: legal-review
  install: optional
  keywords: [e-commerce act, withdrawal right, subscription renewal, refund policy, Korean consumer law]
  requires:
    mcp: [korean-law]
---

# E-commerce act review

Consumer protection in online sales turns on what the buyer was told before
paying and how easily they can undo it. Walk the flow the buyer sees, screen by
screen, then check each step against the retrieved law.

## Walk the flow

Product page, cart, checkout, payment confirmation, receipt or email, the
account page where they cancel, and every message before a renewal charge. Note
what is shown at each step and what is missing.

## Check

1. **Seller information**: identity, address, contact, business registration and
   mail-order business report number shown where buyers can find them.
2. **Before purchase**: the total price, what is delivered, the subscription
   period and renewal terms, and the conditions and method of withdrawal, shown
   before the buyer pays.
3. **Withdrawal**: the statutory withdrawal period and its start, the exceptions
   (for example digital content once supplied), and whether the seller took the
   steps that make an exception apply (such as notice and a trial or sample).
   A policy that refuses all refunds is a finding.
4. **Subscriptions**: notice before an automatic renewal or before a free trial
   turns paid, and an easy way to cancel. Check the current rules for timing and
   consent with the `korean-law` server.
5. **Refund timing and method**: refunds within the period the law sets, by the
   original payment method where possible.

## Output

A table: step, what the buyer sees, the rule (article and effective date), the
gap, the fix (corrected copy or flow). Separate what you verified in the
retrieved text from what you could not, and recommend counsel for anything that
turns on interpretation.
