# data-engineering

## What it does

Verify data transformations and preservation packages: SQL result equivalence, typed extraction, workbook reconciliation and BagIt completeness versus full checksum validity.

Compare saved searchable-PDF text and image geometry against approved anchors and explicit page coverage.

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
| skill | `bagit-completeness-fixity-audit` | required structure and manifest inventory checked separately from complete payload/tag checksum evidence; fast size/count is preliminary |
| skill | `ocr-pdf-text-image-alignment-check` | saved text/image anchor positions and page coverage, separate from OCR spelling and semantic order |

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

The new BagIt skill has three supplied-fixture reasoning cases measured on 2026-10-07 with Codex CLI 0.160.1, gpt-6.1-sol subject and judge, two runs per arm and three judge votes. A same-size case was rerun after adding a concrete next-investigation reporting requirement. These fixtures do not run a validator or prove preservation interoperability. Existing runtime results below apply to their named skills only.

The raw table is marked (open) to prevent inference of an unmeasured runtime; the explicit Codex row below is the admitted metadata basis.

| Case | Skill | Without | With | Runs per arm | Interpretation |
| --- | --- | --- | --- | --- | --- |
| `bagit-full-evidence-match` | bagit-completeness-fixity-audit | 0.00 | 1.00 (open) | 2 | Narrow size/count warning coverage; baseline validity diagnosis already correct |
| `bagit-same-size-changed-bytes` | bagit-completeness-fixity-audit | 0.00 | 0.00 (open) | 2 | Initial missing next investigation; baseline attribution interpretation OPEN |
| `bagit-same-size-changed-bytes-r1` | bagit-completeness-fixity-audit | 0.00 | 1.00 (open) | 2 | Concrete preserved-snapshot/source/transfer comparison plan |
| `bagit-inventory-digests-missing` | bagit-completeness-fixity-audit | 0.50 | 0.50 (open) | 2 | OPEN: bidirectional inventory and tag-manifest coverage interpretation |

The admitted effect is a concrete next investigation against preserved received/source/transfer evidence. Both baseline replies correctly identified the complete but invalid bag; one baseline mentioned investigation but did not specify the next check. No classification or integrity-diagnosis superiority is claimed. The missing-evidence case remains partial and OPEN, so this is not full verification of every case. Initial failures and all reruns are retained. Measurement used subscription Codex, no metered runtime; reported USD cost and prices were null, so USD conversion is unavailable. Cached input is part of input tokens and reasoning output is part of output tokens.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `bagit-same-size-changed-bytes-r1` | bagit-completeness-fixity-audit | 0.00 | 1.00 | 2/2 | 2026-10-07 |

Reproduce one comparison from the marketplace root with the shipped harness:

```
node plugins/skill-factory/skills/codex-plugin-eval/scripts/codex-plugin-eval.mjs plugins/data-engineering --case bagit-full-evidence-match --runs 2 -j 2 --model gpt-6.1-sol --judge-model gpt-6.1-sol --judge-votes 3 --auth proxy --isolation bwrap --threshold 0 --output-dir /tmp/bagit-full-evidence-match --json /tmp/bagit-full-evidence-match.json
```

Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `two-lab-plate-merge` | 0.50 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `two-lab-plate-merge` | 0.00 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `two-lab-plate-merge` | 0.50 | 1.00 | 2/2 | 20261006 |

### Artifact handoff fixture measurements

These self-contained synthetic observations measure reasoning on supplied reports, not actual application execution, archive extraction, private-document cleanup or manufacturing readiness. Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and a read-only bwrap sandbox. All 15 comparisons ran serially; no criteria or measured skill instructions changed.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `ocr-two-page-aligned-controls` | ocr-pdf-text-image-alignment-check | 0.00 | 1.00 (open) | 2 |
| `ocr-correct-words-rotated-boxes` | ocr-pdf-text-image-alignment-check | 1.00 | 1.00 (open) | 2 |
| `ocr-sidecar-only-coverage-unknown` | ocr-pdf-text-image-alignment-check | 1.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inference of unmeasured Claude results. The runtime-specific table below preserves raw scores; only admitted effect rows omit that marker. Other rows are regression or OPEN interpretation-sensitive results, not effect evidence.

No applicable effect is admitted for the OCR skill. Both exception and missing-input cases are 1.00/1.00 regression checks. All arms identify the exact 180-degree geometry mismatch and request saved identity, geometry/search and skipped/existing-text coverage evidence. The normal case is OPEN: baselines assess the bounded controls correctly and claim no universal certification, but judges demand unrelated PDF/A, accessibility and redaction disclaimers. No new OCR runtime badge is supported.

### Other runtimes: artifact handoff fixtures

These rows apply only to the named new skills and fixture reasoning. Other clients and actual receiving applications remain untested.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `ocr-two-page-aligned-controls` | ocr-pdf-text-image-alignment-check | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `ocr-correct-words-rotated-boxes` | ocr-pdf-text-image-alignment-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `ocr-sidecar-only-coverage-unknown` | ocr-pdf-text-image-alignment-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input tokens; reasoning output is included in output. No score from OPEN judging supports a badge.

## License

MIT
