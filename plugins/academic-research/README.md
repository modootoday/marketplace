# academic-research

## What it does

Check AI-suggested citations, measurement instruments and extracted statistics against real sources before they enter your research notes, and redo lab dilution and unit arithmetic before results are used.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | yes | Codex CLI with gpt-6.1-sol, the new case only (see Verify) |
| Grok CLI | yes | measured 20261006 on grok-4.7-build-fast for 1 case; see Other runtimes |
| Gemini CLI | yes | measured 20261006 on gemini-3.8-flash; see Other runtimes |

Requirements: Nothing is required. A web search tool lets the skill confirm citations against an index; without one it reports them as unverifiable.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install academic-research@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add academic-research@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `bibliography-creator-export-semantics-check` | approved personal/literal creator identities, roles and order compared through export, parsing and style display |
| skill | `ome-series-calibration-roundtrip-check` | OME physical quantity equivalence and series/IFD/ZCT correspondence through supplied roundtrip observations |
| skill | `research-source-verification` | AI-suggested citations matched to a real index, instruments extracted only as quoted text, papers screened against the research question |
| skill | `research-coverage-chronology-audit` | research answers audited for missing items and wrong dates: dated sourced list, proposed versus enacted, coverage gaps |
| skill | `paper-method-reimplementation-check` | a port of a published method checked before use: equation checklist, authors' code and licence recorded, one published number reproduced first, deviations and ambiguous text listed |
| skill | `reference-renumber-sync` | numbered references reordered or deleted with an old-to-new mapping, groups and ranges rewritten, deleted-reference citations and uncited entries listed; rests on one user report |
| skill | `lab-calculation-and-claim-check` | dilution and unit math redone, result tables checked against raw numbers, citations tested for method and sample fit |
| skill | `structure-record-ligand-presence-check` | a recommended structure entry checked for the named ligand against the record text you paste: ligand code, chain and occupancy reported or "not found in the pasted text", no entry named from memory, source-database confirmations listed; rests on one first-person report (weak evidence) |

The newly added `bibliography-creator-export-semantics-check` reviews approved personal/literal creator identities, roles and order compared through export, parsing and style display. It ships three self-contained synthetic cases (normal, exception and missing input). These cases were compared as supplied-fixture reasoning; the results and limitations are recorded under Verify. Existing sibling-skill runtime results do not verify this skill.

The newly added `ome-series-calibration-roundtrip-check` reviews supplied synthetic scientific artifact evidence. Each ships three synthetic cases (normal, exception and missing input); the named Codex fixture comparisons and limits are recorded below. Historical results apply only to their named skills. No biological or clinical interpretation is provided.

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
Check these AI-suggested references before I cite them: Vaswani et al. (2017), Attention Is All You Need.
```

The plugin ships an eval suite (`claude plugin eval plugins/academic-research --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `unverified-citations` | research-source-verification | 0.00 | 1.00 | 2 |
| `policy-timeline-audit` | research-coverage-chronology-audit | 0.00 | 1.00 | 2 |
| `method-port-matlab` | paper-method-reimplementation-check | 0.00 | 1.00 | 2, Sonnet subject and judge |
| `renumber-delete-and-move` | reference-renumber-sync | 0.00 | 1.00 | 2, Sonnet subject and judge |
| `dilution-table-citation` | lab-calculation-and-claim-check | 0.00 | 1.00 | 2 per arm, Codex, gpt-6.1-sol / gpt-6.1-sol, 3 votes, 20261006; skill fired 2/2 |

A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

Codex scores, measured 20261006 with the Codex eval harness, both arms, 2 runs per arm, subject gpt-6.1-sol, judge gpt-6.1-sol with 3 votes:

| Case | Skill | Without | With | Skill fired |
| --- | --- | --- | --- | --- |
| `kinase-ligand-entry-check` | structure-record-ligand-presence-check | 0.00 | 1.00 | 2 of 2 |

### Other runtimes

Codex reasoning rows for the added skill only. The (open) marker excludes them from verified-runtimes inference; existing measured sibling-skill records retain their scope. No new runtime badge is supported. Other runtimes remain untested for the added skill.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `creator-style-preserves-identity` | bibliography-creator-export-semantics-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `creator-literal-parser-mismatch` | bibliography-creator-export-semantics-check | 0.00 | 0.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `creator-source-mode-missing` | bibliography-creator-export-semantics-check | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |

Measurements used subscription Codex and no metered runtimes. USD cost and token prices were null, so USD conversion is unavailable. Cached input is a subset of input tokens; reasoning output is included in output tokens.


Grok CLI, both arms, 2 runs per arm, 3 judge votes, the model as subject and judge, 20261006. A row where the skill fired and With is 1.00 sets the runtime in the skill's verified-runtimes.

| Runtime | Model | Case | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- |
| Grok CLI | grok-4.7-build-fast | `kinase-ligand-entry-check` | 0.50 | 1.00 | 2/2 | 20261006 |
| Antigravity CLI | gemini-3.8-flash-low | `kinase-ligand-entry-check` | 0.00 | 1.00 | 2/2 | 20261006 |
| Gemini CLI | gemini-3.8-flash | `kinase-ligand-entry-check` | 0.25 | 1.00 | 2/2 | 20261006 |

### Scientific artifact fixture measurements

Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and read-only bwrap isolation. All nine comparisons ran serially on supplied synthetic reports. They measure reasoning, not executed exporters, sequence analysis or microscopy applications. Criteria and measured instructions were unchanged.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `ome-unit-plane-match` | ome-series-calibration-roundtrip-check | 1.00 | 1.00 (open) | 2 |
| `ome-bytes-match-calibration-loss` | ome-series-calibration-roundtrip-check | 0.00 | 0.00 (open) | 2 |
| `ome-calibration-series-missing` | ome-series-calibration-roundtrip-check | 0.50 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inferred unmeasured Claude results. Runtime-specific raw scores below qualify only where an applicable narrow effect is admitted; regression and OPEN rows remain nonqualifying.

No applicable effect is admitted for OME. Normal quantity and semantic-plane matching is regression evidence. The exception is OPEN: all arms preserve originals and propose current saved-metadata versus reader investigation; graders demand future conditional correction verification, despite the requested next evidence check. With0 already mentions a later fresh saved artifact and reader report. Missing-input grading is OPEN: both baselines collect series/source-saved mapping, quantity/provenance, versions and reimport comparisons. Baseline1 omits explicit pixel type, but broader claims of missing artifact/output evidence are disputed; baseline0 fully passes. No microscope-calibration, biological or general certification advantage is established.

### Other runtimes: scientific artifact fixtures

These rows apply only to the named additions. Other clients and actual applications remain untested for these additions; historical sibling results retain their scope.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `ome-unit-plane-match` | ome-series-calibration-roundtrip-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `ome-bytes-match-calibration-loss` | ome-series-calibration-roundtrip-check | 0.00 | 0.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `ome-calibration-series-missing` | ome-series-calibration-roundtrip-check | 0.50 | 1.00 (open) | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input; reasoning output is included in output. No OPEN row supports a badge.


## License

MIT
### Added skill reasoning comparisons

The added `bibliography-creator-export-semantics-check` was measured on 2026-10-07 with Codex CLI 0.160.1, gpt-6.1-sol subject and judge, two runs per arm and three judge votes, in a read-only empty application workspace. All three initial comparisons and their raw scores are retained. There is no admitted applicable effect case; this skill's minimum-effect requirement remains unmet. Regression agreement and OPEN judging interpretations do not establish an effect. No application workflow or actual artifact transformation was executed.

| Case | Skill | Without | With | Runs per arm | Interpretation |
| --- | --- | --- | --- | --- | --- |
| `creator-style-preserves-identity` | bibliography-creator-export-semantics-check | 1.00 | 1.00 (open) | 2 | Regression only: both arms preserve creator semantics and distinguish rendering. |
| `creator-literal-parser-mismatch` | bibliography-creator-export-semantics-check | 0.00 | 0.00 (open) | 2 | OPEN: bounded brace-sensitivity diagnostic experiment is valid; frozen grader mandates fresh-export repair-acceptance cycle for minimal next diagnostic test. No effect; no correction. |
| `creator-source-mode-missing` | bibliography-creator-export-semantics-check | 0.00 | 1.00 (open) | 2 | OPEN: supplied .bib context versus explicit format-request wording and full-render certification coverage; both baselines preserve unknown identity, no admitted effect. |

Reproduce one reasoning comparison from the marketplace root:

```
node plugins/skill-factory/skills/codex-plugin-eval/scripts/codex-plugin-eval.mjs plugins/academic-research --case creator-style-preserves-identity --runs 2 -j 2 --model gpt-6.1-sol --judge-model gpt-6.1-sol --judge-votes 3 --auth proxy --isolation bwrap --threshold 0 --output-dir /tmp/creator-style-preserves-identity --json /tmp/creator-style-preserves-identity.json
```
