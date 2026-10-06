# publishing-production

## What it does

Checks for books before release: typeset text diffed against the approved manuscript, print and EPUB rules kept apart, automated accessibility results paired with the manual items they cannot prove, a project style sheet applied across chapters, index locators checked against page proofs, and new chapters of long fiction checked against the author's canon ledger and outline with every ruling left to the author.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes, for the cases listed in Verify | measured 20261006 with gpt-6.1-sol |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install publishing-production@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add publishing-production@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `book-layout-proof-and-epub-check` | typeset text diffed against the approved manuscript by page and edition, print and EPUB checked against separate rules, automated accessibility results listed beside the manual items still unverified |
| skill | `book-style-sheet-copyedit` | a project style sheet built from counted variants and the named style manual, applied chapter by chapter with a located change log, singular they left alone, a re-scan to prove no variant remains (rests on five records, medium evidence) |
| skill | `index-locator-verification` | every index locator searched on its page in the proofs and marked found, not found or off by one, range gaps queried, see and see also targets resolved, counts and a fix list (rests on two records, low confidence) |
| skill | `series-treatment-causal-review` | a series bible compressed to a length limit with each episode's cause, choice and consequence kept, missing motivation marked as questions, and a cut list; rests on one moderate record |
| skill | `manuscript-continuity-audit` | new chapters checked against a canon ledger and outline, with repeated information, unmotivated actions and tense or POV slips reported and the author's prose left alone |

The two fiction skills came from the former `fiction-editing` plugin, now merged here.

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
I exported a Word manuscript to print PDF and EPUB with the same template. Check the layout rules for each and what the accessibility check cannot prove.
```

The plugin ships an eval suite (`claude plugin eval plugins/publishing-production --no-publish`). Scores
are the share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject / judge |
| --- | --- | --- | --- | --- | --- |
| `print-epub-proof-check` | book-layout-proof-and-epub-check | 0.00 | 1.00 | 2 | Sonnet / Sonnet, Claude Code 2.1.289, 20261005 |
| `chapter-canon-drift` | manuscript-continuity-audit | 0.00 | 1.00 | 2 | Sonnet / Sonnet, Claude Code 2.1.289, 20261005 |
| `bible-two-page-motivation` | series-treatment-causal-review | 0.00 | 1.00 | 2 | Opus / Opus, 20261006 (after one SKILL.md edit: questions propose no candidate reason, no framing phrases in the treatment; earlier Opus run 0.75, Sonnet rounds below 1.00) |
| `style-sheet-number-variants` | book-style-sheet-copyedit | 0.00 | 1.00 | 2 | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |
| `index-locators-against-proofs` | index-locator-verification | 0.00 | 1.00 | 2 | Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006 |

The layout skill rests on three evidence records and checks only what the user pastes; it does not certify
accessibility. A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

### Other runtimes

Both arms, 2 runs per arm, 3 judge votes, the model as subject and judge. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `style-sheet-number-variants` | 0.00 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `style-sheet-number-variants` | 0.00 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `style-sheet-number-variants` | 0.00 | 1.00 | 2/2 | 20261006 |

## License

MIT
