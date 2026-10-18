---
description: portability-scope
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [optimization-portability-review, positive]
---

A patch intentionally sets project IDs from this repository and excludes its vendor subtree as local configuration. A separately published helper accepts only string-array workspaces, and silently returns [] for {packages:["modules/**"]}. Unknown process memory defaults to 12 workers. Linux local tests pass; macOS and Windows are untested. Classify generic defects versus local policy, propose a scoped fix and state supported scope. Do not run commands.

Reading installed skill instructions is permitted. Execution restrictions above concern project commands, builds, tests and file changes, not reading those instructions.
