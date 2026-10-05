# events-travel

## What it does

Day plans that survive arithmetic: run-of-show, travel and family days built from fixed bookings, opening hours, travel time and protected rest, with buffers and backups.

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
claude plugin install events-travel@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add events-travel@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `constrained-day-schedule` | a one-day plan or re-plan worked from fixed times, opening hours, travel legs and protected blocks, every item checked against its hours, with buffers and backups |

## Failure mode

None. This plugin registers no hooks and runs no commands of its own. It cannot block, slow
or interrupt anything.

## Configuration and how to disable

No configuration. Disable it the way your runtime disables plugins.

## Data written

None by the plugin.

## Verify

Ask for something the plugin covers:

```
Replan our day: nap 13:00-15:00, dinner 18:30, and the museum we planned is closed.
```

The plugin ships an eval suite (`claude plugin eval plugins/events-travel --no-publish`).
Measured 20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of
runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `museum-closed-nap-day` | constrained-day-schedule | 0.00 | 0.50 | 2 |
| `museum-closed-nap-day` (Opus) | constrained-day-schedule | 0.00 | 1.00 | 2, Opus subject and judge |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
