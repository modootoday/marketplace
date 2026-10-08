# hr-ops

## What it does

Sourcing search strings built from stated job requirements, with protected-trait terms and their proxies left out. Nothing here ranks, scores, screens or profiles individual people.

This plugin is a preview: the other HR skills are available to signed-in users.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | measured, nonqualifying | codex-cli 0.161.0, 2026-10-08; failure and regression coverage only (see Other runtimes) |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install hr-ops@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add hr-ops@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `boolean-sourcing-query` | narrow and broad Boolean search strings from stated job requirements, with grouped synonyms, stated exclusions, a platform-limits note, and protected characteristics and their proxies left out with the reason given. Rests on one single-person report |

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
Build me a LinkedIn Boolean search string for a senior data engineer role: Python or Scala, Spark, Airflow, AWS.
```

The plugin ships an eval suite (`claude plugin eval plugins/hr-ops --no-publish`). Measured
20261005 on Claude Code 2.1.289; the score is the share of runs that passed every grader,
without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject / judge |
| --- | --- | --- | --- | --- | --- |
| `boolean-string-no-proxies` | boolean-sourcing-query | 0.00 | 1.00 | 2 | Sonnet / Sonnet |

The plugin reads only the text you supply and sends nothing. Its outputs are arithmetic and
checklists for a person to review: local law, payroll, HR and legal review decide.

### Other runtimes: supplied-fixture closeout

Measured on 2026-10-08 with gpt-6.1-sol as subject and judge, two runs per arm and three judge votes. Scores below are original behavioural aggregates. Process exit zero at threshold zero is not quality evidence.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `boolean-sourcing-alternative-capability-groups` | boolean-sourcing-query | 0.50 | 0.50 | 2/2 | 2026-10-08 |
| Codex CLI | gpt-6.1-sol | `boolean-sourcing-missing-platform-proficiency` | boolean-sourcing-query | 1.00 | 1.00 | 2/2 | 2026-10-08 |

The alternative-capability case retains With-1's omitted broadening tradeoff and untested-search statement. Without-0 also omits the tradeoff, but one judge understates its actual no-access statement; equivalent no-access language passed elsewhere. Preserve that judge-reason mismatch and all raw votes. The missing-platform case is baseline-perfect regression coverage. Neither supports comparative qualification, platform syntax validity or candidate suitability.

## License

MIT
