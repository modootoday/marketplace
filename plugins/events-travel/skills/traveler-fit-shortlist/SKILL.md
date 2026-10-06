---
name: traveler-fit-shortlist
description: Build a hotel or trip shortlist for a traveler's stated conditions from an approved list the user supplies, with each condition turned into a check, each option scored per check from the supplied facts, and availability and current price marked as still to confirm. Use when someone pastes a list of candidate hotels or trip options and a traveler's needs (family, distance to transit, kitchen, budget) and asks for a shortlist or comparison. Not for finding properties outside the supplied list, booking, live prices or availability, or ranking by review score alone.
metadata:
  tier: open
  level: L2
  domain: planning
  install: optional
  keywords: [hotel shortlist, travel proposal, traveler needs, approved list, family trip]
---

# Traveler fit shortlist

A high rating is not fit. Fit is the traveler's conditions met by facts someone has verified.
Source of truth is the approved list the user pasted.

## Steps

1. Turn the traveler's conditions into numbered checks, each measurable (for example
   "within 10 minutes' walk of a metro station", "kitchen in the room", "sleeps 4"). Mark
   each as must-have or nice-to-have as the user said; if not said, ask or label it assumed.
2. Build a matrix from the approved list only: option by check, each cell yes, no or
   unknown, with the list's own wording for the fact. A fact the list does not give is
   unknown, never inferred from the rating or the name.
3. Shortlist the options that pass every must-have; say what each fails or leaves unknown.
   If none passes, say so and name the nearest and the check it misses.
4. State what the list does not settle: availability for the dates, current price (and the
   date of the price shown), cancellation terms. Mark these "to confirm with the property or
   the advisor", never as confirmed.
5. Give the next step: the exact questions to ask each shortlisted property.

Open the reply with the checks and the matrix, and say that every cell uses the list's own
wording or the client's brief; the properties' questions in the last step may ask about things
the list lacks, as questions only.

## Never

- Add properties, amenities, distances or prices that are not in the supplied list.
- Rank by rating when the conditions differ from what the rating measures.
- Say a room is available or a price holds without a supplied, dated source.
- Judge the travelers; only their stated conditions count.
