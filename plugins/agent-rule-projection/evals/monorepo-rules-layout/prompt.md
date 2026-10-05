---
description: What monorepo-package-rules-scaffold should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [monorepo-package-rules-scaffold]
---

Our monorepo has 40 packages and one root AGENTS.md that is now 31 KB and 520 lines (CLAUDE.md is a link to it). About half of it is per-package detail: e.g. a 9 KB section only about packages/billing (constraints like "amounts are integer cents" mixed with history and command lists), a 6 KB section about database migrations that only matters under services/*/migrations/, and the rest is repo-wide. Some packages still have an old .agent/rules/ folder from a previous tool. Claude Code users say the billing rules are ignored when they work inside packages/billing. Design the target layout and the checks that keep it from growing back. How many tokens is the package budget you propose?
