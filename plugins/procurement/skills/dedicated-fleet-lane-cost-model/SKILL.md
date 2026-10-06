---
name: dedicated-fleet-lane-cost-model
description: Compare dedicated-carrier bids that mix a fixed weekly charge with a per-mile rate, or distribution-center lane scenarios, by converting every bid to weekly cost, cost per mile, per trip and per stop under one stated volume, counting empty return legs as billed miles, finding the break-even volume between bids and listing which fees each bid leaves out. Use when a buyer or logistics planner must choose between fixed-plus-variable bids or one-way and round-trip lane layouts. Not for contract negotiation, carrier qualification, or an award decision, which stay with the buyer.
metadata:
  tier: open
  level: L3
  domain: procurement
  install: optional
  keywords: [dedicated fleet, fixed and variable bid, cost per mile, deadhead, break-even, lane scenario]
  verified-runtimes: [claude-code]
---

# Dedicated fleet lane cost model

A bid with a fixed charge and a bid with only a per-mile rate cannot be compared by their headline
rates. Compare them at one stated volume, then show where the answer flips.

## Steps

1. Write the volume assumptions before any maths: miles one way, trips per week (or period), stops
   per trip, one-way or round trip, and whether the return leg is empty. If a figure is missing,
   state the assumption you use and ask for the real one.
2. Count empty return legs (deadhead) as miles. A round trip of 310 miles one way is 620 miles per
   trip. Say whether the bid bills the return miles; if the bid is silent, assume it does and flag
   that as a question for the carrier.
3. For each bid compute: weekly total (fixed plus rate times total miles), cost per mile, cost per
   trip, cost per stop and cost per load. Show the arithmetic so the buyer can recompute.
4. Break-even: with fixed charge F and per-mile rates a (bid with fixed) and b (without),
   break-even weekly miles = F / (b - a). State which bid is cheaper below it and which above,
   and convert it to trips per week at the stated trip length.
5. Run the lane variants the user asked about (one-way versus round trip, a different trip count)
   through the same table, changing one thing at a time.
6. For each bid list what the quoted figures leave out: fuel surcharge, accessorials (detention,
   liftgate, extra stops), tolls, minimum-mile or minimum-week terms, and term length. Do not put
   a number on a fee the bid does not state.
7. Recompute every total once before reporting. Say the comparison is only as good as the volume
   assumptions, and that the buyer decides.

## Output

One table (bid, weekly cost, per mile, per trip, per stop), the break-even line, the excluded-fee
list per bid, and the assumptions the buyer must confirm.
