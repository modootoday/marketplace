# data-analytics

## What it does

Numbers that mean what they say: ClickHouse SQL that reads the key and deduplicates correctly, Naver trend data read as ratios, metrics defined once, experiments designed before launch, retention read by cohort, and open survey responses grouped with every response id kept.

## Runtime support

| Runtime     | Supported | Measured on                                           |
| ----------- | --------- | ----------------------------------------------------- |
| Claude Code | yes       | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI    | untested  | -                                                     |
| Gemini CLI  | untested  | -                                                     |

Requirements: None. A project can keep its own database facts in an overlay the agent reads with the skill.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install data-analytics@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add data-analytics@modootoday
```

## What it registers

| Kind  | Name                           | Covers                                                                                                                                   |
| ----- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| skill | `clickhouse-query-authoring`   | ClickHouse SQL that filters on the key as stored, names its timezone, deduplicates correctly and binds parameters                        |
| skill | `metric-definition`            | metrics written as definitions (entity, event, window, timezone, exclusions, source) so two dashboards agree                             |
| skill | `naver-trend-analysis`         | Naver Data Lab and search ad data read correctly: ratios within one request, absolute volumes from the keyword tool                      |
| skill | `cohort-retention`             | retention by start cohort at the same offsets, with activity defined and incomplete periods marked                                       |
| skill | `experiment-design-readout`    | A/B tests designed before launch (one metric, sample size, stopping rule) and read with intervals, not peeks                             |
| skill | `survey-recount-and-anonymize` | survey or interview tallies recounted from the per-row table with named buckets, respondents numbered, aggregates only in the repository |

| skill | `retrieval-ranking-readout` | Ranking readouts with per-language metrics and latency evidence |
| skill | `list-normalize-and-diff` | two lists compared after a stated normalization: differences both ways with reconciled counts, every merged key listed, leading zeros kept |
| skill | `calculator-reference-case-verification` | a generated calculator or converter proven against a reference table: formula and units stated, boundaries and out-of-range cases, round trips, duplicate options |
| skill | `chart-geometry-and-claim-recompute` | charts checked by recomputing bar totals, axis origin, ratios and correlations from the data, with label overflow tested across widths; nothing read off the picture alone |
| skill | `macro-logic-recovery-refactor` | old macros tabulated per routine, differences kept as parameters, shared state passed in, before and after outputs compared on sample rows |
| skill | `bi-measure-context-debug` | BI measures debugged by naming model relationships and filter context, hand-computed values at row, subtotal and grand total, per-group scales from the model |
| skill | `spreadsheet-formula-environment-check` | formulas written for a named spreadsheet engine, version and locale: missing functions listed, locale separators, blank and text-number sample rows, highlight totals rebuilt from the formatting rule, a fallback |
| skill | `figure-source-key-join-and-total-check` | Sankey, map and heatmap figures built from parsed exports: totals checked before drawing, unmatched and renamed keys listed, mentions kept apart from visits, rerunnable code |
| skill | `open-response-theme-triangulation` | open responses merged into idea groups with ids, counts reconciled to the responses received, unclassified kept visible, and theme sets from different methods compared |
| skill | `csv-formula-injection-export-check` | Check a CSV export against spreadsheet formula interpretation and machine-value contracts, including import and save/reopen evidence |

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
Review this ClickHouse query: WHERE toDate(ts) >= '2026-09-01' with uniq(user_id).
```

The plugin ships an eval suite (`claude plugin eval plugins/data-analytics --no-publish`). Measured
20261004 on Claude Code 2.1.289 with Sonnet as judge; the score is the share of runs that
passed every grader, without the plugin and with it:

| Case                            | Skill                             | Without | With | Runs per arm |
| ------------------------------- | --------------------------------- | ------- | ---- | ------------ |
| `daily-active-query-review`     | clickhouse-query-authoring        | 1.00    | 1.00 | 2            |
| `postgres-index-not-clickhouse` | negative: the skill must not fire | 1.00    | 1.00 | 2            |
| `replacing-double-count`        | clickhouse-query-authoring        | 1.00    | 1.00 | 2            |
| `trend-ratio-misread`           | naver-trend-analysis              | 1.00    | 1.00 | 2            |
| `two-dashboards-dau`            | metric-definition                 | 1.00    | 1.00 | 2            |
| `blended-retention-drop`        | cohort-retention                  | 0.00    | 1.00 | 2            |
| `stop-test-early`               | experiment-design-readout         | 0.50    | 1.00 | 2            |
| `survey-summary-recount`        | survey-recount-and-anonymize      | 0.00    | 1.00 | 2            |
| `retrieval-slice-regression`    | retrieval-ranking-readout         | 0.00    | 1.00 | 2            |
| `list-diff-ids`                 | list-normalize-and-diff           | 0.00    | 1.00 | 2            |
| `three-generated-calculators`   | calculator-reference-case-verification | 0.50 | 1.00 | 2       |
| `regional-charts-recompute`     | chart-geometry-and-claim-recompute | 0.00 | 1.00 | 2       |
| `two-macros-shared-function`    | macro-logic-recovery-refactor | 0.00 | 1.00 | 2       |
| `dept-share-slicer-total`       | bi-measure-context-debug | 0.50 | 1.00 | 2       |
| `calc-highlight-sum-formula`    | spreadsheet-formula-environment-check | 0.00 | 1.00 | 2 |
| `tag-export-sankey-country-map` | figure-source-key-join-and-total-check | 0.25 | 1.00 | 2 |
| `twelve-responses-idea-groups` | open-response-theme-triangulation | 0.00 | 1.00 | 2, Sonnet subject and judge, 20261005; skill fired in both with runs; rests on two first-person records (moved 20261006) |

The two rows before the last were measured 20261005 with Sonnet as subject and judge, both arms, after both skills were edited; each skill rests on two or four weak-to-moderate records.

The retrieval case score was measured with Opus 5.5 as the subject model; the judge was Sonnet.
It was measured 20261005 on Claude Code 2.1.289. Behaviour passed 2/2 with the skill and 0/2 without;
invocation passed 2/2. Valid run cost USD 0.6240896. An earlier USD 0.4085016
run omitted the behaviour grader and is excluded from quality evidence.
The new skill has one case; two more are needed for the three-case release gate.

clickhouse-query-authoring shows no lift yet with the default model: the baseline found the same issues in every case tried. Its cases stay as regression checks. The Codex scores below add a case with lift for it.

metric-definition, naver-trend-analysis show no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks. The Codex scores below add a case with lift for metric-definition; for naver-trend-analysis the lift is small (the baseline failed one of two runs on one item).

Re-run 20261004 with smaller models answering (`--model`), mean score without and with the plugin over the same cases, 2 runs per arm: clickhouse-query-authoring: Haiku 0.67 to 1.00, Sonnet 1.00 to 1.00.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `function-on-key-join-order` | clickhouse-query-authoring | 0.00 | 1.00 | 2 of 2 |
| `weekly-active-teams-target` | metric-definition | 0.00 | 1.00 | 2 of 2 |
| `cross-request-volume-scaling` | naver-trend-analysis | 0.75 | 1.00 | 2 of 2 |

### CSV/PDF fixture measurements

These synthetic reports test bounded reasoning, not real spreadsheet/PDF tool
execution or universal safety/accessibility. Supplied observations remain supplied
evidence. Each case used gpt-6.1-sol subject/judge, two runs per arm, j2, three
judge votes, proxy authentication and a read-only isolated sandbox. Cases ran
serially on Codex CLI.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `csv-normal-import-route` | csv-formula-injection-export-check | 1.00 | 1.00 | 2 |
| `csv-resave-changes-contract` | csv-formula-injection-export-check | 0.00 | 1.00 (open) | 2 |
| `csv-missing-consumer-contract` | csv-formula-injection-export-check | 0.00 | 1.00 | 2 |

The normal CSV case is a 1.00/1.00 regression check. Both arms correctly preserve exact decoded values and restrict the supplied endorsement to the named text-import and machine routes; no added effect is claimed.

The save/reopen case has raw Without 0.00 and With 1.00, but judging is open. Both arms reject the shared tab-prefixed export and preserve the machine contract. Judges inconsistently demand machine revalidation from baseline replies while similarly scoped With replies pass. No effect or runtime badge is derived from this row; criteria and raw results remain unchanged.

The missing-consumer case supports a narrow planning effect: With requires a working untreated formula-evaluating control and links it to interpretation of a negative mitigation result. Baseline already rejects universal certification and separates recipient and machine contracts; one baseline also proposes untreated/treated comparisons, but neither makes the successful control a condition of interpreting non-evaluation. This is not evidence of generally better CSV safety or actual application execution.

Baseline 1.00 is regression evidence. Only a defensible With 1.00, Without
<1.00 and Fired 2/2 supports a runtime effect; open judging is excluded. No result
is transferred to an unmeasured runtime.

### Other runtimes: CSV/PDF fixtures

The following comparisons used Codex CLI only.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `csv-normal-import-route` | 1.00 | 1.00 | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `csv-resave-changes-contract` | 0.00 | 1.00 (open) | 2/2 | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `csv-missing-consumer-contract` | 0.00 | 1.00 | 2/2 | 2026-10-06 |

Three initial CSV comparisons lacked the LLM grader declaration. They contain
12 subject runs and no judge calls; their raw zeroes are unscored invocation-only
results, excluded from semantic scores and retained in the evaluation ledger.
Only the required grader frontmatter was added, preserving criteria unchanged.
Their usage is included in total usage. No metered runtime was used. costUsd is
null because the harness has no price mapping; USD conversion is unknown, not
measured zero. Cached input is included in input, not additional consumption.

## License

MIT
