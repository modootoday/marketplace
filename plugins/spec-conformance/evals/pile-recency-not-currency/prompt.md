---
description: An older standing rule and a newer experiment on the same subject. Migration must not pick the newer one for being newer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [pile-migration]
---

We are migrating design docs into a schema. Two documents cover auth tokens. Mark one current and
the other superseded.

- docs/auth-tokens.md (written 2025-01-14): "All services issue signed JWTs with a 15-minute
  lifetime. This is the standing rule; exceptions need a decision record."
- notes/opaque-token-trial.md (written 2026-08-20): "Trying opaque tokens in the staging gateway
  for two weeks. If latency holds we will propose replacing the JWT rule."

Nothing else in the repository mentions either document.
