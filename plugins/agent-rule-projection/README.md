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
| Grok CLI    | yes       | 1.0.13                   |
| Gemini CLI  | yes       | 0.57.0                   |

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

## Security

A projection is a symbolic link, and a symbolic link is a redirect. Whoever can
write the rule source decides what every agent reading that filename sees, in
every package the projection reaches. That is the point of having one source, and
it is also the whole of the risk: the blast radius of editing one file is every
runtime that reads its projections.

The writer never replaces a real file. A regular file sitting where a link would
go is reported as a skip, with instructions, because replacing it would destroy
content this tool did not write. The only thing it unlinks is a link it would
have created itself.

Nothing happens without `--write`. The lint writes nothing at all.

## License

MIT
