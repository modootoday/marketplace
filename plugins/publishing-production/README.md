# publishing-production

## What it does

Pre-release checks for books going to print and ebook: typeset text diffed against the approved manuscript, print and EPUB rules kept apart, and automated accessibility results paired with the manual items they cannot prove.

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

The plugin ships an eval suite (`claude plugin eval plugins/publishing-production --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `print-epub-proof-check` | book-layout-proof-and-epub-check | 0.00 | 1.00 | 2 |

The skill rests on three evidence records and checks only what the user pastes; it does not certify
accessibility.

## License

MIT
