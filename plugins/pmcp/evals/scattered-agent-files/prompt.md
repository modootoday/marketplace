---
description: What agent-assets-migrate should change in the answer.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [agent-assets-migrate]
---

We want to consolidate our agent files with pmcp so Claude Code, Codex and Gemini CLI all see the same things. You can't see the repo, so here is everything relevant. Give me the migration plan: the target files with their content, the pmcp.toml, what happens to each old file, and how we know nothing was lost.

CLAUDE.md:

```
# Shop
- Prices are integers in cents.
- Never call the payment API from a UI component.
- Run `npm test` before every commit.
```

.cursorrules:

```
# Shop
- Prices are integers in cents.
- Never call the payment API from a UI component.
- Feature flags live in src/flags.ts; never hard-code a flag.
```

.claude/agents/reviewer.md:

```
---
name: reviewer
description: Reviews diffs for pricing and payment mistakes.
tools: Read, Grep, Glob
model: sonnet
---
Check every changed price for cents, and every payment call site.
```

.claude/commands/release.md:

```
---
description: Cut a release - bump version, update CHANGELOG, tag.
---
1. Bump the version. 2. Update CHANGELOG.md. 3. Tag vX.Y.Z.
```

docs/decisions/2024-03-payments.md contains the line: "Rules live in CLAUDE.md (see .claude/agents/reviewer.md)."
scripts/lint-rules.sh reads .cursorrules.
