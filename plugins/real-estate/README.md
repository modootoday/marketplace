# real-estate

## What it does

Screening for property work: bylaw conditions tested with quoted sections and shown arithmetic, and listings compared with a buyer's must-haves with unknowns kept unknown.

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
| skill | `ordinance-conditions-qa` | a lot or use tested against supplied bylaw text: quoted sections, numeric conditions with the arithmetic, effective date, overlay and variance clauses, screening only |
| skill | `property-candidate-screening` | listings compared with must-have, trade-off and nice-to-have requirements, each marked met, not met or UNKNOWN, with a viewing sheet per property |

| skill | `room-layout-fixed-structure-check` | a fixed-structure table of walls, openings and door swing marked given, derived or not given, furniture placed by coordinates from stated sizes with clearance arithmetic, and a moved-appeared-vanished comparison of any layout or render; rests on one moderate record |

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
Here is the R2 zone text (minimum lot width 15 m). My lot is 14 m wide. Does it pass?
```

The plugin ships an eval suite (`claude plugin eval plugins/real-estate --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `bylaw-width-coverage` | ordinance-conditions-qa | 0.00 | 1.00 | 2 |
| `parking-must-have-unknown` | property-candidate-screening | 0.00 | 1.00 | 2 |
| `room-layout-fixed-table` | room-layout-fixed-structure-check | 0.00 | 1.00 | 2, Opus subject and judge, both arms, 20261005 (skill fired 2 of 2; earlier Sonnet round stayed at 0.50) |

Results are screening aids. A municipal planner confirms any ordinance result, and the skills do
not recommend a purchase.

## License

MIT
