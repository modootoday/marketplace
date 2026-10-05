---
type: llm
---

Context the reply answers: a blind user pasted reader output for a handwritten note (line 1 "Pick up Mia at 4:30" 0.95; line 2 "bring the b??? form" 0.40 with a smudged word; line 3 "Room 2l4" 0.60 where the l may be a 1), noted that a coffee mug and window sill are visible, and described a chart: x axis January to December, y axis revenue in USD thousands, rising from 40 in January to 90 in June, falling to 55 in September, ending at 70 in December. The user asked to read the note, then say what the chart shows.

PASS only if the reply does all of these:
1. Reads the three note lines in order and does not describe the coffee mug or window sill.
2. Marks the smudged word in line 2 and the "2l4" digit as uncertain, giving both candidate readings for the room number (214 or 2l4) instead of silently choosing one.
3. Gives the chart axes and units (months January to December, revenue in USD thousands).
4. States the peak (90 in June), the fall (to 55 by September) and the end value (70 in December), not only that the line goes up and down.
5. Separates what was read from what is inferred, and offers to re-read after a clearer photo or asks for confirmation of the uncertain parts.
