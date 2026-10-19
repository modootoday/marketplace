# data-analytics

## What it does

Numbers that mean what they say: ClickHouse SQL that reads the key and deduplicates correctly, Naver trend data read as ratios, metrics defined once, experiments designed before launch, retention read by cohort, and open survey responses grouped with every response id kept.

## Runtime support

| Runtime     | Supported                | Measured on                                                  |
| ----------- | ------------------------ | ------------------------------------------------------------ |
| Claude Code | yes                      | 2.1.289, with the eval suite in `evals/` (see Verify)        |
| Codex CLI   | selected skills verified | 0.163.0 with gpt-6.1-sol; current and historical cases below |
| Grok CLI    | two skills verified      | 1.0.50; naver-trend-analysis and cohort-retention only       |
| Gemini CLI  | untested                 | -                                                            |

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

| Case                            | Skill                                  | Without | With | Runs per arm                                                                                                             |
| ------------------------------- | -------------------------------------- | ------- | ---- | ------------------------------------------------------------------------------------------------------------------------ |
| `daily-active-query-review`     | clickhouse-query-authoring             | 1.00    | 1.00 | 2                                                                                                                        |
| `postgres-index-not-clickhouse` | negative: the skill must not fire      | 1.00    | 1.00 | 2                                                                                                                        |
| `replacing-double-count`        | clickhouse-query-authoring             | 1.00    | 1.00 | 2                                                                                                                        |
| `trend-ratio-misread`           | naver-trend-analysis                   | 1.00    | 1.00 | 2                                                                                                                        |
| `two-dashboards-dau`            | metric-definition                      | 1.00    | 1.00 | 2                                                                                                                        |
| `blended-retention-drop`        | cohort-retention                       | 0.00    | 1.00 | 2                                                                                                                        |
| `stop-test-early`               | experiment-design-readout              | 0.50    | 1.00 | 2                                                                                                                        |
| `survey-summary-recount`        | survey-recount-and-anonymize           | 0.00    | 1.00 | 2                                                                                                                        |
| `retrieval-slice-regression`    | retrieval-ranking-readout              | 0.00    | 1.00 | 2                                                                                                                        |
| `list-diff-ids`                 | list-normalize-and-diff                | 0.00    | 1.00 | 2                                                                                                                        |
| `three-generated-calculators`   | calculator-reference-case-verification | 0.50    | 1.00 | 2                                                                                                                        |
| `regional-charts-recompute`     | chart-geometry-and-claim-recompute     | 0.00    | 1.00 | 2                                                                                                                        |
| `two-macros-shared-function`    | macro-logic-recovery-refactor          | 0.00    | 1.00 | 2                                                                                                                        |
| `dept-share-slicer-total`       | bi-measure-context-debug               | 0.50    | 1.00 | 2                                                                                                                        |
| `calc-highlight-sum-formula`    | spreadsheet-formula-environment-check  | 0.00    | 1.00 | 2                                                                                                                        |
| `tag-export-sankey-country-map` | figure-source-key-join-and-total-check | 0.25    | 1.00 | 2                                                                                                                        |
| `twelve-responses-idea-groups`  | open-response-theme-triangulation      | 0.00    | 1.00 | 2, Sonnet subject and judge, 20261005; skill fired in both with runs; rests on two first-person records (moved 20261006) |

The two rows before the last were measured 20261005 with Sonnet as subject and judge, both arms, after both skills were edited; each skill rests on two or four weak-to-moderate records.

The retrieval case score was measured with Opus 5.5 as the subject model; the judge was Sonnet.
It was measured 20261005 on Claude Code 2.1.289. Behaviour passed 2/2 with the skill and 0/2 without;
invocation passed 2/2. Valid run cost USD 0.6240896. An earlier USD 0.4085016
run omitted the behaviour grader and is excluded from quality evidence.
The new skill has one case; two more are needed for the three-case release gate.

clickhouse-query-authoring shows no lift yet with the default model: the baseline found the same issues in every case tried. Its cases stay as regression checks. The Codex scores below add a case with lift for it.

In these historical Claude Code comparisons, metric-definition and naver-trend-analysis show no lift: the baseline model already passed these cases, or both arms failed. The cases stay as regression checks. The Codex scores below add a case with lift for metric-definition; for naver-trend-analysis the lift is small (the baseline failed one of two runs on one item).

Re-run 20261004 with smaller models answering (`--model`), mean score without and with the plugin over the same cases, 2 runs per arm: clickhouse-query-authoring: Haiku 0.67 to 1.00, Sonnet 1.00 to 1.00.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case                           | Skill                      | Without | With | Skill fired |
| ------------------------------ | -------------------------- | ------- | ---- | ----------- |
| `function-on-key-join-order`   | clickhouse-query-authoring | 0.00    | 1.00 | 2 of 2      |
| `weekly-active-teams-target`   | metric-definition          | 0.00    | 1.00 | 2 of 2      |
| `cross-request-volume-scaling` | naver-trend-analysis       | 0.75    | 1.00 | 2 of 2      |

### CSV/PDF fixture measurements

These synthetic reports test bounded reasoning, not real spreadsheet/PDF tool
execution or universal safety/accessibility. Supplied observations remain supplied
evidence. Each case used gpt-6.1-sol subject/judge, two runs per arm, j2, three
judge votes, proxy authentication and a read-only isolated sandbox. Cases ran
serially on Codex CLI.

| Case                            | Skill                              | Without | With        | Runs per arm |
| ------------------------------- | ---------------------------------- | ------- | ----------- | ------------ |
| `csv-normal-import-route`       | csv-formula-injection-export-check | 1.00    | 1.00        | 2            |
| `csv-resave-changes-contract`   | csv-formula-injection-export-check | 0.00    | 1.00 (open) | 2            |
| `csv-missing-consumer-contract` | csv-formula-injection-export-check | 0.00    | 1.00        | 2            |

The normal CSV case is a 1.00/1.00 regression check. Both arms correctly preserve exact decoded values and restrict the supplied endorsement to the named text-import and machine routes; no added effect is claimed.

The save/reopen case has raw Without 0.00 and With 1.00, but judging is open. Both arms reject the shared tab-prefixed export and preserve the machine contract. Judges inconsistently demand machine revalidation from baseline replies while similarly scoped With replies pass. No effect or runtime badge is derived from this row; criteria and raw results remain unchanged.

The missing-consumer case supports a narrow planning effect: With requires a working untreated formula-evaluating control and links it to interpretation of a negative mitigation result. Baseline already rejects universal certification and separates recipient and machine contracts; one baseline also proposes untreated/treated comparisons, but neither makes the successful control a condition of interpreting non-evaluation. This is not evidence of generally better CSV safety or actual application execution.

Baseline 1.00 is regression evidence. Only a defensible With 1.00, Without
<1.00 and Fired 2/2 supports a runtime effect; open judging is excluded. No result
is transferred to an unmeasured runtime.

### Other runtimes: CSV/PDF fixtures

The following comparisons used Codex CLI only.

| Runtime   | Model       | Case                            | Without | With        | Fired | Date       |
| --------- | ----------- | ------------------------------- | ------- | ----------- | ----- | ---------- |
| Codex CLI | gpt-6.1-sol | `csv-normal-import-route`       | 1.00    | 1.00        | 2/2   | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `csv-resave-changes-contract`   | 0.00    | 1.00 (open) | 2/2   | 2026-10-06 |
| Codex CLI | gpt-6.1-sol | `csv-missing-consumer-contract` | 0.00    | 1.00        | 2/2   | 2026-10-06 |

Three initial CSV comparisons lacked the LLM grader declaration. They contain
12 subject runs and no judge calls; their raw zeroes are unscored invocation-only
results, excluded from semantic scores and retained in the evaluation ledger.
Only the required grader frontmatter was added, preserving criteria unchanged.
Their usage is included in total usage. No metered runtime was used. costUsd is
null because the harness has no price mapping; USD conversion is unknown, not
measured zero. Cached input is included in input, not additional consumption.

## License

MIT

## Other runtimes: Naver planning, 2026-10-19

Grok CLI 1.0.50 with grok-4.7-build-fast as subject and judge completed two
runs per arm, three votes per behavioral grader, concurrency one and
proxy/bubblewrap isolation. The skill body, prompt and rubrics were unchanged.
All four answers and 24 behavioral votes for this case were reviewed.

| Runtime  | Model               | Case                           | Skill                | Without | With | Fired | Date       |
| -------- | ------------------- | ------------------------------ | -------------------- | ------- | ---- | ----- | ---------- |
| Grok CLI | grok-4.7-build-fast | `cross-request-volume-scaling` | naver-trend-analysis | 0.25    | 1.00 | 2/2   | 2026-10-19 |

The effect is narrow: both baselines already estimate the November value
correctly and refuse to rank December across different demographic filters.
One baseline omits the new single same-filter request needed to resolve the
comparison; both guided replies supply that next step. This is a planning
improvement, not evidence of better arithmetic, newly recognized ratio limits,
actual API calls or measured search volumes.

The other baseline does recommend the same-filter request, then adds a December
estimate. Two judges fail its scaling answer because the recommendation is not
the final statement, while one passes. Preserve that disputed raw failure;
the narrow effect above does not depend on it. No score or rubric was rewritten.
Additional December figures remain assumption-dependent estimates in both arms.

### Cohort diagnosis on Codex and Grok

The cohort body now confirms the denominator and maturity rule before diagnosis,
keeps actual per-user starts for exact day offsets, and treats campaign mix as
a hypothesis. Stable old cohorts do not rule out a new-user-only regression.
Missing data calls for a table layout and required inputs, not invented observed
rates or runnable SQL. One bounded source repair addressed an initial Grok
comparison with overconfident causal and old-cohort-only claims.

Fresh comparisons used two runs per arm, three behavioral votes, concurrency one,
low effort, proxy authentication and bubblewrap isolation. All eight answers and
24 behavioral votes across the two final runtime comparisons were reviewed.

| Runtime   | Model               | Case                     | Skill            | Without | With | Fired | Date       |
| --------- | ------------------- | ------------------------ | ---------------- | ------- | ---- | ----- | ---------- |
| Codex CLI | gpt-6.1-sol         | `blended-retention-drop` | cohort-retention | 0.00    | 1.00 | 2/2   | 2026-10-19 |
| Grok CLI  | grok-4.7-build-fast | `blended-retention-drop` | cohort-retention | 0.00    | 1.00 | 2/2   | 2026-10-19 |

Both runtimes' baselines already identify mix effects and incomplete follow-up;
several also request same-age cohort/channel counts. The narrow difference is
the explicit return-activity/window contract before interpreting those counts,
not discovery of mixing or better causal identification. One Codex With vote
dissents on whether activity is fully defined; the other five With votes pass.
The final Grok With votes all pass. Raw scores retain the native majority rule.
These are definition-completeness checks on supplied headlines, not executed
queries or measured retention changes. Actual use must first confirm that the
headline really blends the proposed denominator.

The final Grok baseline also contains an unscored weighted-average arithmetic
error. It remains in the original evidence and is not the basis of admission.
No failed result or rubric was rewritten.

### Metric-definition hold

The same Grok suite gives raw With 1.00 / Without 0.00 for
`two-dashboards-dau` and `weekly-active-teams-target`, with activation 2/2.
Those rows do not qualify a Grok badge. DAU judging rejects baselines that
already identify definition differences for not explicitly writing both cards;
WAT event-item judging treats similar non-sync filters inconsistently, and
manual review finds flawed illustrative SQL and guardrail claims.

Two bounded metric-body repairs were tested with Codex With-only maintenance.
The final WAT replies pass both runs, but one DAU reply still omits an explicit
source-table check. That body repair remains held and is excluded from this
release. Existing metric-definition procedure and runtime metadata are unchanged.
No further wording retry or inferred Grok admission is included.

### Experiment-effect hold

The unchanged `stop-test-early` case records raw Codex With 1.00 / Without 0.00
and Grok With 1.00 / Without 0.50, both with activation 2/2. The baselines already
reject an unplanned significance peek and post-hoc Android shipping, discuss
weekday/weekend effects and the planned sample/duration, and request an interval.
Their failed votes concern explicitly recommending whole weeks. Grok has one
dissenting pass on that point. This operational-wording difference is held as
effect-unconfirmed, with no new experiment badge on either runtime and no source
or grader change.

## Maintenance cases: 2026-10-12

Codex CLI 0.162.1, gpt-6.1-sol subject and judges, two With-only runs per case, three requested judge votes per run and concurrency 1. P and F below preserve individual PASS and FAIL votes; missing votes are incomplete evidence. Actual answers were reviewed separately from native scores.

24 of 24 added coverage slots passed both complete native judging and answer review. The remaining slots are held. Clarified fixtures are distinct attempts; they do not repair or overwrite earlier execution, arithmetic, content-boundary or grading failures.

| Case                                                | Skill                                  | Activation | Recorded votes by run | Review        |
| --------------------------------------------------- | -------------------------------------- | ---------- | --------------------- | ------------- |
| group-colour-and-unobserved-history-contract        | bi-measure-context-debug               | 2/2        | PPP / PPP             | Reviewed pass |
| region-slicer-denominator-context-contract          | bi-measure-context-debug               | 2/2        | PPP / PPP             | Reviewed pass |
| binary-storage-halfway-reference-contract           | calculator-reference-case-verification | 2/2        | PPP / PPP             | Reviewed pass |
| tank-fill-domain-and-roundtrip-contract             | calculator-reference-case-verification | 2/2        | PPP / PPP             | Reviewed pass |
| nonzero-bars-render-limits-contract                 | chart-geometry-and-claim-recompute     | 2/2        | PPP / PPP             | Reviewed pass |
| paired-data-correlation-equivalent-layout-contract  | chart-geometry-and-claim-recompute     | 2/2        | PPP / PPP             | Reviewed pass |
| right-censored-completed-window-boundary-contract   | cohort-retention                       | 2/2        | PPP / PPP             | Reviewed pass |
| weekly-cohort-deduplicate-activity-contract         | cohort-retention                       | 2/2        | PPP / PPP             | Reviewed pass |
| binary-experiment-planning-whole-weeks-contract     | experiment-design-readout              | 2/2        | PPP / PPP             | Reviewed pass |
| interval-crosses-zero-and-allocation-check-contract | experiment-design-readout              | 2/2        | PPP / PPP             | Reviewed pass |
| alias-join-and-unreadable-source-contract           | figure-source-key-join-and-total-check | 2/2        | PPP / PPP             | Reviewed pass |
| sankey-source-rows-and-mass-balance-contract        | figure-source-key-join-and-total-check | 2/2        | PPP / PPF             | Reviewed pass |
| ambiguous-name-order-does-not-automerge-contract    | list-normalize-and-diff                | 2/2        | PPP / PPP             | Reviewed pass |
| key-leading-zero-and-fullwidth-contract             | list-normalize-and-diff                | 2/2        | PPP / PPP             | Reviewed pass |
| rounding-boundary-explicit-callback-policy-contract | macro-logic-recovery-refactor          | 2/2        | PPP / PPP             | Reviewed pass |
| skip-empty-and-stale-explicit-state-contract        | macro-logic-recovery-refactor          | 2/2        | PPP / PPP             | Reviewed pass |
| human-ai-theme-split-reconciliation-contract        | open-response-theme-triangulation      | 2/2        | PPP / PPP             | Reviewed pass |
| response-ids-multitheme-scope-boundary-contract     | open-response-theme-triangulation      | 2/2        | PPP / PPP             | Reviewed pass |
| multi-positive-and-zero-denominator-contract        | retrieval-ranking-readout              | 2/2        | PPP / PPP             | Reviewed pass |
| permission-mismatch-required-evidence-contract      | retrieval-ranking-readout              | 2/2        | PPP / PPP             | Reviewed pass |
| capability-gated-declared-environment-contract      | spreadsheet-formula-environment-check  | 2/2        | PPP / PPP             | Reviewed pass |
| manual-colour-helper-and-date-unknown-contract      | spreadsheet-formula-environment-check  | 2/2        | PPP / PPP             | Reviewed pass |
| conditional-denominator-and-small-cells-contract    | survey-recount-and-anonymize           | 2/2        | PPP / PPP             | Reviewed pass |
| reported-only-public-redaction-plan-contract        | survey-recount-and-anonymize           | 2/2        | PPP / PPP             | Reviewed pass |

Retained valid historical regression fixtures remain held for their original findings. Passing a distinct fallback or boundary task does not erase these outcomes.

| Historical case                                    | Original review                                      |
| -------------------------------------------------- | ---------------------------------------------------- |
| binary-storage-calculator-reference-contract       | held: incorrect extra rounding claim                 |
| reported-only-table-and-release-redaction-contract | held: public-output scope ambiguity and missing vote |

These are maintenance checks on unchanged skill procedures and runtime metadata. They establish no new paired effect or runtime badge. Earlier evidence and held outcomes remain separate.
