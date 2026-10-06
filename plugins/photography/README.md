# photography

## What it does

Photo cull and batch-grade checks from the scores, logs and settings you supply: subject-specific criteria, rank-and-flag only, preview-versus-export match and file-to-output mapping. It checks and plans; it does not edit or generate images.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: nothing is required. The skills work from the text, numbers and file lists you paste in.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install photography@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add photography@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `photo-cull-calibration` | a cull checked from the report you supply: criteria per subject, calibration on your own kept frames, technical flaws apart from moments that matter, rank and flag only, missing frames listed; rests on three first-person reports |
| skill | `photo-batch-grade-and-export-match` | a batch grade or RAW-development tool checked: per-scene white and exposure continuity, preview versus export, input-to-output mapping with unopened files, approval on a sample; rests on two reports |
| skill | `stock-photo-metadata-format-check` | stock-site titles, descriptions, keywords and upload CSV checked against the destination's limits: counts shown, keyword form enforced, commas escaped, one row per exact filename, unconfirmed places left out, files without notes listed; rests on three public reports of repeated formatting correction |

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
My cull app rejected three frames of a bird in flight for closed eyes. Is it safe to delete them?
```

The plugin ships an eval suite (`claude plugin eval plugins/photography --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `burst-bird-cull` | photo-cull-calibration | 0.00 | 1.00 | 2 |
| `dng-batch-look` | photo-batch-grade-and-export-match | 0.00 | 1.00 | 2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `harbour-stock-csv` | stock-photo-metadata-format-check | 0.00 | 1.00 | 2 of 2 |

## License

MIT
