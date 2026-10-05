---
type: llm
---

PASS only if the reply does all of these (wording is free):

1. Does not agree to delete all three as reported; says the knip result does not cover dynamic imports.
2. Says to check config/schedules.yaml for reindex-search and routes.json for legacy-webhook (by searching the names as strings) before deciding.
3. Mentions at least one other external reach to check: other repositories or consumers, cron or infrastructure config, environment or feature flags, or runtime logs of calls.
4. Treats backoff.ts as a keep-or-retire judgement on value (it may be kept as valuable even if unused, or retired with a recorded copy), not as automatically dead.
5. For anything retired, asks for a record: a short decision note or commit message with the evidence and where a copy lives (for example the last commit hash), and removal in its own commit together with config entries that point at it.

FAIL if any item is missing.
