# fitness

## What it does

Workout log tables and equipment substitutions by movement pattern, with every load change left for a trainer to approve.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the three new cases only (see Verify) |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast for 1 case; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

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
| skill | `macro-target-arithmetic-check` | calorie and macro targets from a named formula with inputs shown, calories rebuilt from grams at 4, 4 and 9, each meal and day reconciled with the target and flagged beyond 5 percent; clinical diets referred out; rests on three web reports |
| skill | `wearable-export-weekly-summary` | a pasted wearable export as a weekly table of measured values kept apart from vendor composite scores, trends only from three or more weeks, no injury or medical inference; rests on four web reports |
| skill | `running-plan-load-check` | a running plan as a week table with weekly jump, long-run share, cutback, taper and peak long run flagged against quoted rules of thumb, and paces taken only from a dated result by a named method; rests on two web reports (weak to medium) |

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

The first skill rests on two first-person reports.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `macro-cut-plan-reconcile` | macro-target-arithmetic-check | 0.00 | 1.00 | 2 of 2 |
| `watch-export-two-weeks` | wearable-export-weekly-summary | 0.00 | 1.00 | 2 of 2 |
| `marathon-plan-load` | running-plan-load-check | 0.00 | 1.00 | 2 of 2 |

The output is a log summary and options for a trainer to review. It gives no medical or injury advice.

### Other runtimes

Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `marathon-plan-load` | 0.00 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `marathon-plan-load` | 0.00 | 0.50 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `marathon-plan-load` | 0.00 | 0.75 | 2/2 | 20261006 |

## License

MIT
