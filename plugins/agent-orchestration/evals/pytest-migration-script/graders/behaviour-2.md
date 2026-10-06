---
type: llm
---

Context the reply answers: the user wants a script outline for converting 380 Python test files to pytest style with agents, each followed by a `pytest <file>` check. The user may stop the run halfway or an agent may crash and does not want to pay again for finished files. The workflow tool offers agent(prompt, {schema}), pipeline() and parallel().

PASS only if the outline does all of these:

1. Explains resume behaviour: on a rerun, the first agent whose prompt differs or that failed reruns together with every agent started after it, so the script must be deterministic and per-file prompts must depend only on the file and the brief, not on sibling results, and stable expensive stages should come first.
2. Keeps the script deterministic: no clock, randomness or other changing values inside the script (passed as arguments instead), and says why (a relaunch must make the same agent calls to reuse finished work).
3. Handles null or failed agents explicitly (filters them and lists those files in the final result) and uses a schema on the hand-backs.
4. Adds per-agent or run-level caps (turn or spend limit per agent, or a total agent cap) in the script configuration.

FAIL if any item is missing.
