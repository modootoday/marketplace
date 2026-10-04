# data-analytics

## What it does

ClickHouse SQL that reads the primary key, states its timezone, counts deduplicated rows correctly and takes values as typed parameters.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

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

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `clickhouse-query-authoring` | ClickHouse SQL that filters on the key as stored, names its timezone, deduplicates correctly and binds parameters |

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

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `daily-active-query-review` | clickhouse-query-authoring | 1.00 | 1.00 | 2 |
| `postgres-index-not-clickhouse` | negative: the skill must not fire | 1.00 | 1.00 | 2 |
| `replacing-double-count` | clickhouse-query-authoring | 1.00 | 1.00 | 2 |

No lift yet: the baseline model found the same issues in every case tried. The cases stay as regression checks.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
