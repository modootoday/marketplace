# presentation

## What it does

Decks that argue something: a storyline built from the answer down, with one full-sentence claim per slide so the titles alone tell the story.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None.

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

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
