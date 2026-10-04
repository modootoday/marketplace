---
description: Briefs whose own headers went stale while the roadmap recorded them complete. The register must win, with evidence.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [pile-migration]
---

We are migrating old design docs into a schema and need a status for each brief. Decide them and
tell me why.

- briefs/export-api.md, header: "Status: waiting on design review" (written 2026-02-03)
- briefs/audit-log.md, header: "Status: not yet written, placeholder" (written 2026-02-10)
- briefs/rate-limits.md, header: "Status: in progress" (written 2026-03-01)

roadmap.md, section "Change register":
- 2026-04-18 export-api shipped; superseded by docs/api/export-v2.md
- 2026-05-02 audit-log shipped as part of the compliance release
