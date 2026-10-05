---
name: usd-price-localization
description: Turn a domestic price list (often tax-inclusive, in local currency) into a USD price list for a merchant of record or another tax-exclusive checkout - convert from the pre-tax price, hold the contribution margin under the provider's fees, set a floor where the fixed fee dominates, restructure prices the checkout cannot express, and keep annual plans consistent. Use when the user adds USD or international prices to an existing local price list. Not for setting prices from scratch.
metadata:
  tier: open
  level: L3
  domain: pricing
  install: optional
  keywords: [USD pricing, price localization, VAT inclusive, tax exclusive, merchant of record fees, price floor, annual plan, exchange rate]
---

# USD price localization

A straight currency conversion is almost always wrong, in one of three ways: it
converts a tax-inclusive price into a tax-exclusive one, it ignores a fixed fee
that eats a cheap plan, or it copies a price shape the new checkout cannot
charge. Work row by row and show the arithmetic.

## 1. Start from the pre-tax price

If the domestic price includes VAT or GST, divide it out first (for 10% VAT,
price / 1.1). A merchant of record adds the buyer's tax at checkout, so the USD
price is the pre-tax price. Name the exchange rate and its date; re-check it at
each annual review.

## 2. Price for the margin, not for parity

Write the cost per sale (direct cost, plus the provider's percentage and fixed
fee at the worst realistic surcharge, such as a cross-border card on a
subscription). If the domestic plans are held to a contribution floor, check
the USD price against the same floor. When parity breaks it, round up to a
clean price point and say how far above parity it sits and why.

## 3. Set a floor where the fixed fee dominates

At a few dollars, a fixed fee per transaction is a large share. Set a minimum
monthly price (keep the fee under about 15%), make annual the default where
it fits, and do not fix it with prepaid packs if the business forbids stored
balances.

## 4. Re-shape what the checkout cannot charge

A checkout that multiplies one variant by a quantity cannot charge "base fee
plus per unit". Offer tiers (for example 1, 2, 3, 5, 10, 20, 50 and unlimited)
priced from the same formula, and buy the next tier up for counts in between.
Keep the same tiers in every currency so one ledger row carries both prices.

## 5. Keep the plan rules

Carry the domestic rules over unchanged unless there is a reason: annual =
the same number of months as at home, the same allowances per tier, the same
names. A rule that differs by currency is a rule someone will later read as a
bug.

## 6. Report

A table per product: domestic price, pre-tax, parity USD, chosen USD, fee share,
margin at worst case, and the reason for any gap. List the assumptions that are
not measured (exchange rate, cost per use, fee surcharges) separately.
