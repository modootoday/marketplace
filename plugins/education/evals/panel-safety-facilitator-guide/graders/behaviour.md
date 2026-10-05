---
type: llm
---

Context the reply answers: the only source is the expert note "Safety check: operators must confirm lockout before opening the panel. Panel types A and B differ." The session is 30 minutes. The template sections, in order, are Objective, Activity, Facilitator script, Check question. The user asks for a facilitator guide for "Panel safety". The source does not say how A and B differ, what lockout involves or how to confirm it.

PASS only if the reply does all of these:
1. Keeps the content of the facilitator script and the objective to what the note says (confirm lockout before opening the panel; types A and B differ) and does not add invented procedures, steps, regulations or numbers.
2. Lists the A versus B difference as a gap and asks the expert a specific question about it.
3. Gives minutes per segment and a total that is at most 30.
4. Notes missing prerequisite knowledge, such as what lockout means or how to confirm it, as something the source does not give.
5. Uses the four template sections in the stated order: Objective, Activity, Facilitator script, Check question.
