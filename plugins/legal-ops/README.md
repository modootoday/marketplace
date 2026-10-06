# legal-ops

## What it does

Draft billing time entries from a day's work notes that follow the client billing guidelines the user pastes, keeping the stated total, citing the rule behind each change and listing entries the guidelines would reject.

This plugin is a preview: OCR and transcript review lists and the other legal-ops skills are available to signed-in users.

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
Turn today's work notes into time entries that follow this client's billing guidelines.
```

The plugin ships an eval suite (`claude plugin eval plugins/legal-ops --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `block-billed-day-entries` | legal-time-entry-client-rules | 0.00 | 1.00 | 2, Sonnet subject and judge (20261005) |

The output is a set of draft entries for a person to review. It is not legal advice and it does not
decide what is billable.

## License

MIT
