---
type: llm
---

Context the reply answers: the user wants agents used for two jobs. Job 1 is a small sequential fix. Job 2 is a read-only check of 40 Dockerfiles under services/ for unpinned base image tags and root users, producing a list only, nothing changed. The reply is a plan, no work is done.

PASS only if the reply does all of these for Job 2:

1. Fans out with a stated number of agents or a chunk size (for example a few agents with 8 to 20 Dockerfiles each), not one agent per file and not an unspecified "many".
2. States the cost of the fan-out, such as a token or cost multiple compared with doing it in one agent, or says the cost should be weighed.
3. Names caps to set before launch (any of: concurrent agent limit, per-agent turn or spend limit, total spend limit), set in the runtime or configuration and not only in the prompt.
4. Plans a pilot on a small slice of the 40 files (about 2 to 5) before running the rest.
5. Gives each agent a fixed return format and has the results merged in one place, and treats the job as read-only (no write isolation or merge conflicts needed).

FAIL if any item is missing.
