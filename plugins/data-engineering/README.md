# data-engineering

## What it does

Prove that migrated, converted or rewritten SQL returns the same result as the original: statements mapped one to one, two-way key diffs, and checkers shown to catch seeded differences.

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

## License

MIT
