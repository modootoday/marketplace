---
description: Choose a runtime for a build from allowance readings with several windows.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [runtime-quota-check]
---

I need to route one eight-minute read-only build audit to an installed CLI. I will run it after
your answer; prepare the decision and preflight commands, don't contact providers now.

Our sanitized usage notes were copied at 14:00 UTC on 2026-10-06. It is now 14:03 UTC. Comparable
audits consumed eight percentage points in every applicable allowance window. We keep a 10%
reserve. Included billing only; no credit overflow. All five CLIs are installed.

- Claude Code `/usage`: five-hour used 87%, resets 16:00 UTC today; weekly used 40%, resets
  2026-10-09 00:00 UTC. Live at the observation time.
- Codex `/status`: five-hour used 70%, resets 17:00 UTC today; weekly used 89%, resets
  2026-10-10 00:00 UTC. Live at the observation time.
- Grok provider usage screen: current window used 62%, resets 18:00 UTC today; the screen says
  this is the only applicable build-model bucket. Live at the observation time.
- Gemini `/stats model`: quota request failed; session tokens 12,400, last successful quota read
  was yesterday and showed 90% remaining. Daily reset was not in that old reading.
- Antigravity `/usage`: build-model remaining 16%, resets 19:00 UTC today. Live at observation.

Which should get the audit, and what should I keep with the handoff so I can check this choice
before starting it?
