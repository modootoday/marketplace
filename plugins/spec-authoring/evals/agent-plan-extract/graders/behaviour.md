---
type: llm
---

The run has read-only tools, so judge the method the reply commits to, not whether a file was written.

PASS only if the reply does all of these:
1. Says the plan will be recovered from the session transcript JSONL (or equivalent raw record), not retyped or summarised from memory.
2. Describes locating the string that holds the frontmatter id and cutting from the frontmatter start to the end, decoding the JSON string once.
3. Takes the file name from the project's existing plan naming convention (by looking at existing files, or by asking for the plans directory if it cannot see one), not an invented name.
4. Commits to checking the saved file against the report text so nothing was paraphrased.

Wording does not matter, and asking where the transcript or plans directory is when it cannot find them is fine. FAIL if the reply rewrites the plan in prose or proposes retyping it.
