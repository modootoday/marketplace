# events-travel

## What it does

Day plans, seating plans, deadline registers, hotel shortlists and route checks that survive arithmetic: fixed bookings, opening hours, travel time, supplied rules and official sources, with buffers, backups and unverified items marked.

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
| skill | `seating-constraint-plan` | a table plan from the keep-apart, together and capacity rules supplied, each rule verified, conflicts reported instead of bent, nothing inferred about guests (rests on one record) |
| skill | `deadline-register-from-documents` | a deadline register from pasted kit documents with owner, zone and quoted source line per date, plus a version diff (rests on one record) |
| skill | `traveler-fit-shortlist` | a hotel or trip shortlist from a supplied approved list against the traveler's stated conditions, availability and price left to confirm |
| skill | `route-plan-official-source-check` | a transit or hiking route checked segment by segment against the official sources supplied, closed lines excluded, the rest marked unverified (two records) |

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
| `seating-rules-conflict` (Opus) | seating-constraint-plan | 0.25 | 1.00 | 2 per arm, Opus subject and judge, both arms, 20261005 |
| `deadline-kit-v2-diff` | deadline-register-from-documents | 0.00 | 1.00 | 2 per arm, Sonnet subject and judge, 20261006 |
| `hotel-shortlist-family` | traveler-fit-shortlist | 0.00 | 0.67 | 2, Sonnet |
| `hotel-shortlist-family` (Opus) | traveler-fit-shortlist | 0.25 | 1.00 | 2, Opus subject and judge |
| `closed-line-commute-hike` | route-plan-official-source-check | 0.00 | 1.00 | 2, Sonnet |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
