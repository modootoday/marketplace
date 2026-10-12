---
description: Additional positive authoring-import-fidelity-check coverage
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [authoring-import-fidelity-check, coverage-20261012]
---

Audit an approved source against a cloned course using only these snapshots; no edits. Both have body='Welcome.' and two identical options: approved order A='One' incorrect,B='Two' correct; clone order B='Two' correct,A='One' incorrect. Both text limits are 50 characters. Source opens 2030-01-10 and closes 2030-01-30, staff-group enrolment only, pass threshold80, three attempts, completion requires passing, quiz link='/courses/source/quiz'. Clone opens 2030-01-11 and closes 2030-01-20, public enrolment, threshold70, unlimited attempts, completion on opening, quiz link still '/courses/source/quiz'. Clone course identity is '/courses/clone'. Compare exact text and settings, distinguish option order changes from a key that still identifies Two, count text against limits without inventing truncation, and flag retained source links and all setting changes for owner acceptance. Do not infer actual link availability.
