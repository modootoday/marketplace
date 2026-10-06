# household-admin

## What it does

Household paperwork and planning on the facts a person supplies: pay-period schedules where every dollar is placed once, receipts split so the parts sum to the total, a small-step week for chores, a ledger of home service events, total-cost comparisons of personal offers, a trading journal checked against your own written rules, and insurance bills, EOBs and payments reconciled per claim.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | no | with arm below 1.00 on grok-4.7 and grok-4.7-build-fast for 1 case, 20261006; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.1-pro-preview and gemini-3.8-flash for 1 case; see Other runtimes |

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
| skill | `small-step-chore-sequencing` | a dated week of physical actions that starts with the minimum usable state, fits the minutes per day the person gave, meets their deadlines and adds no chore they did not list; rests on 3 first-person records |
| skill | `household-event-ledger-from-records` | a one-row-per-event ledger from pasted service emails or notes (completed, scheduled, cancelled) with quoted sources, unknowns kept unknown and next-due dates only from a stated interval; rests on 2 records |
| skill | `consumer-offer-total-cost-comparison` | totals for bundled personal offers (car with trade-in, per-GB against flat phone plan) from written quotes and the person's usage, with arithmetic shown and unverified items marked; no advice; rests on 2 weak records |
| skill | `paycheck-cycle-obligation-schedule` | a table per pay date from the user's own numbers: bills placed by due date, minimums before extra payments, interest recomputed with a stated formula, future expenses set aside per period, receipts split to the total; arithmetic only, no financial advice |
| skill | `trading-journal-rule-deviation-log` | a trade journal checked against the user's own written rules, deviations only, no trade advice |
| skill | `insurance-paper-trail-ledger` | a policyholder's bills, EOBs, payments and insurer letters reconciled per claim, with changed reasons flagged |

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
| `small-step-chore-first-week` | small-step-chore-sequencing | 0.00 | 1.00 | 2 | Opus, Opus (20261005); Sonnet judge gave 0.50 with 2 runs after two fix rounds |
| `home-service-ledger` | household-event-ledger-from-records | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005) |
| `offer-total-cost` | consumer-offer-total-cost-comparison | 0.50 | 1.00 | 2 | Sonnet, Sonnet (20261005) |
| `journal-rule-deviations` | trading-journal-rule-deviation-log | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005; moved 20261006) |
| `medical-eob-payment-ledger` | insurance-paper-trail-ledger | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005; moved 20261006) |

The `offer-total-cost` baseline partly passes (the car arithmetic), so its Without score is 0.50 and
its every-grader pass rate is 0.00.

### Other runtimes

Gemini CLI and Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Gemini CLI | gemini-3.1-pro-preview | `biweekly-card-plan` | 0.00 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `biweekly-card-plan` | 0.00 | 1.00 | 2/2 | 20261006 |
| Grok CLI | grok-4.7 | `biweekly-card-plan` | 0.00 | 0.00 | 2/2 | 20261006 |
| Grok CLI | grok-4.7-build-fast | `biweekly-card-plan` | 0.00 | 0.50 | 2/2 | 20261006 |

## License

MIT
