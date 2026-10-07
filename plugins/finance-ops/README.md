# finance-ops

## What it does

Supplied financial figures checked by arithmetic: bank statement rows tied out to opening and closing balances with a file inventory named from evidence, and cash flow movements bridged by driver with a named residual and a drilled expense spike. It checks numbers you give it; it gives no tax, accounting or investment advice.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | named fixture cases measured | added skill only; see Verify |
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

| skill | `qif-date-amount-import-interpretation-check` | Compare QIF exporter date/year and field-specific numeric conventions with independent controls and actual stored importer rows |

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

### Artifact contract fixture measurements

Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and read-only bwrap isolation. All nine comparisons ran serially on supplied synthetic reports. They measure reasoning, not actual LMS execution, bank imports or XLIFF merging. Criteria and measured instructions were unchanged.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `qif-explicit-source-field-match` | qif-date-amount-import-interpretation-check | 1.00 | 1.00 (open) | 2 |
| `qif-date-shift-totals-match` | qif-date-amount-import-interpretation-check | 1.00 | 1.00 (open) | 2 |
| `qif-ambiguous-source-missing` | qif-date-amount-import-interpretation-check | 0.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inferred unmeasured Claude results. Runtime-specific raw scores qualify only where an applicable narrow effect is admitted; regression and OPEN rows remain nonqualifying.

QIF missing supports only reproducible importer name/version/settings collection. All arms already preserve date, century and amount ambiguity, request source conventions, account/currency/sign context, controls and stored rows, and refuse certification. No interpretation or banking diagnosis superiority is established. Both normal and date-shift cases are regression evidence. One normal With reply also opened financial-document-intake-tieout under the reuse instruction; no sole-target execution attribution is claimed.

### Other runtimes: artifact contract fixtures

These rows apply only to the named added skill. Other clients and actual applications remain untested for the addition; historical sibling results retain their scope.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `qif-explicit-source-field-match` | qif-date-amount-import-interpretation-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `qif-date-shift-totals-match` | qif-date-amount-import-interpretation-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `qif-ambiguous-source-missing` | qif-date-amount-import-interpretation-check | 0.00 | 1.00 | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input; reasoning output is included in output. No OPEN row supports a badge.

## License

MIT
