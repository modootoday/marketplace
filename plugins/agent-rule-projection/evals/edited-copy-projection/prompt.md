---
description: One projection turned into an edited copy. The fix must fold its edits into the source and restore the link.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [rule-layering]
---

In our package, AGENTS.md is the real rule file and CLAUDE.md is a symlink to it. GEMINI.md was
supposed to be a symlink too, but someone replaced it with a copy last month and added two new
rules to it that the other files do not have. What should we do with GEMINI.md?
