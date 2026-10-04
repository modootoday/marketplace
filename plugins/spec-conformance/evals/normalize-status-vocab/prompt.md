---
description: Free-text statuses and missing dates. Normalising must keep the facts in the statuses and invent no values.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [document-normalization]
---

Our design docs need frontmatter with `status` (active, superseded or archived), `updated` and
`reviewed`. Here is what the four files say today. Give me the frontmatter you would write for each.

- plans/20250311-search-reindex.md: `status: completed`
- plans/20250602-billing-v2.md: `status: done 2025-08 (but see #412 for the refund edge case)`
- plans/20250910-sso-rollout.md: `status: on hold until legal signs off`
- plans/20251001-cache-warmup.md: no frontmatter at all

Git says each file was last touched in a formatting commit on 2026-09-28.
