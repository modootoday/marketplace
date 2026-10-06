---
type: llm
---

Context the reply answers: the user wants a script outline (agent(), pipeline(), parallel() available) converting 380 Python test files from unittest to pytest style; each file must be checked by `pytest <file>`, which takes about 3 GB of memory, on a shared 24 GB machine; the user wants one final summary of clean, failed and why; the run may be stopped or an agent may crash, and finished files should not be paid for again.

PASS only if the outline does all of these:

1. Limits the concurrency of the pytest step separately from the agent concurrency (a lock, queue or semaphore, or a small cap such as 3 to 4 at once) with a reason based on the 3 GB per run on a shared 24 GB machine, rather than running all or many pytest runs in parallel.
2. Starts with a pilot on a small slice (about 2 to 5 files) and reads the results before the full run, for example through a slice-size argument.
3. Uses a per-file pipeline (convert then check per file) rather than a parallel() barrier between converting all files and checking all files, and reserves a barrier only for the final summary step.
4. Ends with one reduce or summary agent, with schema-typed per-file results, that lists failed files and the reason.

FAIL if any item is missing.
