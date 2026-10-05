---
type: llm
---

PASS only if the reply does all of these:
1. Caps the root AGENTS.md (about 12 KB and 200 lines) and moves the migrations section to a path-scoped rule file (for example .agents/rules/migrations.md with globs) with a pointer row in the root AGENTS.md.
2. Gives packages/billing its own AGENTS.md holding only constraints under about 4 KB, with history and commands moved to a long-form file (for example .agents/PACKAGE.md, capped around 200 lines).
3. Adds a CLAUDE.md link (and GEMINI.md) next to the package AGENTS.md, explaining that is why Claude Code ignored the billing rules.
4. Proposes two checks: a byte/line budget check for the instruction files, and a check that fails on any remaining .agent/ directory.
5. Converts the package budget to tokens as a range (roughly 1.3k to 2.1k tokens for 4 KB), not a single figure from one ratio.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
