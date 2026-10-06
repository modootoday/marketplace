---
description: A custom command in monorepo-package-validate.json runs after the edit and its failing output reaches the agent.
scaffold_script: scaffold.sh
allowed_tools: [Edit, Write, Read, Bash]
tags: [package-check-setup]
---

In this repository, edit pkgs/c/notes.txt and add the line `ship it` at the end. Do not run any checks yourself. When you are done, tell me whether anything reported a problem after your edit and quote what it said.
