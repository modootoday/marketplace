---
description: Three rule files that drifted and grew a changelog. The answer must project one source and split loaded rules from reasoning.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [rule-layering]
---

Our repository has CLAUDE.md, AGENTS.md and GEMINI.md at the root. Each is about 600 lines, they
started as copies and now differ in a dozen places. They also hold a "Progress" section with dated
notes like "2026-08-12 phase 2 complete", a changelog, and the deploy runbook. Agents load them on
every turn. How should we restructure this?
