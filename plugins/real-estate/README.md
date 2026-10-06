# real-estate

## What it does

Screening and records for property work: listings compared with a buyer's must-haves with unknowns kept unknown, room layouts checked against fixed structure, and a tenant's deposit or move-out dispute arranged as a dated, referenced evidence packet with no legal conclusions.

Bylaw and ordinance condition checks are available to signed-in users.

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
claude plugin install real-estate@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add real-estate@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `property-candidate-screening` | listings compared with must-have, trade-off and nice-to-have requirements, each marked met, not met or UNKNOWN, with a viewing sheet per property |
| skill | `room-layout-fixed-structure-check` | a fixed-structure table of walls, openings and door swing marked given, derived or not given, furniture placed by coordinates from stated sizes with clearance arithmetic, and a moved-appeared-vanished comparison of any layout or render; rests on one moderate record |
| skill | `tenant-dispute-evidence-packet` | a deposit or move-out dispute arranged as a timeline, condition comparison, amounts with lease clause and receipts, deadline status and missing evidence |

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
Compare these three listings against my must-haves: two bedrooms, parking, under 30 minutes to work.
```

The plugin ships an eval suite (`claude plugin eval plugins/real-estate --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `parking-must-have-unknown` | property-candidate-screening | 0.00 | 1.00 | 2 |
| `room-layout-fixed-table` | room-layout-fixed-structure-check | 0.00 | 1.00 | 2, Opus subject and judge, both arms, 20261005 (skill fired 2 of 2; earlier Sonnet round stayed at 0.50) |
| `carpet-deposit-packet` | tenant-dispute-evidence-packet | 0.25 | 1.00 | 2 per arm, Sonnet subject and judge, 20261006 (moved 20261006) |

Results are screening aids and records, not advice. The skills do not recommend a purchase, and the
evidence packet draws no legal conclusion: an attorney, advisor or tenant body decides what it supports.

## License

MIT
