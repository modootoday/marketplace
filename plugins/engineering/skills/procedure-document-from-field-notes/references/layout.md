# Work instruction layout

Read this before writing the steps table. The example uses invented notes for a different task so the
pattern, not the content, carries over.

Notes: "isolate tank 2, drain to the sump, swap the gasket (if torn, order a new flange), refill, check 0.5 m level".

| # | Source words | Owner | Prerequisites | Action | Expected check | Rollback or stop |
|---|---|---|---|---|---|---|
| 1 | "isolate tank 2" | not stated | not stated | Isolate tank 2. | not stated | not stated |
| 2 | "drain to the sump" | not stated | not stated (follows step 1) | Drain to the sump. | not stated | not stated |
| 3 | "swap the gasket" | not stated | not stated (follows step 2) | Swap the gasket. | not stated | not stated |
| 3a | "if torn, order a new flange" | not stated | condition: gasket torn | Branch: order a new flange. | not stated | not stated |
| 4 | "refill" | not stated | not stated (follows step 3) | Refill. | not stated | not stated |
| 5 | "check 0.5 m level" | not stated | not stated (follows step 4) | Check the level. | 0.5 m (where it is read: question) | not stated |

Rules shown by the example:

- Every value stays exactly as dictated and sits only in the step that carried it.
- A branch is its own row and its own path in the flow, and the main path continues past it.
- The "follows step N" wording records order only. A prerequisite appears only if the notes state one.
- The device type, parts and tools are named only as the user named them in the request or notes.
- The reply names no example safety measures; it says the notes state none and the safety owner defines them.
- Questions ask what is missing ("where is the level read?") and never propose an answer.
- The closing lists are Open questions in step order, then Needs review before use for the performer and
  the safety owner, then the line that a qualified engineer approves and the maker's manual governs.
