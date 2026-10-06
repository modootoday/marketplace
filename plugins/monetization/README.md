# monetization

## What it does

Prices framed as hypotheses with a test: who pays, for what unit of value, against which alternative, what result would change the decision, and the cheapest test before anyone builds a pricing page.

Payment integrations, refunds and disputes, payment provider choice and USD price localization are available to signed-in users.

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
claude plugin install monetization@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add monetization@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `pricing-hypothesis` | a price framed as a testable hypothesis: buyer, unit, today's alternative, a prediction with a threshold, and the cheapest test |

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
We're launching a scheduling app for small hair salons. Help me decide the monthly price.
```

The plugin ships an eval suite (`claude plugin eval plugins/monetization --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `price-feels-right` | pricing-hypothesis | 0.00 | 1.00 | 2 |

The skill has one case; two more are needed for the three-case release gate.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
