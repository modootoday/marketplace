# engineering

## What it does

Engineering document procedures: work instructions from field notes, clause location with verbatim quotes, sourced spec tables and fault evidence logs.

Maintenance schedules built from equipment manuals are available to signed-in users.

Check STEP assembly occurrences, placements and physical units, and vector fabrication geometry and process-role handoffs.

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
claude plugin install engineering@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add engineering@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `procedure-document-from-field-notes` | field steps turned into a work instruction and flow with every branch kept, an owner field per step, gaps as questions and a safety-owner review list (rests on weak records) |
| skill | `standards-clause-locator` | clause number and wording quoted verbatim with edition, report and clause values compared by number, unit and condition, not-found stated (rests on weak records) |
| skill | `datasheet-spec-table` | spec table with each value traced to a source document and date, unverified cells marked, price left to check (rests on weak records) |
| skill | `fault-diagnosis-evidence-log` | discriminating questions and an evidence log that rules causes out without naming one, safe next checks only (rests on two records) |
| skill | `device-config-file-from-register-table` | a register or tag table converted row by row into a stated import format with input and output row counts, an assumption list, flagged rows and missing values, and a required bench test on a non-production device (rests on two first-person records, moderate evidence); came from the former `industrial-config` plugin, now merged here |
| skill | `step-assembly-export-fidelity-check` | part definitions versus occurrences, placements, physical dimensions and requested metadata |
| skill | `fabrication-vector-import-intent-check` | physical vector bounds/datums and cut/engrave/non-output recipient mapping; no machine settings |

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
Which clause of this pasted spec governs the minimum pipe cover, and does the site report meet it?
```

The plugin ships an eval suite (`claude plugin eval plugins/engineering --no-publish`). Measured
on Claude Code 2.1.289; the score is the share of runs that passed every grader, without the
plugin and with it:

| Case | Skill | Without | With | Runs per arm | Subject / judge |
| --- | --- | --- | --- | --- | --- |
| `pump-filter-work-instruction` | procedure-document-from-field-notes | 0.00 | 1.00 | 2 | Opus / Opus |
| `bearing-capacity-clause-check` | standards-clause-locator | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `scope-spec-table` | datasheet-spec-table | 0.00 | 1.00 | 2 | Sonnet / Sonnet |
| `motorcycle-wont-start-log` | fault-diagnosis-evidence-log | 0.00 | 1.00 | 2 | Opus / Opus, both arms, 20261005 (after a SKILL.md fix: the question numbering is the ranking, so a later question is never called the most useful) |
| `modbus-map-duplicate-flow` | device-config-file-from-register-table | 0.50 | 1.00 | 2 | Sonnet / Sonnet, 20261005 |

The plugin reads only what you supply, quotes no standard text, limit or rating of its own and gives
no compliance, diagnosis or repair decision; a qualified engineer and the maker's manual govern.

### Artifact handoff fixture measurements

These self-contained synthetic observations measure reasoning on supplied reports, not actual application execution, archive extraction, private-document cleanup or manufacturing readiness. Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and a read-only bwrap sandbox. All 15 comparisons ran serially; no criteria or measured skill instructions changed.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `step-two-definitions-three-occurrences` | step-assembly-export-fidelity-check | 1.00 | 1.00 (open) | 2 |
| `step-count-match-placement-scale-fail` | step-assembly-export-fidelity-check | 0.50 | 1.00 (open) | 2 |
| `step-shapes-summary-missing-source-contract` | step-assembly-export-fidelity-check | 0.00 | 1.00 (open) | 2 |
| `vector-geometry-and-process-role-match` | fabrication-vector-import-intent-check | 1.00 | 1.00 (open) | 2 |
| `vector-inch-scale-and-enabled-datum` | fabrication-vector-import-intent-check | 0.00 | 1.00 (open) | 2 |
| `vector-browser-preview-no-approved-intent` | fabrication-vector-import-intent-check | 0.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inference of unmeasured Claude results. The runtime-specific table below preserves raw scores; only admitted effect rows omit that marker. Other rows are regression or OPEN interpretation-sensitive results, not effect evidence.

STEP exception supports only narrow pre-correction investigative coverage: both With answers and baseline0 inspect assembly/transforms and unit conversion, while baseline1 gives final recipient verification only. All four correctly diagnose placement and size failures; arithmetic and diagnosis are not demonstrated advantages. STEP missing supports explicit occurrence-to-definition mapping and selected export scope collection, including excluded components. Baselines already request physical width, units, tolerance and placements. One of three With1 judge votes disputes exact exported-artifact identity specificity; this disagreement remains visible. Vector missing supports only explicit unit-fallback, DPI, position and path-closing control collection beyond baseline generic settings. Baselines already request physical and role controls; baseline1 explicitly excludes non-output content. Vector exception is OPEN because graders inconsistently require future correction verification from an inspection-only request; all arms correctly calculate 508 x 254 mm and reject role/output failures. Both normal cases are regression evidence.

### Other runtimes: artifact handoff fixtures

These rows apply only to the named new skills and fixture reasoning. Other clients and actual receiving applications remain untested.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `step-two-definitions-three-occurrences` | step-assembly-export-fidelity-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `step-count-match-placement-scale-fail` | step-assembly-export-fidelity-check | 0.50 | 1.00 | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `step-shapes-summary-missing-source-contract` | step-assembly-export-fidelity-check | 0.00 | 1.00 | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `vector-geometry-and-process-role-match` | fabrication-vector-import-intent-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `vector-inch-scale-and-enabled-datum` | fabrication-vector-import-intent-check | 0.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `vector-browser-preview-no-approved-intent` | fabrication-vector-import-intent-check | 0.00 | 1.00 | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input tokens; reasoning output is included in output. No score from OPEN judging supports a badge.

## License

MIT
