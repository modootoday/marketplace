---
name: takeoff-quantity-unit-check
description: Check a quantity takeoff or estimate sheet by writing each line's unit chain and recomputing it in code, confirming the waste factor is stated and applied once, making every total equal the sum of its lines, flagging lines far out of scale with sibling lines, and reporting each changed line with old and new value. Use when someone pastes takeoff lines, quantities or an estimate sheet and asks if the numbers are right. Not for pricing, bids or scope and cost structure.
metadata:
  tier: open
  level: L2
  domain: construction
  install: optional
  keywords: [takeoff, quantity, unit conversion, waste factor, estimate, concrete, cubic yards, order of magnitude]
  verified-runtimes: [codex-cli]
---

# Takeoff quantity and unit check

Takeoff errors are mostly units: inches treated as feet, square feet read as linear feet, cubic feet
reported as cubic yards. A sheet can also add waste twice or carry a total that is not the sum of
its lines. Recompute every line; do not judge by eye.

## Steps

1. For each line write the unit chain, for example `40 ft x 30 ft x 4 in = 40 x 30 x (4/12) ft
   = 400 cu ft = 400 / 27 = 14.81 cu yd`. Dimensions in different units are converted before
   multiplying.
2. Recompute in code (for example `node -e`) and compare with the entered value. Show entered,
   recomputed and the ratio. A ratio near 12, 144, 27 or 1728 usually names the unit slip.
3. Waste: find where a waste factor is stated and where it is applied. It must be applied once. If
   it is both inside the lines and added to the total, or stated but not applied, say so and show
   both results.
4. Totals: sum the entered lines and compare with the stated total. Show the difference. Then sum
   the corrected lines.
5. Order of magnitude: compare each line with its siblings of similar kind; flag any more than 10
   times away and explain whether the geometry supports it.
6. Report changed lines as a table: line, old value, new value, reason. Lines that checked out are
   listed as checked, not silently skipped.
7. State what you could not verify: the dimensions themselves (against drawings), the waste
   percentage chosen, and unit prices, which are out of scope here.

## Output

The line-by-line table with unit chains, the waste and total findings, the corrected totals, and
the open questions for the estimator.
