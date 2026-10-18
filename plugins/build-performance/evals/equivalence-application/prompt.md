---
description: equivalence-application
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [toolchain-equivalence-pilot, positive]
---

An application build-tool upgrade cuts one production build from 20s to 9s. Unit tests pass. The app uses hashed CSS/assets and SSR hydration. Old and new browser logs show the same warning. Candidate SSR rendering has not run, and old output was retained during the new build. Browser visual checks, controlled cold/warm repeats and compressed-size inventory are absent. Assess adoption and minimal relevant checks. This is not a formatter change; do not reformat source.

Reading installed skill instructions is permitted. Execution restrictions above concern project commands, builds, tests and file changes, not reading those instructions.
