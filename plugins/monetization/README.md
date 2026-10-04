# monetization

## What it does

Payments that do not lose or double money: a Toss Payments integration checked against the official docs, and refunds and disputes handled by looking up the state before acting once.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Optional: the Toss Payments integration guide MCP server, so API details are cited from the docs. Without it the skill says which statements it could not check.

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
| skill | `toss-payments-integration` | Toss Payments confirm, webhook, virtual account, cancel and billing code reviewed against the official docs |
| skill | `refund-dispute-ops` | refunds, partial refunds and disputes handled by reading the state first, acting once with an idempotency key, and notifying once |

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
Review my Toss Payments success handler: it confirms with the amount from the query string.
```

The plugin ships an eval suite (`claude plugin eval plugins/monetization --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `partial-refund-virtual-account` | refund-dispute-ops | 1.00 | 1.00 | 3 |
| `refund-during-dispute` | refund-dispute-ops | 1.00 | 1.00 | 2 |
| `refund-maybe-failed` | refund-dispute-ops | 1.00 | 1.00 | 2 |
| `review-confirm-handler` | toss-payments-integration | 0.50 | 1.00 | 2 |
| `vat-math-not-payments` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `virtual-account-shipped-early` | toss-payments-integration | 1.00 | 1.00 | 2 |

refund-dispute-ops shows no lift yet: the baseline model already looked up the state and kept the idempotency key in every case tried. Its cases stay as regression checks.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
