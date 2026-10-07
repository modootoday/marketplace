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
| skill | `icalendar-occurrence-import-check` | recurring ICS source types, zones and original occurrence identities compared with bounded supplied import reports |
| skill | `constrained-day-schedule` | a one-day plan or re-plan worked from fixed times, opening hours, travel legs and protected blocks, every item checked against its hours, with buffers and backups |
| skill | `seating-constraint-plan` | a table plan from the keep-apart, together and capacity rules supplied, each rule verified, conflicts reported instead of bent, nothing inferred about guests (rests on one record) |
| skill | `deadline-register-from-documents` | a deadline register from pasted kit documents with owner, zone and quoted source line per date, plus a version diff (rests on one record) |
| skill | `traveler-fit-shortlist` | a hotel or trip shortlist from a supplied approved list against the traveler's stated conditions, availability and price left to confirm |
| skill | `route-plan-official-source-check` | a transit or hiking route checked segment by segment against the official sources supplied, closed lines excluded, the rest marked unverified (two records) |

The newly added `icalendar-occurrence-import-check` reviews recurring ICS source types, zones and original occurrence identities compared with bounded supplied import reports. It ships three self-contained synthetic cases (normal, exception and missing input). These cases were compared as supplied-fixture reasoning; the results and limitations are recorded under Verify. Existing sibling-skill runtime results do not verify this skill.

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

### Added skill reasoning comparisons

The added `icalendar-occurrence-import-check` was measured on 2026-10-07 with Codex CLI 0.160.1, gpt-6.1-sol subject and judge, two runs per arm and three judge votes, in a read-only empty application workspace. All three initial comparisons and their raw scores are retained. There is no admitted applicable effect case; this skill's minimum-effect requirement remains unmet. Regression agreement and OPEN judging interpretations do not establish an effect. No application workflow or actual artifact transformation was executed.

| Case | Skill | Without | With | Runs per arm | Interpretation |
| --- | --- | --- | --- | --- | --- |
| `ical-occurrence-zone-move` | icalendar-occurrence-import-check | 1.00 | 1.00 (open) | 2 | Regression only: both arms meet the substantive supplied-fixture contract. |
| `ical-all-day-exdate-type` | icalendar-occurrence-import-check | 1.00 | 1.00 (open) | 2 | Regression only: both arms meet the substantive supplied-fixture contract. |
| `ical-floating-missing-consumer` | icalendar-occurrence-import-check | 1.00 | 1.00 (open) | 2 | Regression only: both arms meet the substantive supplied-fixture contract. |

Reproduce one reasoning comparison from the marketplace root:

```
node plugins/skill-factory/skills/codex-plugin-eval/scripts/codex-plugin-eval.mjs plugins/events-travel --case ical-occurrence-zone-move --runs 2 -j 2 --model gpt-6.1-sol --judge-model gpt-6.1-sol --judge-votes 3 --auth proxy --isolation bwrap --threshold 0 --output-dir /tmp/ical-occurrence-zone-move --json /tmp/ical-occurrence-zone-move.json
```

### Other runtimes

Codex reasoning rows for the added skill only. The (open) marker excludes them from verified-runtimes inference; existing measured sibling-skill records retain their scope. No new runtime badge is supported. Other runtimes remain untested for the added skill.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `ical-occurrence-zone-move` | icalendar-occurrence-import-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `ical-all-day-exdate-type` | icalendar-occurrence-import-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `ical-floating-missing-consumer` | icalendar-occurrence-import-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |

Measurements used subscription Codex and no metered runtimes. USD cost and token prices were null, so USD conversion is unavailable. Cached input is a subset of input tokens; reasoning output is included in output tokens.

## License

MIT
