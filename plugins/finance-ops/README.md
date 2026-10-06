# finance-ops

## What it does

Supplied financial figures checked by arithmetic: bank statement rows tied out to opening and closing balances with a file inventory named from evidence, and cash flow movements bridged by driver with a named residual and a drilled expense spike. It checks numbers you give it; it gives no tax, accounting or investment advice.

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
claude plugin install finance-ops@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add finance-ops@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `financial-document-intake-tieout` | statement text turned into rows with original text kept, an opening plus rows versus closing tie-out, and files named from header evidence with unreadable ones left open |
| skill | `cashflow-variance-bridge` | a month-over-month cash flow bridge that sums with a named residual, an expense spike drilled by vendor, causes marked evidenced or hypothesis, and a re-runnable filter |

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
Cash from operations fell from 410k to 285k and Travel went from 12k to 48k. Bridge the change and explain the spike.
```

The plugin ships an eval suite (`claude plugin eval plugins/finance-ops --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `statement-and-scans-intake` | financial-document-intake-tieout | 0.25 | 1.00 | 2 |
| `travel-spike-cashflow-bridge` | cashflow-variance-bridge | 0.00 | 1.00 | 2 |

Each skill rests on two anonymized reports (moderate evidence). Both skills check supplied figures only and give no tax, accounting or investment advice.

## License

MIT
