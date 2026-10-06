# sales-ops

## What it does

Sales follow-through from the record: forgotten promises recovered from sent email with dates resolved and the quoted line, and CRM framework fields and a follow-up email filled only from call transcript evidence.

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
| skill | `competitive-research-brief` | pasted public-page excerpts turned into a same-rows comparison, every claim tagged with its source and date, stated facts apart from inference, gaps listed; rests on two weak records |
| skill | `sales-call-extraction-followup` | filling CRM framework fields and a follow-up from a call transcript |

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
| `two-competitor-pages` | competitive-research-brief | 0.00 | 1.00 | 2 |
| `discovery-call-no-budget` | sales-call-extraction-followup | 0.00 | 1.00 | 2, Sonnet subject and judge, 20261005 (moved 20261006) |

The second row was measured 20261005 on Claude Code 2.1.289 with Sonnet as subject and judge.

The plugin reads only the emails you supply and sends nothing.

## License

MIT
