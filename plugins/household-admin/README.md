# household-admin

## What it does

Household paperwork arithmetic on the numbers a person supplies: pay-period schedules where every dollar is placed once, and receipts split so the parts sum to the total.

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
claude plugin install household-admin@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add household-admin@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `paycheck-cycle-obligation-schedule` | a table per pay date from the user's own numbers: bills placed by due date, minimums before extra payments, interest recomputed with a stated formula, future expenses set aside per period, receipts split to the total; arithmetic only, no financial advice |

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
I am paid every second Friday, 1,800 net. Rent 1,100 is due on the 1st and I have one card with a 70 minimum. Plan my next 5 pay dates.
```

The plugin ships an eval suite (`claude plugin eval plugins/household-admin --no-publish`).
Scores are the share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- |
| `biweekly-card-plan` | paycheck-cycle-obligation-schedule | 0.00 | 1.00 | 2 | Opus, Opus (20261005); Sonnet judge gave 0.50 and 0.00 on 2 runs |

The new skill has one case; two more are needed for the three-case release gate.

## License

MIT
