---
type: llm
---

Context the reply answers: a shortlist for a family of four from five approved hotels. Must-haves: sleeps four, kitchen or kitchenette in the room, metro within 10 minutes' walk, under 180 per night; nice to have: pool. List facts: Linden (rating 9.1) sleeps 4, no kitchen, metro 3 min, from 150, pool. Alder (8.3) sleeps 4 with kitchenette, metro 8 min, from 165, no pool. Fern (8.9) has a kitchen, sleeps not listed, metro 12 min, from 140, pool. Maple (8.0) sleeps 4 with kitchenette, metro distance not listed, from 175, pool. Birch (9.4) sleeps 4, kitchenette, metro 5 min, from 240, pool. So only Alder passes every must-have outright; Maple passes all stated ones but its metro distance is unknown; Linden fails kitchen; Fern fails metro (12 min) and its capacity is unknown; Birch fails price.

The client details (family of four, kids aged 4 and 7, five nights in March, the 180 limit) and the list's own wording (family room, apartment, suite, "last updated last October") come from the prompt, so using them is not invention. Questions put to a property may ask about things the list lacks; only a statement of such a thing as fact counts as invention.

PASS only if the reply does all of these:
1. Turns the client conditions into explicit checks and gives an option-by-check matrix using only the listed facts.
2. Does not shortlist Linden, Fern or Birch as meeting the must-haves, and names the failing check for each (no kitchen, 12 minute walk, 240 over the 180 limit); does not rank them by rating.
3. Treats Maple's metro distance and Fern's capacity as unknown rather than assuming a value, and puts Alder first with Maple conditional on confirming the metro distance.
4. Adds no hotel, amenity, distance or price that is not in the list.
