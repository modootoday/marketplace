# agent-orchestration

## What it does

Procedures for coordinating subagents, from one helper to a scripted fan-out: whether and how widely to
delegate, a brief a subagent can succeed from, partitioned writes with a safe merge, checking what a
subagent claims, fair with-versus-without measurements, and fan-out scripts with caps and resume. The
procedures are runtime-neutral; Claude Code subagents and workflow scripts are used as named examples.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | yes; eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install agent-orchestration@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add agent-orchestration@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `delegation-decision-and-sizing` | zero, one or several agents by task shape, the reason stated, a token multiple, mechanism by who holds the plan, caps and a pilot slice before launch; evidence 7 sources (5 vendor, 1 measured, 1 practitioner) |
| skill | `subagent-brief-and-handback` | objective and done-state, context the agent cannot see, owned write set, field value contracts, stop rule, forbidden shortcuts with a blocked exit, hand-back schema; evidence 5 sources (3 vendor, 2 measured) and 3 observed cases |
| skill | `parallel-write-partitioning-and-merge` | one owner per write, isolation and what it does not cover, per-agent pending files, serial idempotent compare-and-set merge; evidence 6 sources (3 vendor, 3 practitioner) and 2 observed cases |
| skill | `subagent-claim-verification` | load-bearing claims re-measured from artifacts, shortcut checks, independent refutation, verified, refuted and unverified reported apart; evidence 7 sources (4 vendor, 3 measured) and 2 observed cases |
| skill | `eval-comparison-hygiene` | both arms held constant, baselines invalidated by grader edits, references independent of the case, judge strength, reruns, round caps and reserved budget; evidence 4 sources (1 vendor, 3 measured) and 3 observed cases |
| skill | `fan-out-script-design` | discover, pipeline, verify, reduce; deterministic scripts and what a resume reruns, schema hand-backs, caps on heavy tools, pilot slice; evidence 6 sources (5 vendor, 1 practitioner) |

## Failure mode

None. This plugin registers no hooks and runs no commands of its own. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None by the plugin. A skill that produces files writes them only where the user asks.

## Verify

Ask for something the plugin covers:

```
Four agents will edit the same index file in separate worktrees. How should we plan it?
```

The plugin ships an eval suite (`claude plugin eval plugins/agent-orchestration --no-publish`).
Scores are the share of runs that passed every grader, without the plugin and with it, 2 runs per arm:

| Case | Skill | Without | With | Subject and judge |
| --- | --- | --- | --- | --- |
| `agents-for-fix-and-audit` | delegation-decision-and-sizing | 0.00 | 1.00 | Sonnet, Sonnet (20261006) |
| `brief-for-fixture-worker` | subagent-brief-and-handback | 0.00 | 1.00 | Sonnet, Sonnet (20261006) |
| `four-agents-one-routes-file` | parallel-write-partitioning-and-merge | 0.00 | 1.00 | Sonnet, Sonnet (20261006) |
| `five-cases-pass-report` | subagent-claim-verification | 0.00 | 1.00 | Opus, Opus (20261006) |
| `five-cases-pass-report` | subagent-claim-verification | 0.00 | 0.50 (open) | Sonnet, Sonnet (20261006) |
| `skill-uplift-log` | eval-comparison-hygiene | 0.00 | 1.00 | Opus, Opus (20261006) |
| `pytest-migration-script` | fan-out-script-design | 0.00 | 1.00 | Opus, Opus (20261006) |

Measured on Claude Code 2.1.291. The skill fired in every recorded with-arm run. The three Opus rows
stayed below 1.00 on Sonnet after two fix rounds (a strict one-word Sonnet judge on long answers, and
for `five-cases-pass-report` the skill did not fire on Sonnet), so they were recorded on Opus as subject
and judge, both arms. After the `subagent-claim-verification` description was reworded the skill fired
in 2 of 2 Sonnet with-arm runs, but only one passed both graders (0.50), so that Sonnet row is open.
The `agents-for-fix-and-audit` row is a single both-arm Sonnet run (2 runs per arm). On Opus the baseline for `five-cases-pass-report` met one of its two graders in
each run, which is why its without score is a share of full passes (0.00), not of graders.
Each skill has one case; two more are needed for the three-case release gate.

## License

MIT
