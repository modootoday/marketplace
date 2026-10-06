---
name: construction-defect-list-routing
description: Split an inspection report or a homeowner warranty narrative into one defect item per finding, each with location and symptom, route each item to a trade, flag items whose trade or location is unclear, and reconcile the item count against the source findings. Use when someone pastes inspection findings, a punch list or a free-text warranty claim and wants a list sorted by trade. Not for diagnosing causes, judging severity or safety, estimating cost or deciding warranty coverage.
metadata:
  tier: open
  level: L2
  domain: construction
  install: optional
  keywords: [punch list, defect list, inspection, warranty, trade routing, homebuilding]
---

# Defect list routing by trade

A narrative holds findings; a trade needs a list it can act on. This skill restructures what was
written. It does not decide what is wrong, how serious it is, or who is liable.

## Steps

1. Number the source findings first. Read the narrative and write the findings as it states them,
   F1, F2 and so on, one per distinct symptom or place. Two symptoms in one sentence are two
   findings. The same symptom mentioned twice is one, noted as repeated.
2. One item per finding. Each item has: id, location (as written, with the building area or room
   and level if given), symptom (as written, no cause), and the source wording in quotes. Do not
   add a cause, a severity or a fix.
3. Route to a trade only when the symptom and place make the trade clear on their face (a cracked
   concrete step to concrete or masonry, a sticking interior door to carpentry or finish
   carpentry, a dripping tap to plumbing). Where more than one trade could own it, or the
   location is vague, write "trade unclear" with the candidate trades, and do not pick one. A
   stain, a smell or anything whose origin the narrative does not state gets "trade unclear, needs a
   site visit" and names who could decide. Never describe a finding's type or weight ("structural
   crack", "serious", "cosmetic"); list the symptom in the homeowner's words only.
4. Location gaps: if a finding has no room, level or side, flag "location unclear" and ask for it.
5. Reconcile. Show the count: source findings, items produced, items per trade, unclear items.
   They must match: every finding appears once and only once. Name any finding merged or repeated.
6. Group by trade for the hand-off, keeping unclear items in their own group at the top so the
   coordinator sees them first.
7. State what you did not do: no cause, severity, safety view, cost or warranty-coverage decision.
   Any finding whose origin or safety is open goes to a qualified inspector or the responsible
   contractor to assess, said once and plainly in a single closing line. Do not
   say how soon, how worrying or how likely: no urgency words, no "growing so look soon", no
   conclusion about the cause, and no hypothetical hazard the narrative did not state (no "if it
   is structural", no "water near electrics"). A reported change (bigger, spreading) is passed on as the
   homeowner's words, not weighed.

## Output

The numbered source findings, the item table (id, location, symptom, source quote, trade or
"trade unclear" with candidates), the reconciliation line, and the follow-up questions.
