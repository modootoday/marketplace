# presentation

## What it does

Decks that argue something and survive review: a storyline built from the answer down, pptx files filled from the template's own layouts with native charts, a QA pass for numbers that disagree, question rehearsal for the room, and edits that keep content and hand fixes.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | untested | the one case passes with and without the plugin on grok-4.7 and grok-4.7-build-fast, 20261006; see Other runtimes |
| Gemini CLI | untested | the one case passes with and without the plugin on gemini-3.1-pro-preview and gemini-3.8-flash, 20261006; see Other runtimes |

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
| skill | `stakeholder-question-rehearsal` | hard questions for a plan by what they attack, evidence labelled data, assumption or missing, logic gaps and short answers (one evidence record) |
| skill | `deck-edit-preservation-and-source-sync` | a per-slide preservation list before an edit, a diff after it, hand fixes written back to the content source, and a warning before regeneration (two evidence records) |

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
| `rehearse-expansion-plan` | stakeholder-question-rehearsal (one record) | 0.00 | 1.00 | 2 |
| `edit-slide-4-preservation` | deck-edit-preservation-and-source-sync (two records) | 0.25 | 1.00 | 2 |

The last two rows were measured 20261005 with Sonnet as subject and judge, both arms, after each skill
gained a `references/worked-example.md` whose scenario differs from the eval prompt. Before that, Sonnet
stayed at 0.50 after two fix rounds (rehearsal answers asserted claims the plan does not make; the edit
case sometimes omitted the diff plan). One rehearsal run scored 0.75 on a single judge vote before the
recorded 1.00 run.

deck-qa-review shows no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks. The Codex scores below add a case with lift for deck-qa-review.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

### Other runtimes

Gemini CLI and Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Gemini CLI | gemini-3.1-pro-preview | `inconsistent-numbers` | 1.00 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `inconsistent-numbers` | 1.00 | 1.00 | 2/2 | 20261006 |
| Grok CLI | grok-4.7 | `inconsistent-numbers` | 1.00 | 1.00 | 2/2 | 20261006 |
| Grok CLI | grok-4.7-build-fast | `inconsistent-numbers` | 1.00 | 1.00 | 2/2 | 20261006 |

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `growth-axis-unsourced-claims` | deck-qa-review | 0.50 | 1.00 | 2 of 2 |

## License

MIT
