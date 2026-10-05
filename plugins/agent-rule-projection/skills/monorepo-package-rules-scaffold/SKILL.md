---
name: monorepo-package-rules-scaffold
description: Lay out agent rules across a monorepo - a root AGENTS.md under 12 KB and 200 lines that points to path-scoped .agents/rules/*.md files, one per-package AGENTS.md of constraints only under 4 KB with the long form in .agents/PACKAGE.md under 200 lines, the CLAUDE.md and GEMINI.md links each package needs, and two checks (a context budget and no legacy .agent/ directory). Use when setting up or restructuring rules for many packages, when the root AGENTS.md has grown past its budget, or when adding budget checks for instruction files. Not for trimming one file under budget or for projecting rule files into agent filenames.
metadata:
  tier: open
  level: L2
  domain: agent-workflow
  install: optional
  keywords: [monorepo, AGENTS.md, PACKAGE.md, package rules, context budget, path-scoped rules, .agents/rules]
---

# Package rules for a monorepo

Instruction files load into every session that starts near them, so their size is a
recurring cost. The layout keeps what loads always small and moves the rest to files that
load by path or on demand.

Two sibling skills cover neighbouring work; use them instead of repeating it here:
agents-md-budget-trim cuts one file under its budget, and rule-layering decides what
belongs in the thin file versus the long form and keeps one source per package.

## Layout

| File | Holds | Budget |
| --- | --- | --- |
| root `AGENTS.md` | repo-wide constraints, plus one pointer row per path rule | 12 KB and 200 lines |
| `.agents/rules/<topic>.md` | a rule that matters only under some paths | none, but it loads whole when it loads |
| `<pkg>/AGENTS.md` | that package's constraints only | 4 KB |
| `<pkg>/.agents/PACKAGE.md` | the long form: background, commands, dependencies | 200 lines |
| `<pkg>/CLAUDE.md`, `<pkg>/GEMINI.md` | links to `AGENTS.md` | - |

Bytes per token measured 1.98 for Korean to 3.07 for English text, so a 4 KB file costs
about 1.3k to 2.1k tokens. Keep budgets in bytes so the check runs offline; quote the
token range when someone asks what a budget costs.

## Path rules

```markdown
---
trigger: glob
description: How code reaches the analytics database.
globs:
  - "services/analytics/**"
  - "**/migrations/analytics/**"
---
```

`pmcp project` turns `globs` into `paths:` for Claude Code under `.claude/rules/pmcp/`.
Other tools get no path scoping, so add a pointer row in the root `AGENTS.md` for each rule:

```markdown
| Rule | Before you |
| --- | --- |
| `.agents/rules/analytics.md` | query or migrate the analytics database |
```

A glob whose fixed prefix matches no tracked file loads nowhere; `pmcp project --check`
reports it as a dead glob.

## Package links

Each package with its own `AGENTS.md` also needs `CLAUDE.md` and `GEMINI.md` links to it.
Measured: with a root `CLAUDE.md` present, Claude Code did not read `packages/*/AGENTS.md`;
and Gemini CLI started inside a package read the root `GEMINI.md` but not the package's
`AGENTS.md` until the link existed. Use file links; never link a directory at the root.

## Two checks

1. **Context budget.** Fail when root `AGENTS.md` exceeds 12,288 bytes or 200 lines, when
   any tracked package `AGENTS.md` that is a real file (not a link) exceeds 4,096 bytes, or
   when `.agents/skills` holds more than your root skill cap. Print each overage with its
   size and budget. Add a separate line count for `.agents/PACKAGE.md` over 200.
2. **No legacy directory.** Fail when any tracked path contains a `.agent/` segment
   (singular): `git ls-files -z` filtered by `(^|/)\.agent/`. Codex and Gemini CLI read
   nothing there and Antigravity only as a legacy path, so what is left there reaches
   almost no one.

Run both before commit and in CI; each exits non-zero with the offending paths listed.

## Report

The tree of files created or moved, each budget row with its measured size, the pointer
rows added, and both checks' output.
