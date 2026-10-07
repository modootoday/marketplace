# education

## What it does

Reading passages that hit a measured grade level, language drills, and teacher-side checks for coverage, answer keys, lesson timing, study calendars and rule-valid puzzles, with the numbers and logs shown.

## Runtime support

| Runtime | Supported | Measured on |
| --- | --- | --- |
| Claude Code | yes | 2.1.289, with the eval suite in `evals/` (see Verify) |
| Codex CLI | named fixture cases measured | added skill only; see Verify |
| Grok CLI | untested | - |
| Gemini CLI | untested | - |

Requirements: Nothing is required.

## Install

Claude Code:

```
claude plugin marketplace add modootoday/marketplace
claude plugin install education@modootoday
```

Codex CLI:

```
codex plugin marketplace add https://github.com/modootoday/marketplace
codex plugin add education@modootoday
```

## What it registers

| Kind | Name | Covers |
| --- | --- | --- |
| skill | `reading-level-calibration` | a passage revised until a named readability formula is within one grade of the target, with the counts shown |
| skill | `language-drill-coach` | translation drills one item at a time in a pinned variety, near-synonym contrasts, and an error log |
| skill | `course-draft-from-sme-material` | facilitator guides and storyboards built only from expert material: every statement source-tagged, gaps listed as expert questions, segment minutes summed to the session length |
| skill | `second-reader-grading-triage` | an independent blind second reading of already-scored student answers, quoted support per rubric point, disagreements ranked for the teacher to recheck, no final grade |
| skill | `worked-solution-step-audit` | a pasted worked solution rewritten as numbered steps, the first incorrect step quoted and corrected, the result checked by an independent method, textbook claims tabulated against the pasted text |
| skill | `requirements-coverage-check` | a draft mapped against the numbered requirements of its brief: quoted evidence and location per requirement, partial coverage kept apart from full, no rewriting. Rests on two records |
| skill | `assessment-rubric-and-item-check` | every multiple-choice item solved independently against the key, each distractor given a named error, double-correct options and rubric weight sums flagged before delivery, teacher decides. Rests on two records |
| skill | `notes-to-recall-cards` | pasted notes cut to a capped deck of atomic, source-lined recall cards with trivia skipped and a spaced schedule that ends before the exam. Rests on one record |
| skill | `lesson-plan-constraints` | one lesson plan with minutes summed to the period, objectives mapped both ways, a named accommodation placed per need and caps checked. Rests on one record |
| skill | `authoring-import-fidelity-check` | approved storyboard versus built module diffed block by block: reworded stems, dropped and reordered options, moved key, character-limit truncation, clone settings; nothing silently fixed |
| skill | `rule-checked-puzzle-and-score-generation` | word searches and simple notation generated as text or code and verified by a bundled checker word by word and bar by bar, answer key as coordinates, print format last |
| skill | `study-calendar-allocation` | a textbook spread over school weeks: capacity against demand after breaks, optional chapters left as the user choice, shared-subject slots with parent conflicts checked, slippage shown; not a single day (see constrained-day-schedule) |
| skill | `lecture-script-timing-fit` | script words converted to spoken minutes at a stated rate, activity time added, minutes per slide against the total, overrun and concrete cuts. Rests on one record |

| skill | `scorm-attempt-state-persistence-check` | Trace SCORM completion/success, API returns, persisted state and relaunch observations for a specific SCO and attempt |

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
Write a 120-word passage about volcanoes at grade 3 for a student who loves soccer.
```

The plugin ships an eval suite (`claude plugin eval plugins/education --no-publish`). Measured
20261005 on Claude Code 2.1.289 with Sonnet as subject and judge; the score is the share of runs
that passed every grader, without the plugin and with it:

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `grade3-soccer-volcano` | reading-level-calibration | 0.00 | 1.00 | 2 |
| `egyptian-arabic-drill` | language-drill-coach | 0.00 | 1.00 | 2 |
| `panel-safety-facilitator-guide` | course-draft-from-sme-material | 0.00 | 1.00 | 2 |
| `osmosis-disagreement-triage` | second-reader-grading-triage | 0.00 | 1.00 | 2 |
| `integration-by-parts-first-error` | worked-solution-step-audit | 0.00 | 1.00 | 2 |
| `brief-coverage-urban-heat` | requirements-coverage-check | 0.00 | 1.00 | 2 |
| `calculus-key-double-correct` | assessment-rubric-and-item-check | 0.00 | 1.00 | 2 |
| `biology-notes-recall-cards` | notes-to-recall-cards | 0.00 | 1.00 | 2, Opus subject and judge, both arms, 20261005 |
| `mean-median-45-minute-plan` | lesson-plan-constraints | 0.00 | 1.00 | 2 |
| `valve-quiz-import-diff` | authoring-import-fidelity-check | 0.00 | 1.00 | 2 |
| `wordsearch-and-melody-check` | rule-checked-puzzle-and-score-generation | 0.00 | 1.00 | 2 |
| `homeschool-20-week-calendar` | study-calendar-allocation | 0.00 | 0.25 | 2 per arm, Sonnet subject and judge, 20261006 |
| `homeschool-20-week-calendar` (Opus) | study-calendar-allocation | 0.00 | 1.00 | 2 per arm, Opus subject and judge, 20261006 |
| `lecture-90-minute-fit` | lecture-script-timing-fit | 0.00 | 1.00 | 2 per arm, Sonnet subject and judge, 20261006 |

The eight skills added in 0.3.0 have one case each; two more per skill are needed for the three-case release gate. Rows below are measured 20261005 with Sonnet as subject and judge; the `notes-to-recall-cards` row is Opus as subject and judge on both arms. The calendar and lecture rows are both-arm runs (2 per arm) from 20261006; the calendar passes 0.25 on Sonnet (the `slots` grader fails in most with-arm runs) and 1.00 on Opus.
A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

### Artifact contract fixture measurements

Codex CLI 0.160.1 used gpt-6.1-sol subject and judge, two runs per arm, j2, three judge votes, proxy authentication and read-only bwrap isolation. All nine comparisons ran serially on supplied synthetic reports. They measure reasoning, not actual LMS execution, bank imports or XLIFF merging. Criteria and measured instructions were unchanged.

| Case | Skill | Without | With | Runs per arm |
| --- | --- | --- | --- | --- |
| `scorm-completed-failed-resume` | scorm-attempt-state-persistence-check | 1.00 | 1.00 (open) | 2 |
| `scorm-threshold-failed-commit` | scorm-attempt-state-persistence-check | 0.00 | 0.00 (open) | 2 |
| `scorm-attempt-contract-missing` | scorm-attempt-state-persistence-check | 0.00 | 1.00 (open) | 2 |

The standard table uses (open) to prevent inferred unmeasured Claude results. Runtime-specific raw scores qualify only where an applicable narrow effect is admitted; regression and OPEN rows remain nonqualifying.

SCORM missing supports only collection of anonymized learner identity and chronological argument-bearing evidence. All arms already request core criteria, API, persistence and same-attempt evidence and decline certification. Approval wording alone is not diagnostic evidence, and no actual learner data exposure occurred. The normal case is regression evidence. Threshold/Commit exception is OPEN: all arms correctly apply the explicit progress contract and distinguish failed Commit from status and old readback; requesting the already supplied criteria/progress again is redundant, and baseline1 already proposes diagnostic/backend/readback evidence despite one judge absence claim.

### Other runtimes: artifact contract fixtures

These rows apply only to the named added skill. Other clients and actual applications remain untested for the addition; historical sibling results retain their scope.

| Runtime | Model | Case | Skill | Without | With | Fired | Date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Codex CLI | gpt-6.1-sol | `scorm-completed-failed-resume` | scorm-attempt-state-persistence-check | 1.00 | 1.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `scorm-threshold-failed-commit` | scorm-attempt-state-persistence-check | 0.00 | 0.00 (open) | 2/2 | 2026-10-07 |
| Codex CLI | gpt-6.1-sol | `scorm-attempt-contract-missing` | scorm-attempt-state-persistence-check | 0.00 | 1.00 | 2/2 | 2026-10-07 |

Subscription Codex only; no metered runtime was used. costUsd and prices are null, so USD conversion is unavailable. Cached input is a subset of input; reasoning output is included in output. No OPEN row supports a badge.

## License

MIT
