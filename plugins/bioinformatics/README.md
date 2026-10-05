# bioinformatics

## What it does

Refactors of analysis pipelines that must keep results equal: baseline frozen, steps mapped, outputs compared at a stated tolerance, differences explained apart from unexplained ones.

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
claude plugin install bioinformatics@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add bioinformatics@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `analysis-pipeline-refactor-parity` | a migration plan and acceptance check for replacing an analysis step with a package, porting a pipeline to a workflow engine or accelerating it: baseline, step map, tolerances, explained and unexplained differences, no claim before the comparison runs |

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
I am replacing my own R script with DESeq2 and moving a shell pipeline to Nextflow. Give me the migration plan and the acceptance check.
```

The plugin ships an eval suite (`claude plugin eval plugins/bioinformatics --no-publish`).
Scores are the share of runs that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject and judge |
| --- | --- | --- | --- | --- | --- |
| `deseq2-nextflow-migration` | analysis-pipeline-refactor-parity | 0.00 | 1.00 | 2 | Sonnet, Sonnet (20261005) |

The new skill has one case; two more are needed for the three-case release gate.

## License

MIT
