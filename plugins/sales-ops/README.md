# sales-ops

## What it does

Recover forgotten promises from sent-email history: commitments with dates resolved against each email, checked for completion, and listed with the quoted line.

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
claude plugin install sales-ops@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add sales-ops@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `email-history-commitment-mining` | sent-email history mined for promised follow-ups, each marked done, open or unclear with the completing message or the quoted line, internal and automated senders excluded |

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
Today is 2025-03-01. Here are my sent emails; list the follow-ups I promised and which are still open.
```

The plugin ships an eval suite (`claude plugin eval plugins/sales-ops --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `quote-promise-open-loops` | email-history-commitment-mining | 0.00 | 1.00 | 2 |

The plugin reads only the emails you supply and sends nothing.

## License

MIT
