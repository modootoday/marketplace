---
description: Additional positive nontechnical-editor-content-model coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [nontechnical-editor-content-model, coverage-20261012]
---

Design unexecuted editing path for a small menu site. Owner on phone changes dish price, adds/unpublishes dishes, adds/unpublishes weekly specials. Staff may manage weekly specials only. Existing price and description are hardcoded in markup; /admin has no login. Name content fields/data moves and validation, server-side permissions, test rows for each action including each item type's add-layout/count and unpublish checks plus cache propagation. Test three identities on both page open and submit: signed out,no-rights,limited staff. End with concise owner how-to then only one Not run or verified line. No site execution.
