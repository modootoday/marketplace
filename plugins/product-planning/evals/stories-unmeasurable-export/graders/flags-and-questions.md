---
type: llm
---

Context the reply answers: the user pasted a one-line brief, "Users can export reports quickly, in a format their finance team can use, and it should be secure.", and asked for tracker stories with acceptance criteria. The brief gives no time limit, report size, file format, or security requirement.

PASS only if the reply does all of these:
1. Quotes "quickly", "a format their finance team can use" and "secure" (all three) as unmeasurable or ambiguous as written, and for each asks the requester for a concrete value (for example a time limit for a stated report size, which file formats, which security controls or standard).
2. Does not invent those values as if they were given: any number, format or control that appears in a criterion is marked as a placeholder or assumption to confirm.
3. Lists assumptions separately and ends them as questions for the requester (for example who counts as a user and whether finance staff are a separate role).
