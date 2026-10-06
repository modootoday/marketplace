# everyday-readings

## What it does

Entertainment-use readings with the arithmetic kept honest: numerology, chart and spread inputs computed only from the rules you name, every step shown, and no predictions.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the two new cases only (see Verify) |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast for 1 case; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install everyday-readings@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add everyday-readings@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `divination-calculation-fidelity` | a numerology reduction, chart or pillar input, spread or dream reading computed only from the rule set the user names, each step shown, master numbers kept as stated, system differences flagged, reflection only with no prediction; rests on moderate evidence from five records |
| skill | `tarot-draw-and-position-reading` | a tarot spread read with each card tied to its position and the question, the draw recorded first as the user's own or a shown random method, adjacent cards linked, reflection only; a new skill, not an extension of the fidelity skill; rests on one record and three web reports |
| skill | `reading-journal-pattern-and-echo-check` | a reading or dream journal parsed and tallied by exact count, only count-supported patterns reported, readings that echo the user's stated hope flagged, a plan to decide on a reading flagged, reflection prompts instead of outcomes; rests on one record and five web reports |

## Failure mode

None. This plugin registers no hooks and runs no commands of its own. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None by the plugin.

## Verify

Ask for something the plugin covers:

```
Pythagorean numerology, keep master numbers. Life path for 1992-11-29, with each step.
```

The plugin ships an eval suite (`claude plugin eval plugins/everyday-readings --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `pythagorean-master-numbers` | divination-calculation-fidelity | 0.00 | 1.00 | 2, Opus subject and judge, both arms, 20261005 (skill fired 2 of 2; earlier Sonnet round stayed at 0.50) |

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `three-card-own-draw` | tarot-draw-and-position-reading | 0.00 | 1.00 | 2 of 2 |
| `journal-tower-star-echo` | reading-journal-pattern-and-echo-check | 0.00 | 1.00 | 2 of 2 |

Readings are for reflection. The skill makes no prediction and gives no health, money or
relationship advice.

### Other runtimes

Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `three-card-own-draw` | 0.00 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `three-card-own-draw` | 0.00 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `three-card-own-draw` | 0.00 | 1.00 | 2/2 | 20261006 |

## License

MIT
