# brand-assets

## What it does

Brand work that decides something: visual directions argued before drawing, a tokens.json every asset reads, and QA of the rendered asset before it is published.

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
claude plugin install brand-assets@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add brand-assets@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `visual-concept-sparring` | two or three visual directions that differ in more than colour, each with its case against, narrowed to one test |
| skill | `brand-token-kit` | one tokens.json traced to sources, with contrast checked and guesses marked |
| skill | `asset-qa-review` | rendered assets checked for clipping, contrast, logo misuse, forbidden patterns and licences before publishing |

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
Help me decide the visual direction for our bakery's Instagram posts.
```

The plugin ships an eval suite (`claude plugin eval plugins/brand-assets --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `bakery-visual-directions` | visual-concept-sparring | 0.00 | 1.00 | 3 |
| `hex-to-rgb-not-brand` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `qa-render-report` | asset-qa-review | 1.00 | 1.00 | 2 |
| `tokens-from-guide` | brand-token-kit | 1.00 | 1.00 | 2 |

brand-token-kit and asset-qa-review show no lift yet: the baseline passed their cases. Their cases stay as regression checks.

Re-run 20261004 with smaller models answering (`--model`), mean score without and with the plugin over the same cases, 2 runs per arm: brand-token-kit and asset-qa-review: Haiku 0.00 to 0.00, Sonnet 1.00 to 1.00. Haiku fails these cases with or without the skill, so the skills do not yet carry a smaller model through them.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
