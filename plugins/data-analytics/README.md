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
