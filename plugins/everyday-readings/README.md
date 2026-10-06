# everyday-readings

## What it does

Entertainment-use readings with the arithmetic kept honest: numerology, chart and spread inputs computed only from the rules you name, every step shown, and no predictions.

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

Readings are for reflection. The skill makes no prediction and gives no health, money or
relationship advice.

## License

MIT
