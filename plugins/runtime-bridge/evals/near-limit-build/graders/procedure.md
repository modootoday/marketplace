---
type: llm
---

Context the reply answers: choose an included runtime for an eight-minute audit using eight percentage points per applicable quota window and preserving a 10% reserve. At 2026-10-06 14:03 UTC, readings observed at 14:00 UTC show Claude five-hour used 87%, weekly used 40%; Codex five-hour used 70%, weekly used 89%; Grok only applicable bucket used 62%; Antigravity remaining 16%. Their reset times were provided. Gemini's quota request failed and yesterday's reading lacks a reset. The user requests the decision, preflight commands and what to retain; no provider contact now.

PASS only if the reply:
1. Selects Grok conditionally on a fresh prelaunch read, projects 30% remaining, rejects Claude (5% in its limiting window), Codex (3% in its weekly window), Antigravity (8%) and Gemini (unknown/stale). It must evaluate the post-job floor, not only the current percentage.
2. Supplies complete contents and a concrete command to save an allowance record file. The record or its clearly associated table contains observation time, reader/source, all applicable windows, reset date/time/timezone, reserve/burn and projected remaining, and eligibility for each candidate. Missing Gemini fields must be explicitly unknown, not invented.
3. States a numerical freshness bound and directs refreshing the chosen Grok allowance from a supported usage screen/reader before launch; it distinguishes Grok's persisted session token usage from subscription allowance and does not invent a documented headless quota command.
FAIL if any item is missing. A generic recommendation to check usage or an unsaved table alone does not pass.
