# fitness

## What it does

Workout log tables and equipment substitutions by movement pattern, with every load change left for a trainer to approve.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install fitness@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add fitness@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `workout-log-progression-substitution` | a pasted workout log structured into a sets, reps and load table with per-lift change, substitutes chosen by movement pattern from the equipment the user lists, load changes marked as suggestions for a trainer to approve, and any pain or injury note passed to a qualified professional without advice |

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
Tabulate my squat and bench log and suggest substitutes for a home with dumbbells only; my trainer approves any load changes.
```

The plugin ships an eval suite (`claude plugin eval plugins/fitness --no-publish`). Scores are the
share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- |
| `home-equipment-squat-bench` | workout-log-progression-substitution | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005) |

The skill rests on two first-person reports. The skill has one case; two more are needed for the three-case release gate.

The output is a log summary and options for a trainer to review. It gives no medical or injury advice.

## License

MIT
