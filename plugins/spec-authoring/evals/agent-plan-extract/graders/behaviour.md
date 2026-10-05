---
type: llm
---

Context the reply answers: the user asked the agent to save a long plan (frontmatter id cache-migration-plan) that a read-only Plan subagent returned in its final report. The agent runs with read-only tools and cannot see the transcript or any plans directory, so no file can be written. Judge the method the reply commits to, not whether a file exists.

PASS only if the reply does all of these:
1. Says the plan will be recovered from the session transcript JSONL (or equivalent raw record), not retyped or summarised from memory.
2. Describes the extraction concretely: locating the string that holds the frontmatter id, cutting from the frontmatter start to the end, and decoding the JSON string once (parsing it as JSON, not unescaping by hand twice).
3. Takes the file name from the project's existing plan naming convention (by looking at existing files, or by asking for the plans directory or an existing plan name), and does not invent a name of its own.
4. Commits to checking the saved file against the report text so nothing was paraphrased.

Wording does not matter, and asking for access or paths is fine. FAIL if the reply rewrites the plan in prose, proposes retyping it, or only lists blockers without stating the extraction steps.
