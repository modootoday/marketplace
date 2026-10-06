# data-engineering

## What it does

Prove that migrated, converted or rewritten SQL returns the same result as the original: statements mapped one to one, two-way key diffs, and checkers shown to catch seeded differences.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast for 1 case; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

Requirements: None.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install data-engineering@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add data-engineering@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `sql-migration-equivalence-check` | converted, replaced, optimized or extended SQL compared with the original: statement map, row counts, two-way anti-join, null-safe column diff, seeded-difference test |
| skill | `dbt-model-refactor-and-docs` | a large model split into layers with lineage kept and an equivalence check, column descriptions matched to the real select, drift lists (three evidence records) |
| skill | `semi-structured-field-extraction` | logs and JSON turned into typed columns: unit normalization, a policy per bad type, row reconciliation, plots with units (three evidence records) |
| skill | `multi-file-lab-workbook-harmonization` | many lab workbooks of similar layout merged into one table: files grouped by layout variant, schema and per-variant mapping, same-header unit and date differences caught, unmapped columns listed, per-file rows in against rows out checked in the code; rests on two single-user reports (weak evidence) |

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
We converted this Postgres script to BigQuery with an AI tool. Confirm the new table matches the old one.
```

The plugin ships an eval suite (`claude plugin eval plugins/data-engineering --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `orders-bigquery-migration` | sql-migration-equivalence-check | 0.00 | 1.00 | 2 |
| `split-fct-orders` | dbt-model-refactor-and-docs | 0.00 | 1.00 | 2 |
| `log-json-extract` | semi-structured-field-extraction | 0.00 | 1.00 | 2 |

Each skill has one case; two more are needed per skill for the three-case release gate.
The two newer rows were measured 20261005 with Sonnet as subject and judge.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `two-lab-plate-merge` | multi-file-lab-workbook-harmonization | 0.00 | 1.00 | 2 of 2 |

### Other runtimes

Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `two-lab-plate-merge` | 0.50 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `two-lab-plate-merge` | 0.00 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `two-lab-plate-merge` | 0.50 | 1.00 | 2/2 | 20261006 |

## License

MIT
