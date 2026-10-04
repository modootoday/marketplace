# presentation

## What it does

Decks that argue something and survive review: a storyline built from the answer down, pptx files filled from the template's own layouts with native charts, and a QA pass for numbers, charts and dates that disagree.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Python 3 with python-pptx, and LibreOffice to render slides for checking, for pptx-template-build. The other skills need nothing.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install presentation@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add presentation@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `deck-storyline` | a deck storyline from the governing answer down, one full-sentence claim per slide, gaps marked |
| skill | `deck-qa-review` | a deck checked for numbers that disagree, charts that do not match their data, wrong weekdays and unsourced claims |
| skill | `pptx-template-build` | pptx files built from the template's layouts and placeholders, with native charts and overflow checked by rendering |

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
Outline our seed pitch deck; current titles are Problem, Market, Product, Team, Ask.
```

The plugin ships an eval suite (`claude plugin eval plugins/presentation --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `table-markdown-not-deck` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `topic-titles-pitch` | deck-storyline | 0.00 | 0.33 | 3 |
| `undecided-expansion-deck` | deck-storyline | 0.50 | 1.00 | 2 |
| `generate-from-template` | pptx-template-build | 0.00 | 1.00 | 2 |
| `inconsistent-numbers` | deck-qa-review | 1.00 | 1.00 | 2 |

deck-qa-review shows no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
