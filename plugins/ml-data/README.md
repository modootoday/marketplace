# ml-data

## What it does

Checks fine-tuning data against the target trainer or provider schema before an upload or a training run: roles, field names and content types per row, one JSON record per example, a reload with the real loader, and tool-call turn structure. It checks data; it does not train.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes, for the cases listed in Verify | measured 20261006 with gpt-6.1-sol |
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
| skill | `bbox-annotation-format-conversion-check` | detection boxes converted between COCO, YOLO and Pascal VOC after the claimed source format is tested against image bounds, with bounds asserted, a round trip within one pixel, explicit class id mapping and an overlay of samples (rests on two records) |

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

Measured 20261005 on Claude Code 2.1.289 with Sonnet as subject and judge. At that recorded cut, each skill had one
case and two more were needed for the three-case release gate.

Codex CLI, measured 20261006 (Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes), both arms:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `bbox-voc-labelled-coco` | bbox-annotation-format-conversion-check | 0.00 | 1.00 | 2 |

The bounding box skill rests on two web records (a bug report and a value-added reseller note).

### Other runtimes: reviewed supplied-case comparison

Measured 2026-10-08 on codex-cli 0.161.0 with gpt-6.1-sol as subject and judge, two runs per arm and three votes per semantic grader. Scores are the original behavioural aggregates; process exit zero at threshold zero is not quality evidence.

| Runtime   | Model       | Case                           | Skill                                   | Without | With | Fired | Date       |
| --------- | ----------- | ------------------------------ | --------------------------------------- | ------- | ---- | ----- | ---------- |
| Codex CLI | gpt-6.1-sol | `bbox-mixed-size-yolo-to-coco` | bbox-annotation-format-conversion-check | 0.00    | 1.00 | 2/2   | 2026-10-08 |

Four answers produce twelve judge votes: six With PASS and six baseline FAIL. Both arms derive the correct mixed-size boxes and category mapping. Both baseline answers omit the reverse-conversion comparison with pixel-scaled tolerance; both With answers include it while bounding their unexecuted code proposals. This is a supplied-row validation-planning effect, not actual image, full-dataset or training validation.

The plugin now has three case paths across two skills. The bounding-box skill has two and the training-data skill has one; this does not establish three-case coverage or a quality gate for either skill.

## License

MIT
