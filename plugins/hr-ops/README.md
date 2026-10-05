# hr-ops

## What it does

HR office arithmetic and drafts checked on the facts the user supplies: aggregate workforce metrics with stated group minimums, sourcing search strings without protected-trait terms, shift hours split by the user's own rules, and policy drafts checked against the user's checklist. Nothing here ranks, scores, screens or profiles individual people.

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
claude plugin install hr-ops@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add hr-ops@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `workforce-metrics-readout` | attrition, turnover and hours or payroll pivots from pasted HR rows: cohort, numerator and denominator defined first, transfers and rehires handled by a stated rule, groups below a minimum size suppressed without leaking the value, row counts reconciled; aggregate only. Rests on two single-person reports |
| skill | `boolean-sourcing-query` | narrow and broad Boolean search strings from stated job requirements, with grouped synonyms, stated exclusions, a platform-limits note, and protected characteristics and their proxies left out with the reason given. Rests on one single-person report |
| skill | `shift-overtime-calculation` | overnight and long shifts split into clock intervals under the rule the user pastes: unpaid breaks removed, stacked premiums shown once in the paid total, the rule restated, payroll owner and local law named as deciders. Rests on one single-person report |
| skill | `policy-draft-gap-review` | a policy draft checked against the user's own checklist: each element quoted or marked missing, contradictions with both sides quoted, owner blanks left open, verification limits and the HR or legal review stated. Rests on three single-person reports |

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
Here are shift times and my overtime rule; split the hours by interval and show the totals.
```

The plugin ships an eval suite (`claude plugin eval plugins/hr-ops --no-publish`). Measured
20261005 on Claude Code 2.1.289; the score is the share of runs that passed every grader,
without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject / judge |
| --- | --- | --- | --- | --- | --- |
| `attrition-by-department-90day` | workforce-metrics-readout | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `boolean-string-no-proxies` | boolean-sourcing-query | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `overnight-shift-premium-intervals` | shift-overtime-calculation | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `absence-policy-gap-review` | policy-draft-gap-review | 0.00 | 1.00 | 2 | Opus / Opus (Sonnet / Sonnet scored 0.50 with the plugin) |

The plugin reads only the text you supply and sends nothing. Its outputs are arithmetic and
checklists for a person to review: local law, payroll, HR and legal review decide.

## License

MIT
