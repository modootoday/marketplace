# legal-ops

## What it does

Review lists for OCR text and machine transcripts: risky numbers, dates, names and speaker turns flagged with locators and left uncorrected for a person to check.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: nothing is required. The skill can run `scripts/transcript-scan.mjs` when node is available and does the same scan by hand otherwise.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install legal-ops@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add legal-ops@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `legal-time-entry-client-rules` | a day's work notes turned into time entries that follow the billing rules the user pastes: one task and one duration per entry, stated total kept, split flagged as an estimate, each change tied to a rule, rejected entries listed; no legal advice (rests on one weak record) |
| skill | `ocr-transcript-risk-flagging` | OCR text or a poor-audio transcript turned into a ranked review list of risky spans, with the original text kept and unintelligible audio marked inaudible; ships a value-type reference and `scripts/transcript-scan.mjs` (needs node) |

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
Review this OCR text of a scanned note for risky spans: "Pt seen 03/l5/2O22. Metformin 5OOO mg daily."
```

The plugin ships an eval suite (`claude plugin eval plugins/legal-ops --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `ocr-dose-date-speaker` | ocr-transcript-risk-flagging | 0.00 | 0.80 | 2 without, 5 with (3 + 2 after the last skill edit) |
| `ocr-dose-date-speaker` (Opus) | ocr-transcript-risk-flagging | 0.00 | 1.00 | 2, Opus subject and judge |
| `block-billed-day-entries` | legal-time-entry-client-rules | 0.00 | 1.00 | 2, Sonnet subject and judge (20261005) |

The output is a review list for a person. It is not legal or medical advice and it does not decide
what a record means.

## License

MIT
