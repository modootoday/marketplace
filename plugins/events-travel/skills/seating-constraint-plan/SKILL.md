---
name: seating-constraint-plan
description: Seat guests at tables from the keep-apart, sit-together and capacity rules the user supplies, then verify every rule against the final layout and report the conflicts instead of bending a rule. Use when someone asks to make a seating chart, table plan or room split for an event, dinner or class under rules such as A apart from B, these people together, N seats per table. Not for guessing who gets along, ranking or judging guests, venue floor plans, or invitations.
metadata:
  tier: open
  level: L2
  domain: planning
  install: optional
  keywords: [seating chart, table plan, keep apart, sit together, capacity, event planning]
---

# Seating constraint plan

A seating chart that looks fair often breaks one rule quietly, or exceeds a table's capacity.
Treat the rules the user gave as the only inputs and verify the result against each of them.

## Steps

1. Write the inputs back: guest list (count), tables and seats per table (total seats), and
   every rule numbered as given (apart, together, fixed seat). Total seats below the guest
   count is a stop: say so before placing anyone.
2. Merge "together" rules into groups (A with B and B with C makes one group of three). A
   group larger than one table is infeasible: say which rules make it.
3. Place the largest groups first, then add "apart" rules as exclusions, then fill the
   remaining guests. Keep every guest at exactly one table.
4. Verify: a table of rule checks, one row per numbered rule, showing the tables of the guests
   involved and pass or fail; and a seat count per table against its capacity.
5. If the rules cannot all hold, do not output a layout that quietly breaks one. Show the
   forced chain that fails, then offer each smallest relaxation (which single rule to drop or
   which capacity to raise) with its own layout and its own full check. Ask which one the
   user wants.

When a request depends on a trait (shy, outgoing, difficult), say in one line that you do not
know it and cannot judge it, name no guest as having it, and ask for an explicit rule instead.

## Never

- Infer anything about a person (personality, status, who would get along, shyness, age)
  beyond the rules supplied. A request that depends on such a trait is a missing rule: ask
  for it as an explicit rule, or leave it out and say so.
- Add guests, tables or rules the user did not give.
- Present a layout as final without the per-rule check, or with a rule failing.
- Put one guest at two tables or leave one unseated to make the counts work.
