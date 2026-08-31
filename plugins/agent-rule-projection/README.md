# agent-rule-projection

## What it does

Keeps one rule source per package and projects it into the filename each coding
agent expects, and reports rule documents that have started holding progress
notes, task lists or changelogs.

## Runtime support

| Runtime     | Supported | Measured on              |
| ----------- | --------- | ------------------------ |
| Claude Code | yes       | 2.1.251                  |
| Codex CLI   | yes       | 0.151.0                  |
| Grok CLI    | untested  | manifest reads on 1.0.13 |
| Gemini CLI  | untested  | manifest reads on 0.57.0 |

The scripts are plain Node and run anywhere; the skill is the one surface all
four runtimes read.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install agent-rule-projection@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add agent-rule-projection@modootoday
```

Gemini CLI has no marketplace. Clone the repository and link the directory:

```
gemini extensions link <repo>/plugins/agent-rule-projection
```

No hooks, so nothing needs trusting. Restart the session to pick up the skill.

## What it registers

| Kind   | Name                  | Detail                                                 |
| ------ | --------------------- | ------------------------------------------------------ |
| skill  | `rule-layering`       | one source, several names; what belongs in each document |
| script | `scripts/lint.mjs`    | reports role violations and broken or missing projections |
| script | `scripts/project.mjs` | plans and, with `--write`, creates or repairs projections |

## Failure mode

**fail-open for the lint**: it reports and exits zero. A finding is information,
not this tool's failure, and a linter that stops the build over a documentation
shape gets removed.

**The writer changes nothing by default.** `project.mjs` prints a plan; only
`--write` touches the filesystem. It refuses to replace a real file with a link,
because that file holds content this tool did not write.

## Configuration and how to disable

Optional `agent-rule-projection.json` at the root:

```json
{
  "sourceDir": ".agent/rules",
  "thin": "PACKAGE.RULE.md",
  "full": "PACKAGE.md",
  "projections": { "CLAUDE.md": "thin", "AGENTS.md": "full", "GEMINI.md": "thin" }
}
```

The filenames are yours. This plugin does not decide what your rule files are
called, only that one is the source and the rest point at it.

## Data written

The lint writes nothing. The writer creates symbolic links in package roots, and
only with `--write`.

## Verify

```
node scripts/lint.mjs .
node scripts/project.mjs .            # plan only
node scripts/project.mjs . --write    # apply
```

Prove it can fail: delete one projection and run the lint again; it must report
`missing`. Then run the writer twice and confirm the second run plans nothing.

## License

MIT
