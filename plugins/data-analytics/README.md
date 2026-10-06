# data-analytics

## What it does

Numbers that mean what they say: ClickHouse SQL that reads the key and deduplicates correctly, Naver trend data read as ratios, metrics defined once, experiments designed before launch and retention read by cohort.

## Runtime support

| Runtime     | Supported | Measured on                                           |
| ----------- | --------- | ----------------------------------------------------- |
| Claude Code | yes       | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI   | untested  | -                                                     |
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

The last two rows were measured 20261005 with Sonnet as subject and judge, both arms, after both skills were edited; each skill rests on two or four weak-to-moderate records.

The retrieval case score was measured with Opus 5.5 as the subject model; the judge was Sonnet.
It was measured 20261005 on Claude Code 2.1.289. Behaviour passed 2/2 with the skill and 0/2 without;
invocation passed 2/2. Valid run cost USD 0.6240896. An earlier USD 0.4085016
run omitted the behaviour grader and is excluded from quality evidence.
The new skill has one case; two more are needed for the three-case release gate.

clickhouse-query-authoring shows no lift yet with the default model: the baseline found the same issues in every case tried. Its cases stay as regression checks.

metric-definition, naver-trend-analysis show no lift yet: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks.

Re-run 20261004 with smaller models answering (`--model`), mean score without and with the plugin over the same cases, 2 runs per arm: clickhouse-query-authoring: Haiku 0.67 to 1.00, Sonnet 1.00 to 1.00.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
