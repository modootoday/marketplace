# industrial-config

## What it does

Device configuration files drafted from a register or tag table the engineer pastes: address base conversion, register widths, duplicate and overlapping ranges checked, every value the table does not give listed, and a bench test required before anything reaches equipment. It drafts and checks; it never claims a test was run.

This plugin is a preview: the full set is available to signed-in users.

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
claude plugin install industrial-config@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add industrial-config@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `device-config-file-from-register-table` | a register or tag table converted row by row into a stated import format with input and output row counts, an assumption list, flagged rows and missing values, and a required bench test on a non-production device |

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
Turn this register table into a map with 0-based addresses: Temp1 40001 INT16, Flow 40010 FLOAT32 (2 registers), Flow 40012 FLOAT32.
```

The plugin ships an eval suite (`claude plugin eval plugins/industrial-config --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `modbus-map-duplicate-flow` | device-config-file-from-register-table | 0.50 | 1.00 | 2 |

The skill rests on two first-person records (PLC tag import and a register map file); treat the lift as moderate evidence.

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
