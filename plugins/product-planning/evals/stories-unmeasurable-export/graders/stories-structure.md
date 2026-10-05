---
type: llm
---

Context the reply answers: the user asked for tracker stories with acceptance criteria from the brief "Users can export reports quickly, in a format their finance team can use, and it should be secure." The brief covers three concerns: export itself, the file format for finance, and security.

PASS only if the reply does all of these:
1. Splits the brief into more than one story, each with an actor, a goal and acceptance criteria written as Given/When/Then statements (at least one failure or empty-case criterion somewhere, such as a report that is empty or an export that fails).
2. Lists dependencies between stories with an order (for example the basic export before the format story and the access control story) and says which can run in parallel or says there is no dependency.
3. Lists feasibility risks as questions to verify with engineering (for example large reports, the reporting data source, how access is checked) without asserting that they are easy or hard.
