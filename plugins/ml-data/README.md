# ml-data

## What it does

Checks fine-tuning data against the target trainer or provider schema before an upload or a training run: roles, field names and content types per row, one JSON record per example, a reload with the real loader, and tool-call turn structure. It checks data; it does not train.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | untested | - |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: None. Reloading output with the real loader needs that loader installed where the check runs.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install ml-data@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add ml-data@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `training-data-format-contract-check` | fine-tuning JSONL checked against the named target schema, content types converted by a stated rule, code and non-ASCII text kept in one record per example, reload counts compared, tool-call ids checked, rejected rows listed by line |

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
My fine-tuning upload says content must be a string, but some rows have an object. Convert the file.
```

The plugin ships an eval suite (`claude plugin eval plugins/ml-data --no-publish`). Scores are
the share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `chat-content-object-conversion` | training-data-format-contract-check | 0.00 | 1.00 | 2 |

Measured 20261005 on Claude Code 2.1.289 with Sonnet as subject and judge. The skill has one
case; two more are needed for the three-case release gate.

## License

MIT
