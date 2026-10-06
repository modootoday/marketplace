# education

## What it does

Reading passages that hit a measured grade level, language drills, and teacher-side checks for coverage, answer keys, lesson timing, study calendars and rule-valid puzzles, with the numbers and logs shown.

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
| `homeschool-20-week-calendar` | study-calendar-allocation | 0.00 | 1.00 | 2 |
| `lecture-90-minute-fit` | lecture-script-timing-fit | 0.00 | 1.00 | 2 |

The eight skills added in 0.3.0 have one case each; two more per skill are needed for the three-case release gate. Rows below are measured 20261005 with Sonnet as subject and judge; the `notes-to-recall-cards` row is Opus as subject and judge on both arms. The calendar and lecture rows are with-arm reruns after the repair (Sonnet subject and judge, 2 runs); the without-arm 0.00 is from the earlier both-arm run on the same graders.
A case that already passes without the plugin stays in the suite to catch a regression, not as
evidence that the skill helps.

## License

MIT
