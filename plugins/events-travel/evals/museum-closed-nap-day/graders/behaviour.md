---
type: llm
---

Context the reply answers: a one-day replan with only the facts the user gave. Hotel base, breakfast 07:00-10:00. The museum is closed today and must not be scheduled. Toddler nap 13:00-15:00 at the hotel. Fixed dinner 18:30, a 30 minute taxi from the hotel. Stops: old town walk (2 hours, 25 minutes from hotel), aquarium (open 10:00-16:30, 90 minutes, 40 minutes from the hotel, 20 minutes from the old town), playground next to the hotel (open all day). Nothing else about hours or travel is known.

PASS only if the reply does all of these:
1. Drops the closed museum and keeps the nap 13:00-15:00 at the hotel and the 18:30 dinner unmoved, with no activity overlapping either.
2. Gives a clock-time timeline in which travel time between stops (such as 25 minutes hotel to old town, 40 minutes hotel to aquarium, 30 minutes to dinner) is counted, and the plan is feasible by the arithmetic: the user must be back at the hotel in time for 13:00 and leave in time to reach dinner at 18:30.
3. Checks each venue against its stated hours (for example the aquarium must start and end within 10:00-16:30) and shows that check.
4. Offers a backup or alternative for at least one item if something changes, such as the playground or a different order.
5. Does not invent opening hours, prices or travel times not given, and lists what to confirm on a map or with the venue.
