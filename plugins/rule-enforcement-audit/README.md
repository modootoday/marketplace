# rule-enforcement-audit

## What it does

Counts the agent rules a project has written down, counts the places that would
actually stop a violation, and lists the ones that hold only while someone
remembers them.

## Runtime support

| Runtime     | Supported | Measured on |
| ----------- | --------- | ----------- |
| Claude Code | yes       | 2.1.251     |
| Codex CLI   | yes       | 0.151.0     |
| Grok CLI    | yes       | 1.0.13      |
| Gemini CLI  | yes       | 0.57.0      |

The audit is a script that runs anywhere; the skill is the one surface all four
runtimes load. No hooks, so nothing here depends on a runtime's hook contract.

## Install

```
claude plugin marketplace add modootoday/marketplace
claude plugin install rule-enforcement-audit@modootoday
```

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add rule-enforcement-audit@modootoday
```

```
grok plugin marketplace add modootoday/marketplace
grok plugin install rule-enforcement-audit --trust
```

Gemini CLI: clone and
`gemini extensions link <repo>/plugins/rule-enforcement-audit --consent`.

## What it registers

| Kind   | Name                | Detail                                                     |
| ------ | ------------------- | ----------------------------------------------------------- |
| skill  | `rule-enforcement`  | when to make a rule a check, keep it as guidance, or delete it |
| script | `scripts/audit.mjs` | the inventory and the report                                  |

It reads `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.cursorrules`, copilot
instructions and rule directories for statements that forbid or require
something, and reads hook configuration from settings files, `hooks.json` and
plugin directories.

## It does not guess the mapping

Matching a sentence to a hook is exactly the judgement a tool gets wrong, and a
wrong map reports coverage that does not exist. So the audit counts and lists;
you decide once, in `rule-enforcement.json`, and it tells you when new rules
appear unjudged.

```
node scripts/audit.mjs .            # report
node scripts/audit.mjs . --init     # seed the map with every rule unmapped
node scripts/audit.mjs . --json     # machine-readable
```

## Failure mode

**fail-open, and it never blocks anything.** It exits zero even when every rule
is unenforced, because that is the normal state of a project and not a failure
of this tool.

## Configuration and how to disable

`rule-enforcement.json` holds your decisions and is the only configuration.
There is nothing to disable: the plugin runs only when you run it.

## Data written

Only `rule-enforcement.json`, and only with `--init`. No network.

## Verify

```
node scripts/audit.mjs .
```

Run it on a repository you know. The count of enforcement points should match
the hooks you can name; if it is higher, the tool is reading configuration you
forgot you had, which is itself the finding.

Measured on the repository this plugin was written in: 1,415 rule-shaped
statements against 7 enforcement points.

## Security

Its output is a map of where your project is unguarded. That is exactly what it
is for, and it is also a document worth thinking about before publishing: a list
of the rules that hold only while someone remembers them is a list of the rules
nothing will stop you breaking.

It reads rule documents and configuration and writes one file, and only with
`--init`. No network.

It reports what exists. A rule it counts as enforced is enforced only as well as
the thing enforcing it, and this audit does not test that thing.

## License

MIT
