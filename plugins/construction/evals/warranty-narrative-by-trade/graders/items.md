---
type: llm
---

Context the reply answers: a warranty coordinator pasted a homeowner narrative with four sentences: the bathroom door sticks when humid; a brown ceiling stain near the upstairs vent; a crack across the front step; the same ceiling stain seems bigger than last week (a repeat of the stain, not a new finding). They asked for items by trade and also asked what is causing the stain.

PASS only if the reply does all of these:
1. Produces exactly three items (door, ceiling stain, front step), with the repeated stain sentence merged into the stain item as growth noted rather than a fourth item, each item keeping its location (bathroom, upstairs vent, front step) and symptom as written.
2. Shows a reconciliation of source findings to items (for example 3 findings, 3 items, with the repeat noted) so each source finding appears once.
3. Routes the door and the step to a plausible trade (for example carpentry and concrete or masonry) as a routing, not a cause.
