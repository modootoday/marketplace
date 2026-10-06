# land-growing

## What it does

Garden and small-farm plans checked against measured site facts: one site brief, bed layout with spacing and area used, a sowing and harvest calendar bounded by the stated frost dates, soil and light constraints, a water test table with units and a confirm list for the grower. It plans and checks; it does not diagnose pests or promise yields.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install land-growing@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add land-growing@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `garden-plan-constraint-check` | a site brief, layout table, frost-bounded calendar, soil and light fit table and a confirm list, with guesses marked and the grower named as the one who verifies local suitability |

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
My bed is 4 m by 1.2 m with 5 hours of sun, last frost 20 April, first frost 15 October and pH 7.8 clay. Plan tomatoes, lettuce and hosta.
```

The plugin ships an eval suite (`claude plugin eval plugins/land-growing --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `raised-bed-alkaline-clay` | garden-plan-constraint-check | 0.25 | 1.00 | 2 |

The skill rests on five single-record first-person reports from one growing domain; treat the lift as moderate evidence.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
